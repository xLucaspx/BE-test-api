const express = require("express");
const routes = require('../../api/routes');
const request = require("supertest");

const app = express();
const port = 3002;
routes(app);

let server;
beforeEach(() => {
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

const productId = 42;

describe("GET /products", () => {
  it("Deve retornar uma lista de produtos em formato JSON", async () => {
    const response = await request(app)
      .get("/products")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });
});

describe("GET /products/id", () => {
  it("Deve retornar o produto selecionado", async () => {
    await request(app).get(`/products/${productId}`).expect(200);
  });
});
