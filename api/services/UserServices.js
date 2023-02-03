const sumPrices = require("../utils/sumPrices");
const ProductServices = require("./ProductServices");
const Services = require("./Services");

class UserServices extends Services {
  constructor() {
    super("http://localhost:3000/users");
    this.productServices = new ProductServices();
  }

  async getTaxValue(id) {
    try {
      const user = await this.getOneRecord(id);
      return Number(user.tax) / 100;
    } catch (error) {
      throw new Error(`Id de usuário não encontrado: ${id}`);
    }
  }

  async getTotalValue(productIds, userId) {
    try {
      const prices = await this.productServices.getPrices(productIds);
      const tax = await this.getTaxValue(userId);

      return sumPrices(prices, tax);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserServices;
