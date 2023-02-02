const Services = require("./Services");

class ProductServices extends Services {
  constructor() {
    super("https://mockend.com/xLucaspx/BE-test-api/products");
  }
}

module.exports = ProductServices;
