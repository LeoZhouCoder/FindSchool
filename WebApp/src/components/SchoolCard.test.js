import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import SchoolCard, { SchoolProperty } from "./SchoolCard";

describe("SchoolCard", () => {
  var schoolData;

  beforeEach(
    () =>
      (schoolData = {
        id: "1",
        name: "Ashfield Boys High School",
        suburb: "Ashfield",
        state: "NSW",
        sector: "Government",
        type: "Secondary",
      })
  );

  it("shows school name as expected", () => {
    schoolData.name = "School Name";
    const index = 1;
    const schoolCard = render(<SchoolCard data={schoolData} index={index} />);
    expect(
      schoolCard.getByText(`${index + 1}.${schoolData.name}`)
    ).toBeInTheDocument();
  });

  test.each([
    ["Ashfield", "NSW", "Ashfield, NSW"],
    [null, null, "Unknown"],
    [null, "NSW", "NSW"],
    ["Ashfield", null, "Ashfield"],
  ])(
    "shows location when suburb is %j state is %j, expected %j",
    (suburb, state, result) => {
      schoolData.suburb = suburb;
      schoolData.state = state;
      const schoolCard = render(<SchoolCard data={schoolData} index={1} />);
      expect(schoolCard.getByText(result)).toBeInTheDocument();
    }
  );

  it("when click website button and school has website, expected window opened school website", () => {
    global.open = jest.fn();
    const website = "https://ashfieldbo-h.schools.nsw.gov.au/";
    schoolData.website = website;
    const schoolCard = render(<SchoolCard data={schoolData} index={1} />);
    fireEvent.click(schoolCard.getByText("School Website"));
    expect(global.open).toHaveBeenCalledWith(website, "_blank");
  });

  it("when school has no website, expected school website button is disabled", () => {
    global.open = jest.fn();
    delete schoolData.website;
    const schoolCard = render(<SchoolCard data={schoolData} index={1} />);
    const websiteButton = schoolCard
      .getByText("School Website")
      .closest("button");
    expect(websiteButton).toBeDisabled();
  });

  afterEach(cleanup);
});

describe("SchoolProperty", () => {
  afterEach(cleanup);
  test.each([
    ["Value", "Value"],
    [null, "Unknown"],
  ])("shows property value when it is %j, expected %j", (value, result) => {
    const schoolProperty = render(<SchoolProperty label="Label" value={value} />);
    expect(schoolProperty.getByText(result)).toBeInTheDocument();
  });
});
