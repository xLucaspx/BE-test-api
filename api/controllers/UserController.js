const { UserServices } = require("../services");
const userServices = new UserServices();

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
      return res.status(404).json(`Id de usuário não encontrado: ${userId}`);
    }
  }

  static async getPurchaseValue(req, res) {
    const { userId } = req.params;
    const { productIds } = req.query;

    try {
      const value = await userServices.getTotalValue(productIds, userId);
      return res.status(200).json({ valor: `R$ ${value}` });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}

module.exports = UserController;
