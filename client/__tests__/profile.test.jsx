import ReactDOM from "react-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Profile } from "../pages/profile";

describe("Profile component", () => {
  it("should test profile component", function () {
    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
      domElement
    );
    expect(domElement.innerHTML).toMatchSnapshot();
  });
});
