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
  await database.collection("test-news").deleteMany({});
  app.use("/api/news", NewsApi(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("news api", () => {
  it("should add new article", async function () {
    const author = "Test Author";
    const title = "Test Title";
    await request(app)
      .post("/api/news")
      .send({ title, author, topic: "Test Topic" })
      .expect(200);
    expect(
      (
        await request(app).get("/api/news").query({ author }).expect(200)
      ).body.map(({ title }) => title)
    ).toContain(title);
  });

  it("should list existing articles", async function () {
    expect(
      (await request(app).get("/api/news").expect(200)).body.map(
        ({ title }) => title
      )
    ).toContain("Test Title");
  });

  it("should filer articles by topic", async function () {
    const title = "Test Title";
    await request(app)
      .post("/api/news")
      .send({ title, author: "Test Author", topic: "Test Topic" })
      .expect(200);

    expect(
      (await request(app).get("/api/news?topic=Test+Topic")).body.map(
        ({ title }) => title
      )
    ).not.toEqual(title);
  });
});
