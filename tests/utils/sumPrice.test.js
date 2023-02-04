const sumPrices = require("../../api/utils/sumPrices");

describe("Teste função sumPrices", () => {
  it("Deve retornar o valor esperado", () => {
    /* a função sumPrices recebe um array de valores (preços) e uma
    taxa (%), e retorna a soma dos preços multiplicada pela taxa (2 casas decimais): */
    const precos = [14.5, 27, 42, 15.75, 0.75];
    const taxa = 0.25;
    const valorEsperado = (25).toFixed(2);

    expect(sumPrices(precos, taxa)).toBe(valorEsperado);
  });
});
