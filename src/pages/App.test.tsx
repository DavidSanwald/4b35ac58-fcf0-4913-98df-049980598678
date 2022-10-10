import { customRender } from "@/test-utils";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { errorHandler, sucessHandler } from "@/mocks/handlers";
import { server } from "@/mocks/server";
import App from "./App";

describe("The initial App page", () => {
  it("shows a loading indicator at first but changes to the title, once data is loaded", async () => {
    customRender(<App />);
    const loading = await screen.findByText(/Loading/i);
    expect(loading).toBeDefined();
    const title = await screen.findByText(/Upcoming Events/i);
    expect(title).toBeDefined();
    const cardTitle = await screen.findAllByRole("heading", { level: 3 });
    expect(cardTitle).toHaveLength(181);
  });
  it("it provides feedback for network errors to users", async () => {
    server.use(...errorHandler);
    customRender(<App />);
    const error = await screen.findByText(/Error/i);
    expect(error).toBeDefined();
  });
  it("it provides feedback for network errors to users", async () => {
    const user = userEvent.setup();
    server.use(...sucessHandler);
    customRender(<App />);
    const searchInput = await screen.findByPlaceholderText(/Search/i);
    await user.type(searchInput, "Boiler Room Festival London");
    const cardTitle = await screen.findAllByRole("heading", { level: 3 });
    expect(cardTitle).length(5);
  });
});
