import express, { Router } from "express";
import * as path from "path";

const app = express();
const Login = new Router();
const News = new Router();

app.use(News);
app.use(Login);

News.get("/api/", (req, res) => {
  res.json([
    {
      title: "Article 1",
    },
  ]);
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
