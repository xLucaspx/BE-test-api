const app = require("../server");
const request = require("supertest");

const port = 3002;
const productId = 42;

let server;
beforeEach(() => {
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

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

  it("Deve responder com código 404", async () => {
    await request(app).get("/products/000").expect(404);
  });
});
