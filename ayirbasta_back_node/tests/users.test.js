const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let token;

beforeAll(async () => {
  // Register user
  const res = await request(app).post("/v1/users/sign-up").send({
    email: "testuser@mail.com",
    firstname: "Test",
    lastname: "User",
    password: "123456",
  });

  expect(res.statusCode).toBe(201);

  // Login user
  const login = await request(app)
    .post("/v1/users/sign-in")
    .send({ email: "testuser@mail.com", password: "123456" });

  token = login.body.token;
  expect(token).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("User Auth & Profile", () => {
  test("Should not register duplicate user", async () => {
    const res = await request(app).post("/v1/users/sign-up").send({
      email: "testuser@mail.com",
      firstname: "Test",
      lastname: "User",
      password: "123456",
    });
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/already exists/i);
  });

  test("Login fails with missing fields", async () => {
    const res = await request(app).post("/v1/users/sign-in").send({
      email: "testuser@mail.com",
    });
    expect(res.statusCode).toBe(400);
  });

  test("Get user profile", async () => {
    const res = await request(app)
      .get("/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("testuser@mail.com");
  });

  test("Update user profile", async () => {
    const res = await request(app)
      .patch("/v1/users/update")
      .set("Authorization", `Bearer ${token}`)
      .send({ firstname: "Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstname).toBe("Updated");
  });

  test("Update non-existent user", async () => {
    const fakeToken = jwt.sign(
      { id: new mongoose.Types.ObjectId() },
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    const res = await request(app)
      .patch("/v1/users/update")
      .set("Authorization", `Bearer ${fakeToken}`)
      .send({ firstname: "Ghost" });

    expect(res.statusCode).toBe(404);
  });
});

describe("User-related resources", () => {
  test("Get user items", async () => {
    const res = await request(app)
      .get("/v1/users/items")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  test("Get user recommendations", async () => {
    const res = await request(app)
      .get("/v1/users/recommended-items")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.recommendations)).toBe(true);
  });

  test("Get user trades", async () => {
    const res = await request(app)
      .get("/v1/users/trades")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.trades)).toBe(true);
  });
});
