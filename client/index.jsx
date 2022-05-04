import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import * as url from "url";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load ${res.status}: ${res.statusText}`);
  }

  return await res.json();
}

function NewsOverview() {
  const { loading, error, data } = useLoading(async () => fetchJSON("/api/"));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.toString()}</div>
      </div>
    );
  }

  return (
    <div>
      <h1>News overview</h1>
      <ul>
        {data.map((n) => (
          <li key={n.title}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}

function useLoading(loadingFunction) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function load() {
    try {
      setLoading(true);
      setData(await loadingFunction());
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, error, data };
}

function FrontPage() {
  return (
    <div>
      <div>
        <h1>Daily News</h1>
        <ul>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </div>
      <div>
        <NewsOverview />
      </div>
    </div>
  );
}

function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login"} element={<h1>Login</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
