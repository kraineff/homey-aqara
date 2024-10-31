import EventEmitter from "events";
import { ZCLNodeCluster } from "zigbee-clusters";

export type StructDataType = {
    length: number;
    fromBuffer: (buffer: Buffer, index: number) => any;
    toBuffer: (buffer: Buffer, value: any, index: number) => Buffer;
};

export class StructResources<T extends Record<string, StructDataType>> extends EventEmitter {
    private counter: number;

    constructor(private cluster: ZCLNodeCluster, private attribute: string, private valueTypes: T) {
        super();
        this.cluster.on(`attr.${attribute}`, (buffer: Buffer) => this.emit("data", this.decode(buffer)));
        this.counter = 1;
    }

    async read(resource: keyof T) {
        return new Promise<any>(async resolve => {
            const encoded = this.encode(0x01, resource);
            const listener = (attribute: any) => {
                if (attribute.resource !== resource) return;
                this.removeListener("data", listener);
                resolve(attribute.value);
            };

            this.addListener("data", listener);
            await this.cluster.writeAttributes({ [this.attribute]: encoded });
        });
    }

    async write(resource: keyof T, value: any) {
        return new Promise<void>(async resolve => {
            const encoded = this.encode(0x02, resource, value);
            const listener = (attribute: any) => {
                if (attribute.resource !== resource) return;
                this.removeListener("data", listener);
                resolve();
            };
            
            this.addListener("data", listener);
            await this.cluster.writeAttributes({ [this.attribute]: encoded });
        });
    }

    private decode(buffer: Buffer) {
        this.counter = buffer.readUInt8(2);
        const resource0 = buffer.readUInt8(3);
        const resource1 = buffer.readUInt8(4);
        const resource2 = buffer.readUInt16BE(5);
        const resource = [resource0, resource1, resource2].join(".");

        const contentLength = buffer.readUInt8(7);
        const dataType = this.valueTypes[resource];
        console.log(buffer)
        const value = dataType.fromBuffer(Buffer.concat([Buffer.alloc(dataType.length - contentLength), buffer.subarray(8)]), 0);
        return { resource, value };
    }

    private encode(action: number, resource: keyof T, value?: any) {
        const [resource0, resource1, resource2] =
            (resource as string).split(".").map(x => Number(x));

        const counter = (this.counter + 1) % 256;
        const header = Buffer.alloc(7);
        header.writeUInt8(0x00, 0);
        header.writeUInt8(action, 1);
        header.writeUInt8(counter, 2);
        header.writeUInt8(resource0, 3);
        header.writeUInt8(resource1, 4);
        header.writeUInt16BE(resource2, 5);

        let content = Buffer.alloc(0);
        if (value !== undefined && this.valueTypes[resource] !== undefined) {
            const dataType = this.valueTypes[resource];
            content = Buffer.alloc(dataType.length + 1);
            content.writeUInt8(dataType.length, 0);
            dataType.toBuffer(content, value, 1);
        }

        return Buffer.concat([header, content]);
    }
}