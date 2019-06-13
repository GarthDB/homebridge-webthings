const WoTClient = require("./WoTClient");

module.exports = class WoTPlatform {
  constructor(log, config, api) {
    log("WoT Platform Init");
    const platform = this;
    Object.assign(this, {
      config,
      log,
      accessories: [],
      client: new WoTClient(log, config)
    });
    if (api) {
      this.api = api;
      this.api.on("didFinishLaunching", this.didFinishLaunching.bind(this));
    }
  }
  configureAccessory(accessory) {
    this.log(accessory)
  }
  async refreshDevices() {
    try {
      this.log('refreshing devices')
      const devices = await this.client.getDevices();
      const accessories = devices.map(device => {
        return this.convertDeviceToAccessory(device);
      })
      console.log(this.api.hap)
    } catch (e) {
      this.log.error("Failed to refresh devices.", e);
    }
  }
  async didFinishLaunching() {
    this.log('finished lauching');
    this.interval = setInterval(() => this.refreshDevices(), 60 * 60 * 1000);
    this.refreshDevices();
  }
  convertDeviceToAccessory(device) {
    const { uuid } = this.api.hap;
    const deviceId = uuid.generate(device.href);
    const accessory = new this.api.platformAccessory(device.name, deviceId);
    accessory.context = device;
    return accessory;
  }
  patchAccessory(accessory, device) {
    if (device) {
      accessory.context = device;
    }
    accessory.definition = this.accessoryHelper.getDefinition(
      accessory.context
    );
    Object.defineProperty(accessory, "merged_state", {
      get: function() {
        return {
          ...this.context.last_reading,
          ...this.context.desired_state
        };
      }
    });
  }
}
