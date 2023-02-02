const Services = require("./Services");

class ProductServices extends Services {
  constructor() {
    // super("https://mockend.com/xLucaspx/BE-test-api/products");
    super("http://localhost:3000/products");
  }

  async getProductPrice(id) {
    const product = await this.getOneRecord(id);
    return product.price;
  }

  // ids must be a comma separated list (id1,id2,id3,...)
  async getListOfPrices(ids) {
    const productIds = ids.split(",");
    const prices = [];

    await productIds.forEach(async (id) => {
      const price = await this.getProductPrice(id);
      prices.push(Number(price));
    });

    return prices;
  }
}

module.exports = ProductServices;
