const axios = require("axios").default;

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await axios
        .get("https://mockend.com/xLucaspx/BE-test-api/users")
        .then((res) => res.data);

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await axios
        .get(`https://mockend.com/xLucaspx/BE-test-api/users/${id}`)
        .then((res) => res.data);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}

module.exports = UserController;
