const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const router = Router();

router
  .get("/products", ProductController.getProducts)
  .get("/products/:productId", ProductController.getProductById);

module.exports = router;
