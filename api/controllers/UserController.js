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
    const { id } = req.params;

    try {
      const user = await userServices.getOneRecord(id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}

module.exports = UserController;
