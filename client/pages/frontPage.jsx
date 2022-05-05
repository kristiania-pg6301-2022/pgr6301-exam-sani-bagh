import { Link } from "react-router-dom";

export function FrontPage() {
  return (
    <div>
      <h1>News Database</h1>
      <ul>
        <li>
          <Link to={"/news"} className="link">
            List news
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
