// Registration.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registration from "./Registration"; // Ensure this file exports the Registration component
import { AuthContext } from "context/AuthContext";
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

// Mock apiClient so that its default export has a "post" method.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    post: jest.fn(() => Promise.resolve({ status: 201 })),
  },
}));

describe("Registration Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to offers if already logged in", () => {
    // Provide context with an existing token.
    const contextValue = {
      token: "existing-token",
      setToken: jest.fn(),
    };

    render(
      <AuthContext.Provider
        value={{ token: contextValue.token, setToken: contextValue.setToken }}
      >
        <MemoryRouter>
          <Registration />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Expect navigation to "/offers" immediately.
    expect(mockNavigate).toHaveBeenCalledWith("/offers");
    // Registration form should not be rendered.
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
  });

  test("renders registration form when not logged in", () => {
    // Provide context with no token.
    const contextValue = {
      token: "",
      setToken: jest.fn(),
    };

    render(
      <AuthContext.Provider
        value={{ token: contextValue.token, setToken: contextValue.setToken }}
      >
        <MemoryRouter>
          <Registration />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Check that the header and instructions are rendered.
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Registration form/i);
    expect(
      screen.getByText(
        /To continue using our platform, you need to register an account/i
      )
    ).toBeInTheDocument();

    // Verify that input fields exist.
    // There should be four inputs in order: firstname, lastname, email, password.
    const textInputs = document.querySelectorAll('input[type="text"]');
    expect(textInputs.length).toBeGreaterThanOrEqual(1); // First name
    const emailInput = document.querySelector('input[type="email"]');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });
});
