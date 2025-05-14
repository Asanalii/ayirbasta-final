// Settings.test.js

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Settings from "./Settings"; // Ensure Settings.jsx exports your settings page component.
import { AuthContext } from "context/AuthContext";
import apiClient from "api/apiClient";
import "@testing-library/jest-dom";

// Mock apiClient so its default export has both get and patch methods.
jest.mock("api/apiClient", () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    patch: jest.fn(() => Promise.resolve({ data: {} })),
  },
}));

const mockContextData = { token: "mockToken" };

// Helper to render with AuthContext and MemoryRouter.
const renderWithContext = (ui, { providerProps, ...renderOptions } = {}) =>
  render(
    <AuthContext.Provider value={providerProps}>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthContext.Provider>,
    renderOptions
  );

// Override window.alert for testing.
window.alert = jest.fn();

describe("Settings Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders profile settings header and populates form with fetched user data", async () => {
    // Simulate GET /v1/users/profile response.
    const mockProfileData = {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      city: "New York",
    };
    apiClient.get.mockResolvedValueOnce({ data: mockProfileData });

    renderWithContext(<Settings />, {
      providerProps: { contextData: mockContextData },
    });

    // Wait for the effect to run and the form fields to be populated.
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First name")).toHaveValue("John");
      expect(screen.getByPlaceholderText("Last name")).toHaveValue("Doe");
      expect(screen.getByPlaceholderText("Your Email")).toHaveValue(
        "john@example.com"
      );
      // For the select, we can query by role 'combobox'
      expect(screen.getByRole("combobox")).toHaveValue("New York");
    });

    // Check for header text.
    expect(screen.getByText(/Profile settings/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Here you can change profile inforamtion/i)
    ).toBeInTheDocument();
  });

  test("submits form and alerts success on profile update", async () => {
    // Simulate initial profile fetch.
    const mockProfileData = {
      firstname: "Jane",
      lastname: "Smith",
      email: "jane@example.com",
      city: "London",
    };
    apiClient.get.mockResolvedValueOnce({ data: mockProfileData });
    // Simulate successful PATCH update.
    apiClient.patch.mockResolvedValueOnce({ data: {} });

    renderWithContext(<Settings />, {
      providerProps: { contextData: mockContextData },
    });

    // Wait for GET to populate form.
    await waitFor(() => {
      expect(screen.getByPlaceholderText("First name")).toHaveValue("Jane");
    });

    // Update fields.
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Janet" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), {
      target: { value: "janet@example.com" },
    });
    // For the select, query by role "combobox"
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Astana" },
    });

    // Simulate file selection.
    // The file input is hidden; query it by id.
    // const fileInput = document.getElementById("file");
    // const file = new File(["dummy content"], "dummy.png", { type: "image/png" });
    // fireEvent.change(fileInput, { target: { files: [file] } });

    // Click the SAVE button.
    const saveButton = screen.getByRole("button", { name: /SAVE/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalledWith(
        "/v1/users/update",
        {
          firstname: "Janet",
          lastname: "Doe",
          email: "janet@example.com",
          city: "Astana",
          picture: null,
        },
        expect.objectContaining({
          headers: { Authorization: `Bearer ${mockContextData.token}` },
        })
      );
      expect(window.alert).toHaveBeenCalledWith(
        "Profile updated successfully!"
      );
    });
  });

  test("handles update error and alerts failure", async () => {
    const mockProfileData = {
      firstname: "Alice",
      lastname: "Wonder",
      email: "alice@example.com",
      city: "Vienna",
    };
    apiClient.get.mockResolvedValueOnce({ data: mockProfileData });
    // Simulate PATCH error.
    apiClient.patch.mockRejectedValueOnce(new Error("Update failed"));

    renderWithContext(<Settings />, {
      providerProps: { contextData: mockContextData },
    });

    await waitFor(() => {
      expect(screen.getByPlaceholderText("First name")).toHaveValue("Alice");
    });

    // Submit the form without changing fields.
    const saveButton = screen.getByRole("button", { name: /SAVE/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(apiClient.patch).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to update profile. Please try again."
      );
    });
  });
});
