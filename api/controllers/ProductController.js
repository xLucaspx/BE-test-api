const axios = require("axios");

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await axios
        .get("https://mockend.com/xLucaspx/BE-test-api/products")
        .then((res) => res.data);

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await axios
        .get(`https://mockend.com/xLucaspx/BE-test-api/products/${id}`)
        .then((res) => res.data);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(message);
    }
  }
}

module.exports = ProductController;
