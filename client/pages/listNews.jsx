import React, { useContext, useState } from "react";
import { useLoading } from "../useLoading";
import { NewsApiContext } from "../newsApiContext";

function ArticleCard({ article: { title, author, topic, text } }) {
  return (
    <>
      <h3>{title}</h3>
      <h3>Topic: {topic}</h3>
      <div>{author}</div>
      <p>{text}</p>
    </>
  );
}

export function ListNews() {
  const { listNews } = useContext(NewsApiContext);
  const [topic, setTopic] = useState("");
  const [topicQuery, setTopicQuery] = useState("");
  const { loading, error, data } = useLoading(
    async () => await listNews({ topic }),
    [topic]
  );

  function handleSubmitQuery(e) {
    e.preventDefault();
    setTopic(topicQuery);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div id="error-text">{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>News in the database</h1>

      <div>
        <form onSubmit={handleSubmitQuery}>
          <label>
            Topic:
            <input
              id="topic-query"
              value={topicQuery}
              onChange={(e) => setTopicQuery(e.target.value)}
            />
            <button>Filter</button>
          </label>
        </form>
      </div>

      {data.map((article) => (
        <ArticleCard key={article.title} article={article} />
      ))}
    </div>
  );
}
