const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Crear y loguear usuario para obtener token
  const user = { email: "user1@example.com", password: "123456" };
  await request(app).post("/api/auth/register").send(user);
  const login = await request(app).post("/api/auth/login").send(user);
  token = login.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Habits API", () => {
  test("Should not allow creating habit without token", async () => {
    const res = await request(app).post("/api/habits").send({ name: "Read" });

    expect(res.statusCode).toBe(401);
  });

  test("Should create habit with valid token", async () => {
    const res = await request(app)
      .post("/api/habits")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Study" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Study");
  });

  test("Debería listar solo los hábitos del usuario logueado", async () => {
    const res = await request(app)
      .get("/api/habits")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
