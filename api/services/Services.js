const axios = require("axios");
const NotFoundError = require("../errors/NotFoundError");

class Services {
  constructor(url) {
    this.url = url;
  }

  async getRecords() {
    return await axios.get(this.url).then((res) => res.data);
  }

  async getOneRecord(id) {
    try {
      const url = this.url + `/${id}`;
      return await axios.get(url).then((res) => res.data);
    } catch (error) {
      if (error.response && error.response.status == 404) {
        throw new NotFoundError(`O ID ${id} não foi encontrado!`, {
          cause: error,
        });
      }
      throw error;
    }
  }
}

module.exports = Services;
