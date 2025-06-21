const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth - Register and Login", () => {
  const user = { email: "test@example.com", password: "123456" };

  test("Should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered");
  });

  test("Should login and return a token", async () => {
    const res = await request(app).post("/api/auth/login").send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
