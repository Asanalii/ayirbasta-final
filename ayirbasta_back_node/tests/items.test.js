const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const path = require("path");

let token;
let itemId;

beforeAll(async () => {
  await request(app).post("/v1/users/sign-up").send({
    email: "itemtester@mail.com",
    firstname: "Item",
    lastname: "Tester",
    password: "123456",
  });

  const loginRes = await request(app)
    .post("/v1/users/sign-in")
    .send({ email: "itemtester@mail.com", password: "123456" });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Item CRUD operations", () => {
  test("Create a new item with file upload", async () => {
    const res = await request(app)
      .post("/v1/items")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Test Item")
      .field("description", "A test item description")
      .field("category", "Testing")
      .attach("images", path.resolve(__dirname, "test-image.jpg"));

    expect(res.statusCode).toBe(201);
    expect(res.body.item.name).toBe("Test Item");

    itemId = res.body.item.id;
  });

  test("Get all items", async () => {
    const res = await request(app)
      .get("/v1/items")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  test("Get item by ID", async () => {
    const res = await request(app)
      .get(`/v1/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.item.id).toBe(itemId);
  });

  test("Like and unlike an item", async () => {
    const likeRes = await request(app)
      .post(`/v1/items/${itemId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(likeRes.statusCode).toBe(200);
    expect(likeRes.body.isLiked).toBe(true);

    const unlikeRes = await request(app)
      .post(`/v1/items/${itemId}/like`)
      .set("Authorization", `Bearer ${token}`);
    expect(unlikeRes.statusCode).toBe(200);
    expect(unlikeRes.body.isLiked).toBe(false);
  });

  test("Delete item", async () => {
    const res = await request(app)
      .delete(`/v1/items/${itemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item deleted successfully");
  });
});
