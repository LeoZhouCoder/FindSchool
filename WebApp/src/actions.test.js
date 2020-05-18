import { cleanup } from "@testing-library/react";
import { getSearchOptions, getSchools } from "./actions";

describe("getSearchOptions", () => {
  it("fetches data from server when server returns a successful response", () => {
    const mockSuccessResponse = [
      { name: "SearchOption0", options: ["option0", "options1"] },
    ];
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return expect(getSearchOptions()).resolves.toBe(mockSuccessResponse);
  });

  it("fetches data from server when server returns a error", () => {
    const mockFetchPromise = Promise.reject("error");
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return expect(getSearchOptions()).rejects.toThrow();
  });

  afterEach(cleanup);
});

describe("getSchools", () => {
  it("fetches data from server when server returns a successful response", () => {
    const mockSuccessResponse = {
      schools: [
        {
          id: "5eb409110476d3d990136c83",
          name: "Ashfield Boys High School",
          suburb: "Ashfield",
          state: "NSW",
          sector: "Government",
          type: "Secondary",
          website: "https://ashfieldbo-h.schools.nsw.gov.au/",
        },
      ],
      total: 1,
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return expect(getSchools({ query: "boys" })).resolves.toBe(
      mockSuccessResponse
    );
  });

  it("fetches data from server when server returns a error", () => {
    const mockFetchPromise = Promise.reject("error");
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    return expect(getSchools({ query: "boys" })).rejects.toThrow();
  });

  afterEach(cleanup);
});
