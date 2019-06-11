const WoTPlatform = require("./WoTPlatform");

module.exports = homebridge => {
  console.log("homebridge API version: " + homebridge.version);
  homebridge.registerPlatform("homebridge-webthings", "webthings", WoTPlatform, true);
};
