const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const path = require("path");

let token1, token2;
let giverItemId, receiverItemId;
let tradeId;

beforeAll(async () => {
  // Register user1 (giver)
  await request(app).post("/v1/users/sign-up").send({
    email: "giver@mail.com",
    firstname: "Giver",
    lastname: "User",
    password: "123456",
  });

  const res1 = await request(app)
    .post("/v1/users/sign-in")
    .send({ email: "giver@mail.com", password: "123456" });

  token1 = res1.body.token;

  // Register user2 (receiver)
  await request(app).post("/v1/users/sign-up").send({
    email: "receiver@mail.com",
    firstname: "Receiver",
    lastname: "User",
    password: "123456",
  });

  const res2 = await request(app)
    .post("/v1/users/sign-in")
    .send({ email: "receiver@mail.com", password: "123456" });

  token2 = res2.body.token;

  // Create item for giver
  const giverItem = await request(app)
    .post("/v1/items")
    .set("Authorization", `Bearer ${token1}`)
    .field("name", "Giver Item")
    .field("description", "from giver")
    .field("category", "Electronics")
    .attach("images", path.resolve(__dirname, "test-image.jpg"));

  giverItemId = giverItem.body.item.id;

  // Create item for receiver
  const receiverItem = await request(app)
    .post("/v1/items")
    .set("Authorization", `Bearer ${token2}`)
    .field("name", "Receiver Item")
    .field("description", "from receiver")
    .field("category", "Books")
    .attach("images", path.resolve(__dirname, "test-image.jpg"));

  receiverItemId = receiverItem.body.item.id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Trade API", () => {
  test("should create a valid trade", async () => {
    const res = await request(app)
      .post("/v1/trades")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        giver_id: giverItemId,
        receiver_id: receiverItemId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.trade).toBeDefined();
    expect(res.body.trade.status).toBe("waiting_action");
    tradeId = res.body.trade.id;
  });

  test("should retrieve the created trade", async () => {
    const res = await request(app)
      .get(`/v1/trades/${tradeId}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.trade.id).toBe(tradeId);
  });

  test("giver should accept trade", async () => {
    const res = await request(app)
      .patch(`/v1/trades/${tradeId}/accept`)
      .set("Authorization", `Bearer ${token1}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Trade accepted successfully");
  });

  test("receiver should accept and confirm trade", async () => {
    const res = await request(app)
      .patch(`/v1/trades/${tradeId}/accept`)
      .set("Authorization", `Bearer ${token2}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Trade accepted successfully");
  });

  test("declining already confirmed trade should fail", async () => {
    const res = await request(app)
      .patch(`/v1/trades/${tradeId}/decline`)
      .set("Authorization", `Bearer ${token1}`);

    expect(res.statusCode).toBe(405);
  });

  test("creating trade with own item should fail", async () => {
    const res = await request(app)
      .post("/v1/trades")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        giver_id: giverItemId,
        receiver_id: giverItemId,
      });

    expect(res.statusCode).toBe(405);
    expect(res.body.message).toMatch(/cannot trade with your own item/i);
  });

  test("creating trade with item you don't own should fail", async () => {
    const res = await request(app)
      .post("/v1/trades")
      .set("Authorization", `Bearer ${token2}`)
      .send({
        giver_id: giverItemId,
        receiver_id: receiverItemId,
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/do not own the giver item/i);
  });
});
