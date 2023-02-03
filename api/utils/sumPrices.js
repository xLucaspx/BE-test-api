function sumPrices(prices, tax) {
  let sum = 0;

  prices.forEach((price) => (sum += price * tax));

  return sum.toFixed(2);
}

module.exports = sumPrices;
