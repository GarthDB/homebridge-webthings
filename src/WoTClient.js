const fetch = require('node-fetch');

module.exports = class WoTClient {
  constructor(log, config) {
    Object.assign(this, {
      config,
      log
    });
  }

  request(options = {}) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.config.auth_token}`
    };
    const opts = {...{headers},options}
    const url = `${this.config.base_url}things`;
    return fetch(url, opts);
  }
  async getDevices() {
    try {
      const response = await this.request();
      const json = await response.json();
      return json;
    } catch (error) {
      this.log.error(error);
    }
  }
}
