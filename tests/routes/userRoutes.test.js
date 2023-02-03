const app = require("../server");
const request = require("supertest");

const port = 3001;
const userId = 42;
const productIds = "2,7,15,21,42,55,68,35,99";

let server;
beforeEach(() => {
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe("GET /users", () => {
  it("Deve retornar uma lista de usuários em formato JSON", async () => {
    const response = await request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    expect(response.body[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        tax: expect.any(Number),
      })
    );
  });
});

describe("GET /users/id", () => {
  it("Deve retornar o usuário selecionado", async () => {
    await request(app).get(`/users/${userId}`).expect(200);
  });

  it("Deve responder com código 404", async () => {
    await request(app).get("/users/000").expect(404);
  });
});

describe("GET /users/id/products?productIds", () => {
  it("Deve retornar o valor dos produtos", async () => {
    await request(app)
      .get(`/users/${userId}/products?productIds=${productIds}`)
      .expect(200);
  });

  it("Deve responder com código 404 - Usuário não encontrado", async () => {
    await request(app)
      .get(`/users/000/products?productIds=${productIds}`)
      .expect(404);
  });

  it("Deve responder com código 404 - Produto não encontrado", async () => {
    await request(app)
      .get(`/users/${userId}/products?=000`)
      .expect(404);
  });
});
