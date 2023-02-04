function sumPrices(prices, tax) {
  let sum = 0;

  prices.forEach((price) => (sum += price));

  return (sum * tax).toFixed(2);
}

module.exports = sumPrices;
