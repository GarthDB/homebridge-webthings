module.exports = ({ Characteristic, Service }) => {
  return {
    type: "binary_switch",
    group: "binary_switches",
    services: [{
      service: Service.Switch,
      supported: true,
      characteristics: [{
        characteristic: Characteristic.On,
        get: state => state.powered,
        set: value => ({
          powered: !!value
        })
      }]
    }]
  }
}
