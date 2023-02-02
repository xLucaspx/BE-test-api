const Services = require("./Services");

class UserServices extends Services {
  constructor() {
    // super("https://mockend.com/xLucaspx/BE-test-api/users");
    super("http://localhost:3000/users");
  }

  async getTaxValue(id) {
  const user = await this.getOneRecord(id);
  return user.tax / 100;
  }
}

module.exports = UserServices;
