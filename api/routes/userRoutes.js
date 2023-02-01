const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();

router
  .get("/users", UserController.getUsers)
  .get("/users/:id", UserController.getUserById);

module.exports = router;
