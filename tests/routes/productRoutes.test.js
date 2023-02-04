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
  it("Must return a list of products in JSON format", async () => {
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
  it("Must return the corresponding product", async () => {
    const response = await request(app)
      .get(`/products/${productId}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: productId,
        name: expect.any(String),
        price: expect.any(Number),
      })
    );
  });

  it("Must respond with status 404", async () => {
    await request(app).get("/products/000").expect(404);
  });
});
