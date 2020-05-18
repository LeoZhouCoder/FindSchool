import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("disable search button and input field when loading", () => {
    const searchBar = render(
      <SearchBar
        name="MultiSelect"
        searchOptions={[]}
        onSearch={jest.fn()}
        loading={true}
      />
    );
    expect(searchBar.getByTestId("input")).toBeDisabled();
    expect(searchBar.getByTestId("spinner")).toBeInTheDocument();
    expect(searchBar.getByText("Search").closest("button")).toBeDisabled();
  });

  it("display MultiSelect when have searchOptions and action as expect", () => {
    const searchOptions = [
      {
        key: "multiSelect1",
        name: "MultiSelect1",
        options: ["option00", "option01"],
      },
      {
        key: "multiSelect2",
        name: "MultiSelect2",
        options: ["option10", "option11", "option12"],
      },
    ];

    const onSearch = jest.fn();

    const searchBar = render(
      <SearchBar
        name="SearchBar"
        searchOptions={searchOptions}
        onSearch={onSearch}
        loading={false}
      />
    );

    const multiSelect1 = searchBar.getByText(/MultiSelect1/g);
    const multiSelect2 = searchBar.getByText(/MultiSelect2/g);
    expect(multiSelect1).toBeInTheDocument();
    expect(multiSelect2).toBeInTheDocument();

    const input = searchBar.getByTestId("input");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Search Query" } });

    const button = searchBar.getByText("Search").closest("button");
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith({ query: "Search Query" });

    fireEvent.click(multiSelect1);
    const Option00 = searchBar.getByText("Option00");
    expect(Option00).toBeInTheDocument();

    fireEvent.click(Option00);
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledWith({
      query: "Search Query",
      multiSelect1: ["option01"],
    });
  });

  afterEach(cleanup);
});
