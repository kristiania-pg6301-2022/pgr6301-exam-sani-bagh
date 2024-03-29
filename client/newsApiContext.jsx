import React from "react";
import { fetchJSON } from "./lib/fetchJSON";
import { postJSON } from "./lib/postJSON";

export const NewsApiContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },
  async listNews(query) {
    return await fetchJSON("/api/news?" + new URLSearchParams(query));
  },
  async listAllNews() {
    return await fetchJSON("/api/news/all");
  },
  async createArticle(article) {
    return await postJSON("/api/news", article);
  },
  async registerLogin(provider, login) {
    return await postJSON(`/api/login/${provider}`, login);
  },
  async endSession() {
    const res = await fetch("/api/login", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
