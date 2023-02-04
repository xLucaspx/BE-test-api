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
  it("Must return a list of users in JSON format", async () => {
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
  it("Must return the corresponding user", async () => {
    const response = await request(app).get(`/users/${userId}`).expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: userId,
        name: expect.any(String),
        tax: expect.any(Number),
      })
    );
  });

  it("Must respond with status 404", async () => {
    await request(app).get("/users/000").expect(404);
  });
});

describe("GET /users/id/products?productIds", () => {
  it("Must return the final value in BRL", async () => {
    const response = await request(app)
      .get(`/users/${userId}/products?productIds=${productIds}`)
      .expect(200);

    expect(response.body.valor).toMatch(/R\$ \d+,\d{2}/);
  });

  it("Must respond with status 404 - User not found", async () => {
    await request(app)
      .get(`/users/000/products?productIds=${productIds}`)
      .expect(404);
  });

  it("Must respond with status 404 - Product not found", async () => {
    await request(app)
      .get(`/users/${userId}/products?productIds=000`)
      .expect(404);
  });
});
