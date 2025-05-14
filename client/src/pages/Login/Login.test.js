// Login.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login"; // Ensure Login.jsx exports the Login component
import { AuthContext } from "../../context/AuthContext";
import apiClient from "api/apiClient";
import "@testing-library/jest-dom";

// Create a mock navigate function.
const mockNavigate = jest.fn();

// Mock useNavigate from react-router-dom.
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the apiClient module so its default export has a "post" method.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    post: jest.fn(() => Promise.resolve({ data: { token: "fake-token" } })),
  },
}));

describe("Login Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("redirects to home if already logged in", () => {
    // Provide context with an existing token.
    const contextValue = {
      token: "existing-token",
      setToken: jest.fn(),
    };

    render(
      <AuthContext.Provider value={{ contextData: contextValue }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Expect the navigate function to be called with "/" immediately.
    expect(mockNavigate).toHaveBeenCalledWith("/");
    // The component returns an empty string, so the login form should not be present.
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  test("renders login form when not logged in", () => {
    // Provide context with no token.
    const contextValue = {
      token: "",
      setToken: jest.fn(),
    };

    render(
      <AuthContext.Provider value={{ contextData: contextValue }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Use getByRole for the main heading (h1) which should contain "Login".
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Login/i);

    // Check that the instruction paragraph is rendered.
    expect(
      screen.getByText(
        /To continue using our platform, you need to login an account/i
      )
    ).toBeInTheDocument();

    // Since our inputs have no placeholders/labels, use querySelector.
    const emailInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
});
