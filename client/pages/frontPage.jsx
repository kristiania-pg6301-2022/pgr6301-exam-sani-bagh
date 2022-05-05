import { Link } from "react-router-dom";
import React from "react";

export function FrontPage() {
  return (
    <div>
      <h1>Daily News</h1>
      <ul>
        <li>
          <Link to={"/news/all"} className="link">
            List All News
          </Link>
        </li>
        <li>
          <Link to={"/news"} className="link">
            Search news
          </Link>
        </li>
        <li>
          <Link to={"/login"} className="link">
            Add new article
          </Link>
        </li>
      </ul>
    </div>
  );
}
