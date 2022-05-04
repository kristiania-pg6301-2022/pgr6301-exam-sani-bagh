import { Router } from "express";

export function NewsApi(mongoDb) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const news = await mongoDb
      .collection("articles")
      .find()
      .map(({ title }) => ({
        title,
      }))
      .toArray();
    res.json(news);
  });

  return router;
}
