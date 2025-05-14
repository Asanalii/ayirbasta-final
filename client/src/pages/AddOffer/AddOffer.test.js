// AddOffer.test.js

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddOffer from "./AddOffer"; // Ensure AddOffer.jsx exports the AddOffer component
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

// Mock apiClient so that its default export has both get and post methods.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

const mockContextData = { token: "mockToken" };

const renderWithContext = (ui, { providerProps, ...renderOptions } = {}) =>
  render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>,
    renderOptions
  );

describe("AddOffer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form fields", () => {
    const { container } = renderWithContext(<AddOffer />, {
      providerProps: { contextData: mockContextData },
    });
    // Scope our query to the form element.
    const form = container.querySelector("form.cont");
    expect(form).toBeInTheDocument();

    // Use within() to search inside the form.
    const itemInfoTexts = within(form).getAllByText(/Item Info/i);
    expect(itemInfoTexts.length).toBeGreaterThan(0);
    expect(
      within(form).getByText(/Please enter your item info/i)
    ).toBeInTheDocument();

    expect(within(form).getByRole("combobox")).toBeInTheDocument();
    expect(within(form).getByPlaceholderText(/Item name/i)).toBeInTheDocument();
    expect(
      within(form).getByPlaceholderText(/Description/i)
    ).toBeInTheDocument();
    expect(
      within(form).getByPlaceholderText(/Link image/i)
    ).toBeInTheDocument();
    expect(
      within(form).getByRole("button", { name: /ADD OFFER/i })
    ).toBeInTheDocument();
  });
});
