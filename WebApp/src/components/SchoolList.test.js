import React from "react";
import { render, cleanup } from "@testing-library/react";
import SchoolList from "./SchoolList";

describe("SchoolList", () => {
  test.each([
    [0, "No records."],
    [4, "Total 4 results."],
  ])(
    "when total prop is %j result message shows %j",
    (total, result) => {
      const schoolList = render(<SchoolList schools={[]} getSchools={jest.fn()} total={total} />);
      expect(schoolList.getByText(result)).toBeInTheDocument();
    }
  );
  
  afterEach(cleanup);
});
