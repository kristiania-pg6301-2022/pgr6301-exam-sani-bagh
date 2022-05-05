import { FrontPage } from "../pages/frontPage";
import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";

describe("FrontPage component", () => {
  it("should test frontPage component", async function () {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <FrontPage />
      </MemoryRouter>,
      domElement
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
