const app = require('../../api/server');
const request = require('supertest');

let server;
const userId = 99;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET /users', () => {
  it('Deve retornar uma lista de usuários em formato JSON', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(response.body[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      tax: expect.any(Number),
    }));
  });
});

describe('GET /users/id', () => {
  it('Deve retornar o usuário selecionado', async () => {
    await request(app).get(`/users/${userId}`).expect(200);
  });
});