// BartersPage.test.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BartersPage from "./BartersPage"; // Ensure this file exports BartersPage
import { AuthContext } from "context/AuthContext";
import apiClient from "api/apiClient";
import "@testing-library/jest-dom";

// Mock apiClient so that its default export has a 'get' method.
// Also supply a default implementation so that any call returns a resolved promise.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
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

describe("BartersPage Component", () => {
  beforeEach(() => {
    // Reset the mock for each test.
    apiClient.get.mockReset();
  });

  test("renders the Active Barters header", async () => {
    // Simulate an API response for trades (even an empty array)
    apiClient.get.mockImplementation((url) => {
      if (url === "/v1/users/trades") {
        return Promise.resolve({ data: { trade: [] } });
      }
      return Promise.resolve({ data: {} });
    });

    renderWithContext(<BartersPage />, {
      providerProps: { contextData: mockContextData },
    });

    // Wait for the loading state to end and check for header text.
    await waitFor(() => {
      expect(screen.getByText(/Active Barters/i)).toBeInTheDocument();
    });
  });

  test("displays 'Trades to you' section when trades with receiver are available", async () => {
    // Simulate a trade where the receiver is provided as an object with an id.
    const mockTrade = [
      {
        _id: "trade1",
        giver: "giver1",
        receiver: { id: "receiver1" },
      },
    ];

    // For any API call not for trades, return a resolved promise with empty item data.
    apiClient.get.mockImplementation((url) => {
      if (url === "/v1/users/trades") {
        return Promise.resolve({ data: { trade: mockTrade } });
      } else {
        return Promise.resolve({ data: { item: {} } });
      }
    });

    renderWithContext(<BartersPage />, {
      providerProps: { contextData: mockContextData },
    });

    await waitFor(() => {
      expect(screen.getByText(/Trades to you/i)).toBeInTheDocument();
      // Check that a button with "Barter info" is rendered in the Trades to you section.
      expect(
        screen.getByRole("button", { name: /Barter info/i })
      ).toBeInTheDocument();
    });
  });

  test("displays 'Trades from you' section when trades from you are available", async () => {
    // Simulate a trade where giver and trade id are provided.
    // Note: The component creates tradesFromMe as a concatenated string.
    const mockTrade = [
      {
        _id: "trade2",
        giver: "giver2",
        receiver: { id: "receiver2" },
      },
    ];

    apiClient.get.mockImplementation((url) => {
      if (url === "/v1/users/trades") {
        return Promise.resolve({ data: { trade: mockTrade } });
      } else {
        return Promise.resolve({ data: { item: {} } });
      }
    });

    renderWithContext(<BartersPage />, {
      providerProps: { contextData: mockContextData },
    });

    await waitFor(() => {
      expect(screen.getByText(/Trades from you/i)).toBeInTheDocument();
    });
  });
});
