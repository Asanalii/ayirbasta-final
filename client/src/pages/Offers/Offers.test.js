// Offers.test.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Offers from "./Offers"; // Make sure Offers.jsx exports your component as Offers
import { AuthContext } from "context/AuthContext";
import apiClient from "api/apiClient";
import "@testing-library/jest-dom";

// Mock the apiClient module so that its default export has a 'get' method.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockContextData = {
  token: "mockToken",
};

const renderWithContext = (ui, { providerProps, ...renderOptions } = {}) => {
  return render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>,
    renderOptions
  );
};

describe("Offers Component", () => {
  beforeEach(() => {
    // Reset the mock for each test.
    apiClient.get.mockReset();
  });

  //   test("renders ADD OFFER button", () => {
  //     renderWithContext(<Offers />, {
  //       providerProps: { contextData: mockContextData },
  //     });
  //     const addButton = screen.getByRole("button", { name: /ADD OFFER/i });
  //     expect(addButton).toBeInTheDocument();
  //   });

  test("displays offers when available", async () => {
    const mockOffers = [
      {
        id: 1,
        name: "Offer 1",
        category: "Category 1",
        image: "image1.png",
        status: "active",
      },
      {
        id: 2,
        name: "Offer 2",
        category: "Category 2",
        image: "image2.png",
        status: "active",
      },
    ];

    // Set up the mock API response.
    apiClient.get.mockResolvedValueOnce({ data: { items: mockOffers } });

    renderWithContext(<Offers />, {
      providerProps: { contextData: mockContextData },
    });

    await waitFor(() => {
      expect(screen.getByText(/Offer 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Offer 2/i)).toBeInTheDocument();
    });
  });

  test("displays empty message when no offers are available", async () => {
    // Mock an empty API response.
    apiClient.get.mockResolvedValueOnce({ data: { items: [] } });

    renderWithContext(<Offers />, {
      providerProps: { contextData: mockContextData },
    });

    await waitFor(() => {
      const emptyMessage = screen.getByText(
        /You still haven't added a product to exchange/i
      );
      expect(emptyMessage).toBeInTheDocument();
    });
  });
});
