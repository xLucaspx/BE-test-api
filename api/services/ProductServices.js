const NotFoundError = require("../errors/NotFoundError");
const Services = require("./Services");

class ProductServices extends Services {
  constructor() {
    super("http://localhost:3000/products");
  }

  // ids must be a comma separated list (id1,id2,id3,...)
  async getPrices(ids) {
    const productIds = ids.split(",");
    const prices = [];

    for (let i = 0; i < productIds.length; i++) {
      try {
        const product = await this.getOneRecord(productIds[i]);
        prices.push(Number(product.price));
      } catch (error) {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(
            `Erro ao buscar produto: ${error.message}`,
            {
              cause: error,
            }
          );
        }
        throw error;
      }
    }
    return prices;
  }
}

module.exports = ProductServices;
