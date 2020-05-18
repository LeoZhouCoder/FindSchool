import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("App fetches SearchOptions from server when server returns a successful response", (done) => {
    const mockSuccessResponse = [
      {
        key: "search",
        name: "SearchOption0",
        options: ["option0", "options1"],
      },
    ];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const app = render(<App />);

    process.nextTick(() => {
      expect(app.getByText(/SearchOption0/g)).toBeInTheDocument();
      global.fetch.mockClear();

      done();
    });
  });

  afterEach(cleanup);
});
