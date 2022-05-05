import { MemoryRouter } from "react-router-dom";
import { AddNewArticle } from "../pages/addNewArticle";
import React from "react";
import ReactDOM from "react-dom";
import { NewsApiContext } from "../newsApiContext";
import { Simulate } from "react-dom/test-utils";

describe("add new article compoment", () => {
  it("should show article form", function () {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddNewArticle />
      </MemoryRouter>,
      domElement
    );
    expect(domElement.innerHTML).toMatchSnapshot();
    expect(
      Array.from(domElement.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title:", "Author:", "Topic:"]);
  });

  it("should add article on submit", function () {
    const createArticle = jest.fn();
    const title = "Test article";
    const domElement = document.createElement("div");
    ReactDOM.render(
      <NewsApiContext.Provider value={{ createArticle }}>
        <MemoryRouter>
          <AddNewArticle />
        </MemoryRouter>
      </NewsApiContext.Provider>,
      domElement
    );
    Simulate.change(domElement.querySelector(".form-input input"), {
      target: { value: title },
    });
    Simulate.change(
      domElement.querySelector(".form-input:nth-of-type(2) input"),
      {
        target: { value: "Test Author" },
      }
    );
    Simulate.submit(domElement.querySelector("form"));
    expect(createArticle).toBeCalledWith({
      title,
      author: "Test Author",
      topic: "",
    });
  });
});
