// @ts-check
const { ZigBeeDevice } = require("homey-zigbeedriver");
const { ZCLDataTypes } = require("zigbee-clusters");
import { StructDataType, StructResources } from "../../library";

module.exports = class FeederAcn001 extends ZigBeeDevice {
    private resources!: StructResources<any>;

    async onNodeInit({ zclNode }) {
        if (this.isFirstInit()) {
            await this.setCapabilityValue("feeder_daily_portions", 0);
            await this.setCapabilityValue("feeder_daily_weight", 0);
            await this.setCapabilityValue("alarm_stuck", false);
        }
        
        const FeedingDataType: StructDataType = {
            length: 4,
            fromBuffer: buffer => {
                const [source, portions] = Buffer.from(buffer.toString(), "hex");
                const sources = { 0: "schedule", 1: "manual", 2: "remote" };
                return { source: sources[source], portions };
            },
            toBuffer: buffer => buffer
        };

        const ScheduleType: StructDataType = {
            length: 10,
            fromBuffer: buffer => {
                const [days, hours, minutes, portions, status] = Buffer.from(buffer.toString(), "hex");
                return { days, hours, minutes, portions, status };
            },
            toBuffer: buffer => buffer
        };
        
        const lumiCluster = zclNode.endpoints["1"].clusters["lumi"];
        this.resources = new StructResources(lumiCluster, "xFFF1", {
            "4.21.85"  : ZCLDataTypes.uint8,  // feeding
            "4.21.700" : FeedingDataType,     // feeding_data
            "4.22.85"  : ZCLDataTypes.uint8,  // child_lock
            "4.23.85"  : ZCLDataTypes.uint8,  // led_mode
            "4.24.85"  : ZCLDataTypes.uint8,  // mode
            "8.0.2001" : ZCLDataTypes.uint8,  // battery
            "8.0.2248" : ScheduleType,        // schedule
            "13.9.85"  : ZCLDataTypes.uint8,  // 
            "13.11.85" : ZCLDataTypes.uint8,  // portion_stuck
            "13.104.85": ZCLDataTypes.data16, // portion_daily_count
            "13.105.85": ZCLDataTypes.data32, // portion_daily_weight
            "14.92.85" : ZCLDataTypes.data32, // portion_count
            "14.95.85" : ZCLDataTypes.data32  // portion_weight
        });

        this.resources.on("data", async data => {
            console.log(data);
            switch (data.resource) {
                case "4.22.85": return await this.setSettings({ control_lock: Boolean(data.value) });
                case "4.23.85": return await this.setSettings({ indicator_mode: String(data.value) });
                case "8.0.2001": return await this.setCapabilityValue("measure_battery", data.value);
                case "13.11.85": return await this.setCapabilityValue("alarm_stuck", Boolean(data.value));
                case "13.104.85": return await this.setCapabilityValue("feeder_daily_portions", data.value);
                case "13.105.85": return await this.setCapabilityValue("feeder_daily_weight", data.value);
                case "14.92.85": return await this.setSettings({ portion_count: data.value });
                case "14.95.85": return await this.setSettings({ portion_weight: data.value });
            }
        });

        this.registerCapabilityListener("feeder_action", async value => 
            await this.resources.write("4.21.85", 1));
    }

    async onSettings({ newSettings, changedKeys }) {
        if (changedKeys.includes("control_lock"))
            await this.resources.write("4.22.85", newSettings.control_lock);
        if (changedKeys.includes("indicator_mode"))
            await this.resources.write("4.23.85", newSettings.indicator_mode);
        if (changedKeys.includes("portion_count"))
            await this.resources.write("14.92.85", newSettings.portion_count);
        if (changedKeys.includes("portion_weight"))
            await this.resources.write("14.95.85", newSettings.portion_weight);
    }
}