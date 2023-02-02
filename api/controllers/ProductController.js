const { ProductServices } = require("../services");
const productServices = new ProductServices();

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await productServices.getRecords();

      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params;

    try {
      const product = await productServices.getOneRecord(id);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ProductController;
