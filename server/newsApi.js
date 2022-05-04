import { Router } from "express";

export function NewsApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const query = {
      topic: { $gte: "Politi" },
    };
    const news = await mongoDatabase
      .collection("articles")
      .find(query)
      .sort({ metacritic: -1 })
      .map(({ title, author, topic }) => ({
        title,
        author,
        topic,
      }))
      .limit(100)
      .toArray();
    res.json(news);
  });

  router.post("/", (req, res) => {
    const { title, author, topic } = req.body;
    const topics = [topic];
    mongoDatabase.collection("articles").insertOne({ title, author, topic });
    res.sendStatus(200);
  });

  return router;
}
