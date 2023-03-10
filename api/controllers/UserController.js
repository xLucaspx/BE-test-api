const NotFoundError = require("../errors/NotFoundError");
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
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  static async getPurchaseValue(req, res) {
    const { userId } = req.params;
    const { productIds } = req.query; // productIds must be comma separated (id1,id2,id3,...)

    try {
      const value = await userServices.getTotalValue(productIds, userId);
      return res.status(200).json({ valor: `R$ ${value}` });
    } catch (error) {
      return res
        .status(error instanceof NotFoundError ? 404 : 500)
        .json(error.message);
    }
  }
}

module.exports = UserController;
