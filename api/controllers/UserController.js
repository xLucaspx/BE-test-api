const { UserServices } = require("../services");
const { ProductServices } = require("../services");
const sumPrices = require("../utils/sumPrices");
const userServices = new UserServices();
const productServices = new ProductServices();

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await userServices.getRecords();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await userServices.getOneRecord(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  static async getPurchaseValue(req, res) {
    const { userId } = req.params;
    const { productIds } = req.query;

    try {
      const prices = await productServices.getListOfPrices(productIds);
      const tax = await userServices.getTaxValue(userId);
      const finalValue = sumPrices(prices, tax);

      return res.status(200).json({ valor: `R$ ${finalValue}` });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}

module.exports = UserController;
