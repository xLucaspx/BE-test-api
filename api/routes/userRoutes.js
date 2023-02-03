const { Router } = require("express");
const UserController = require("../controllers/UserController");

const router = Router();

router
  .get("/users", UserController.getUsers)
  .get("/users/:userId", UserController.getUserById)
  .get("/users/:userId/products?", UserController.getPurchaseValue);

module.exports = router;
