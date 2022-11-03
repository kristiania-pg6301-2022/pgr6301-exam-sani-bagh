import { act, Simulate } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import React from "react";
import { LoginPage } from "../pages/loginPage";
import { MemoryRouter } from "react-router-dom";
import { NewsApiContext } from "../newsApiContext";

describe("login page", () => {
  it("should redirect to login with google", async () => {
    const location = new URL("https://www.example.com");
    delete window.location;
    window.location = new URL(location);

    const authorization_endpoint = `https://foo.example.com/auth`;
    const client_id = `1095583458734985klshdkajshdlaks.apps.googleusercontent.com`;

    const domElement = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <LoginPage
          config={{
            google: { authorization_endpoint, client_id },
          }}
        />
      </MemoryRouter>,
      domElement
    );
    await act(async () => {
      await Simulate.click(domElement.querySelector("button"));
    });
    const redirect_uri = `${location.origin}/login/google/callback`;
    expect(window.location.origin + window.location.pathname).toEqual(
      authorization_endpoint
    );
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search.substring(1))
    );
    expect(params).toMatchObject({ client_id, redirect_uri });
  });
  it("posts received token to server", async () => {
    window.sessionStorage.setItem("expected_state", "test");
    // replace window.location to simulate returning
    const access_token = `abc`;
    const location = new URL(
      `https://www.example.com#access_token=${access_token}&state=test`
    );
    delete window.location;
    window.location = new URL(location);

    const domElement = document.createElement("div");
    const registerLogin = jest.fn();
    const reload = jest.fn();
    await act(() => {
      ReactDOM.render(
        <MemoryRouter initialEntries={["/google/callback"]}>
          <NewsApiContext.Provider value={{ registerLogin }}>
            <LoginPage reload={reload} />
          </NewsApiContext.Provider>
        </MemoryRouter>,
        domElement
      );
    });
    expect(registerLogin).toBeCalledWith("google", { access_token });
  });
});
