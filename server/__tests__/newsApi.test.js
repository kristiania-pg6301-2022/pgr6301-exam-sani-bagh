import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { NewsApi } from "../newsApi";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test-db");
  await database.collection("test-articles").deleteMany({});
  app.use("/api/news", NewsApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("news api", () => {
  it("should add new article", async function () {
    await request(app)
      .post("/api/news")
      .send({
        title: "Test Title",
        category: "Test Topic",
        author: "Test Author",
        text: "Test Text",
      })
      .expect(200);
    expect(
      (await request(app).get("/api/news").expect(200)).body.map(
        ({ title }) => title
      )
    ).not.toContain("Test Title");
  });

  it("should list existing articles", async function () {
    const title = "Test Title";
    await request(app)
      .post("/api/news")
      .send({ title, author: "Test Author", category: "Test Topic" })
      .expect(200);

    expect(
      (await request(app).get("/api/news")).body.map(({ title }) => title)
    ).not.toContain(title);
  });

  it("should filter articles by topic", async function () {
    const title = "Test Title";
    await request(app)
      .post("/api/news")
      .send({ title, author: "Test Author", category: "Test Topic" })
      .expect(200);

    expect(
      (await request(app).get("/api/news?topic=Test+Topic")).body.map(
        ({ title }) => title
      )
    ).not.toEqual(title);
  });
});
