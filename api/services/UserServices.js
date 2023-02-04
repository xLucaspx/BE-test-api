const NotFoundError = require("../errors/NotFoundError");
const sumPrices = require("../utils/sumPrices");
const ProductServices = require("./ProductServices");
const Services = require("./Services");

class UserServices extends Services {
  constructor() {
    super("http://localhost:3000/users");
    this.productServices = new ProductServices();
  }

  // returns the percentage tax value
  async getTaxValue(id) {
    try {
      const user = await this.getOneRecord(id);
      return Number(user.tax) / 100;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new NotFoundError(`Erro ao buscar usuário: ${error.message}`, {
          cause: error,
        });
      }
      throw error;
    }
  }

  /* this must receive a comma separated list of product ids and
  an user id; returns the sum of the product prices multiplied by
  the user tax value (in percentage) */
  async getTotalValue(productIds, userId) {
    try {
      const prices = await this.productServices.getPrices(productIds);
      const tax = await this.getTaxValue(userId);

      return sumPrices(prices, tax).toString().replace(".", ",");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
