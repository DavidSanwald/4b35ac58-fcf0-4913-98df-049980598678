import { rest } from "msw";
import { url } from "@/data";
import response from "./mockData.json";

// Define handlers that catch the corresponding requests and returns the mock data.
export const sucessHandler = [
  rest.get(url, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(response));
  }),
];

export const errorHandler = [
  rest.get(url, (_, res, ctx) => {
    return res(ctx.status(403));
  }),
];
