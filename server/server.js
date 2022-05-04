import express, { Router } from "express";
import * as path from "path";
import { NewsApi } from "./newsApi.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");

  app.use(
    "/api/",
    NewsApi(mongoClient.db(process.env.MONGODB_DATABASE, "articles"))
  );
});

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
