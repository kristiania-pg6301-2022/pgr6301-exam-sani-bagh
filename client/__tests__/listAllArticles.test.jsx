import React from "react";
import ReactDOM from "react-dom";
import { ListAllNews, ListNews } from "../pages/listNews";
import { act } from "react-dom/test-utils";
import { NewsApiContext } from "../newsApiContext";

describe("ListAllNews component", () => {
  it("should show loading screen", function () {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListAllNews />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("should show error message", async function () {
    const domElement = document.createElement("div");
    await act(async () => {
      const listAllNews = () => {
        throw new Error("Failed to load");
      };
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listAllNews }}>
          <ListAllNews />
        </NewsApiContext.Provider>,
        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Failed to load"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("should list all news", async function () {
    const articles = [
      { title: "Article 1", category: "Topic 1" },
      { title: "Article 2", category: "Topic 2" },
    ];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listAllNews: () => articles }}>
          <ListAllNews />
        </NewsApiContext.Provider>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual([
      "Article 1",
      "Category: Topic 1",
      "Article 2",
      "Category: Topic 2",
    ]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
