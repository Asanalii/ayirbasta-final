const request = require("supertest");
const app = require("../app");
const fs = require("fs");
const path = require("path");

describe("App-level testing (404, static)", () => {
  test("should return 404 for unknown route", async () => {
    const res = await request(app).get("/nonexistent-route");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Not Found");
  });

  test("should serve static file if exists", async () => {
    // Create a static test file if not exists
    const staticPath = path.join(__dirname, "../static/test.txt");
    if (!fs.existsSync(staticPath)) {
      fs.mkdirSync(path.dirname(staticPath), { recursive: true });
      fs.writeFileSync(staticPath, "hello static file");
    }

    const res = await request(app).get("/static/test.txt");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("hello static file");
  });
});
