const sumPrices = require("../utils/sumPrices");
const ProductServices = require("./ProductServices");
const Services = require("./Services");

class UserServices extends Services {
  constructor() {
    super("http://localhost:3000/users");
    this.productServices = new ProductServices();
  }

  async getTaxValue(id) {
    const user = await this.getOneRecord(id);
    return Number(user.tax) / 100;
  }

  async getTotalValue(productIds, userId) {
    const prices = await this.productServices.getListOfPrices(productIds);
    const tax = await this.getTaxValue(userId);

    return sumPrices(prices, tax);
  }
}

module.exports = UserServices;
