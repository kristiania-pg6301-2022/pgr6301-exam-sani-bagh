import { Router } from "express";

export function NewsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const query = {
      category: { $eq: " " },
    };
    const { category } = req.query;
    if (category) {
      query.category = { $eq: category };
    }
    const news = await mongoDatabase
      .collection("articles")
      .find(query)
      .sort({ metacritic: -1 })
      .map(({ title, author, category, text }) => ({
        title,
        author,
        category,
        text,
      }))
      .limit(100)
      .toArray();
    if (!news) {
      res.sendStatus(404);
    }
    res.json(news);
  });

  router.get("/all", async (req, res) => {
    const news = await mongoDatabase
      .collection("articles")
      .find()
      .map(({ title, author, category, text }) => ({
        title,
        author,
        category,
        text,
      }))
      .limit(100)
      .toArray();
    if (!news) {
      res.sendStatus(404);
    }
    res.json(news);
  });

  router.post("/", (req, res) => {
    const { title, author, category, text } = req.body;
    mongoDatabase
      .collection("articles")
      .insertOne({ title, author, category, text });
    res.sendStatus(200);
  });

  return router;
}
