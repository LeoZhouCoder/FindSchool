import React from "react";
import InfiniteList from "./InfiniteList";
import SchoolCard from "./SchoolCard";

export default function SchoolList({ schools, getSchools, total }) {
  return (
    <div className="schoolList-container">
      <div className="schoolList-result text-secondary">
        {total > 0 ? `Total ${total} results.` : "No records."}
      </div>
      <div className="schoolList-list">
        <InfiniteList
          hasMoreItems={schools.length < total}
          loadMoreItems={getSchools}
          items={schools}
          ItemComponent={SchoolCard}
          keyName="id"
        />
      </div>
    </div>
  );
}
