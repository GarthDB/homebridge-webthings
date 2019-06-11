module.exports = class Accessories {
  constructor() {
    this.comparator = this.comparator.bind(this);
    this._accessories = {};
    this._ignored = {};
  }

  getAccessoryKey(accessory) {
    const context = accessory.context || accessory;
    return `${context.object_type}/${context.object_id}`;
  }

  get(device) {
    const key = this.getAccessoryKey(device);
    return this._accessories[key];
  }

  ignore(device) {
    const key = this.getAccessoryKey(device);
    if (this._ignored[key]) {
      return false;
    }

    this._ignored[key] = device;
    return true;
  }

  add(accessory) {
    const key = this.getAccessoryKey(accessory);
    return (this._accessories[key] = accessory);
  }

  remove(accessory) {
    const key = this.getAccessoryKey(accessory);
    const _accessory = this._accessories[key];
    delete this._accessories[key];
    return _accessory;
  }

  forEach(fn) {
    return this._accessories.forEach(fn);
  }

  intersection(devices) {
    const accessories = Object.values(this._accessories);
    return accessories.filter(accessory => {
      const result = devices.findIndex(device => {
        return this.comparator(accessory, device);
      });
      return result >= 0;
    });
  }

  diffAdd(devices) {
    const accessories = Object.values(this._accessories);
    return devices.filter(device => {
      const result = accessories.findIndex(accessory => {
        return this.comparator(accessory, device);
      });
      return result < 0;
    });
  }

  diffRemove(devices) {
    const accessories = Object.values(this._accessories);
    return accessories.filter(accessory => {
      const result = devices.findIndex(device => {
        return this.comparator(accessory, device);
      });
      return result < 0;
    });
  }

  comparator(accessory1, accessory2) {
    return (
      this.getAccessoryKey(accessory1) === this.getAccessoryKey(accessory2)
    );
  }
};
