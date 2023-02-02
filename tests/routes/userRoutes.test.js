const express = require("express");
const routes = require('../../api/routes');
const request = require("supertest");

const app = express();
const port = 3001;
routes(app);

let server;
beforeEach(() => {
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

const userId = 42;

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
});
