// @ts-check
import Homey from "homey";
import { LumiCluster } from "./library";

const { Cluster } = require("zigbee-clusters");
Cluster.addCluster(LumiCluster);

module.exports = class AqaraApp extends Homey.App {
    async onInit() {}
}