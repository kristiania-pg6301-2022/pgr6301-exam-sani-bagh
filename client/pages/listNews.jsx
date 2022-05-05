import React, { useContext, useState } from "react";
import { useLoading } from "../useLoading";
import { NewsApiContext } from "../newsApiContext";

function ArticleCard({ article: { title, author, category, text } }) {
  return (
    <>
      <h3>{title}</h3>
      <h3>Category: {category}</h3>
      <div>{author}</div>
      <p>{text}</p>
    </>
  );
}

export function ListNews() {
  const { listNews } = useContext(NewsApiContext);
  const [category, setCategory] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const { loading, error, data } = useLoading(
    async () => await listNews({ category }),
    [category]
  );

  function handleSubmitQuery(e) {
    e.preventDefault();
    setCategory(categoryQuery);
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
              id="category-query"
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
            />
            <button>Filter</button>
          </label>
        </form>
      </div>

      {data.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
}
