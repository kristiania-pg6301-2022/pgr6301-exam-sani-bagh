import { ListNews } from "../pages/listNews";
import React from "react";
import ReactDOM from "react-dom";
import { act, Simulate } from "react-dom/test-utils";
import { NewsApiContext } from "../newsApiContext";

describe("ListNews component", () => {
  it("should show loading screen", function () {
    const domElement = document.createElement("div");
    ReactDOM.render(<ListNews />, domElement);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("should show error message", async function () {
    const domElement = document.createElement("div");
    await act(async () => {
      const listNews = () => {
        throw new Error("Failed to load");
      };
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listNews }}>
          <ListNews />
        </NewsApiContext.Provider>,
        domElement
      );
    });

    expect(domElement.querySelector("#error-text").innerHTML).toEqual(
      "Error: Failed to load"
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("should show articles", async function () {
    const articles = [
      { title: "Article 1", topic: "Topic 1" },
      { title: "Article 2", topic: "Topic 2" },
    ];
    const domElement = document.createElement("div");
    await act(async () => {
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listNews: () => articles }}>
          <ListNews />
        </NewsApiContext.Provider>,
        domElement
      );
    });
    expect(
      Array.from(domElement.querySelectorAll("h3")).map((e) => e.innerHTML)
    ).toEqual(["Article 1", "Topic: Topic 1", "Article 2", "Topic: Topic 2"]);
    expect(domElement.innerHTML).toMatchSnapshot();
  });

  it("should  show article by topic", async function () {
    const domElement = document.createElement("div");
    const listNews = jest.fn(() => []);
    await act(async () => {
      ReactDOM.render(
        <NewsApiContext.Provider value={{ listNews }}>
          <ListNews />
        </NewsApiContext.Provider>,
        domElement
      );
    });
    Simulate.change(domElement.querySelector("#topic-query"), {
      target: { value: "Politi" },
    });
    await act(async () => {
      await Simulate.submit(domElement.querySelector("form"));
    });
    expect(listNews).toHaveBeenCalledWith({
      topic: "Politi",
    });
  });
});
