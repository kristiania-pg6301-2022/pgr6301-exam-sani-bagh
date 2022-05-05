import { Router } from "express";

export function NewsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const query = {
      author: { $eq: "Eirik Wichstad" },
    };
    const { topic } = req.query;
    if (topic) {
      query.topic = { $eq: topic };
    }
    const news = await mongoDatabase
      .collection("articles")
      .find(query)
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
    mongoDatabase
      .collection("articles")
      .insertOne({ title, author, topic, text });
    res.sendStatus(200);
  });

  return router;
}
