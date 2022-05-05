import { Router } from "express";

export function NewsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const query = {
      topic: "Russland",
    };
    const news = await mongoDatabase
      .collection("articles")
      .find()
      .sort({ metacritic: -1 })
      .map(({ title, author, topic, text }) => ({
        title,
        author,
        topic,
        text,
      }))
      .limit(100)
      .toArray();
    res.json(news);
  });

  router.post("/", (req, res) => {
    const { title, author, topic, text } = req.body;
    const topics = [topic];
    mongoDatabase
      .collection("articles")
      .insertOne({ title, author, topic, text });
    res.sendStatus(200);
  });

  return router;
}
