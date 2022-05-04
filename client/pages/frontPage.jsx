import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>News Database</h1>
      <ul>
        <li>
          <Link to={"/news"}>List news</Link>
        </li>
        <li>
          <Link to={"/login"}>Add new article</Link>
        </li>
      </ul>
    </div>
  );
}
