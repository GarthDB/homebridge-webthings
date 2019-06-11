const fetch = require("node-fetch");

module.exports = class WoTPlatform {
  constructor(log, config, api) {
    log("WoT Platform Init");
    const platform = this;
    this.log = log;
    this.config = config;
    this.accessories = [];
    if (api) {
      this.api = api;
      this.api.on('didFinishLaunching', function() {
        platform.log("DidFinishLaunching");
      }.bind(this));
    }
  }
  configureAccessory(accessory) {
    if (!this.accessories) {
      return;
    }
  }
  // accessories(callback) {
  //   const foundAccessories = [];
  //   const getData = async url => {
  //     try {
  //       const response = await fetch(url, {
  //         headers: {
  //           Accept: 'application/json',
  //           Authorization: `Bearer ${this.config.auth_token}`
  //         }
  //       });
  //       const json = await response.json();
  //       console.log(json);
  //       callback(foundAccessories);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData(`${this.config.base_url}things`);
  // }
  async didFinishLaunching() {
    console.log('finished lauching');
  }
}
