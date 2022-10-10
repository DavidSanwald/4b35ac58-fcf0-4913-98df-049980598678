import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach, expect } from "vitest";
import { server } from "./mocks";
import { fetch } from "cross-fetch";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
// Add `fetch` polyfill.
global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
