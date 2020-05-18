import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import MultiSelect from "./MultiSelect";

describe("MultiSelect", () => {
  it("shows nothing when options is empty", () => {
    const { container } = render(
      <MultiSelect name="MultiSelect" options={[]} onChange={jest.fn()} />
    );
    expect(container).toBeEmpty();
  });

  it("action as expected", () => {
    const onChange = jest.fn();

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((init) => [init, setState]);

    const options = ["option0", "option1", "option2"];

    const select = render(
      <MultiSelect name="MultiSelect" options={options} onChange={onChange} />
    );

    const selectDropdown = select.getByText("MultiSelect: Any");
    expect(selectDropdown).toBeInTheDocument();

    fireEvent.click(selectDropdown);
    const option0 = select.getByText("Option0");
    expect(option0).toBeInTheDocument();
    const option1 = select.getByText("Option1");
    expect(option1).toBeInTheDocument();
    const option2 = select.getByText("Option2");
    expect(option2).toBeInTheDocument();

    fireEvent.click(option0);
    expect(onChange).toHaveBeenCalledWith(["option1", "option2"]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(select.getByText("MultiSelect: 2/3")).toBeInTheDocument();

    fireEvent.click(option1);
    expect(onChange).toHaveBeenCalledWith(["option2"]);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(select.getByText("MultiSelect: Option2")).toBeInTheDocument();

    fireEvent.click(option2);
    expect(onChange).toHaveBeenCalledTimes(2);
    fireEvent.click(option1);
    fireEvent.click(option0);
    expect(onChange).toHaveBeenCalledWith(null);
  });

  afterEach(cleanup);
});
