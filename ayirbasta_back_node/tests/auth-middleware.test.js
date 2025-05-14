const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

let validToken;
const fakeUserId = new mongoose.Types.ObjectId();

beforeAll(async () => {
  await request(app).post("/v1/users/sign-up").send({
    email: "securetest@mail.com",
    firstname: "Secure",
    lastname: "User",
    password: "123456",
  });

  const loginRes = await request(app)
    .post("/v1/users/sign-in")
    .send({ email: "securetest@mail.com", password: "123456" });

  validToken = loginRes.body.token;
  expect(validToken).toBeDefined();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("authenticate.js middleware (optional auth)", () => {
  test("No Authorization header → req.user = null → next() → login succeeds", async () => {
    const res = await request(app)
      .post("/v1/users/sign-in")
      .send({ email: "securetest@mail.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Malformed Bearer token → jwt.verify throws → 401 Token is not valid", async () => {
    const res = await request(app)
      .post("/v1/users/sign-in")
      .set("Authorization", "Bearer not.a.valid.token")
      .send({ email: "securetest@mail.com", password: "123456" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Token is not valid/i);
  });

  test("Valid Bearer but user missing in DB → 401 Invalid token, user not found", async () => {
    const fakeToken = jwt.sign(
      { id: fakeUserId },
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    const res = await request(app)
      .post("/v1/users/sign-in")
      .set("Authorization", `Bearer ${fakeToken}`)
      .send({ email: "securetest@mail.com", password: "123456" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/user not found/i);
  });
});
