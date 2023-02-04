/* sumPrices must receive an array of values and a tax percentage
value and will return the sum of the prices multiplied by the tax */
function sumPrices(prices, tax) {
  let sum = 0;

  prices.forEach((price) => (sum += price));

  return (sum * tax).toFixed(2);
}

module.exports = sumPrices;
