const axios = require("axios");

class Services {
  constructor(url) {
    this.url = url;
  }

  async getRecords() {
    return await axios.get(this.url).then((res) => res.data);
  }

  async getOneRecord(id) {
    const url = this.url + `/${id}`;
    return await axios.get(url).then((res) => res.data);
  }
}

module.exports = Services;
