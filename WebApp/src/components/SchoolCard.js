import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { BsLink45Deg } from "react-icons/bs";

export default function SchoolCard({ data, index }) {
  var location;
  if (!data.suburb && !data.state) {
    location = "Unknown";
  } else if (data.suburb && data.state) {
    location = `${data.suburb}, ${data.state}`;
  } else {
    location = data.suburb || data.state;
  }
  return (
    <div className="schoolCard">
      <Row>
        <Col>
          <h5 className="text-single">
            {index + 1}.{data.name}
          </h5>
        </Col>
      </Row>
      <Row>
        <SchoolProperty label="School Sector" value={data.sector} />
        <SchoolProperty label="School Type" value={data.type} />
        <SchoolProperty label="Location" value={location} />
        <Col md={3} sm={6} xs={6} className="schoolCard-column">
          <Button
            disabled={!data.website}
            variant="primary"
            onClick={() => window.open(data.website, "_blank")}
          >
            School Website <BsLink45Deg />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

SchoolCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sector: PropTypes.string,
    type: PropTypes.string,
    suburb: PropTypes.string,
    state: PropTypes.string,
    website: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

export function SchoolProperty({ label, value }) {
  return (
    <Col md={3} sm={6} xs={6} className="schoolCard-column">
      <div className="text-secondary">{label}</div>
      <div className="text-main">{value || "Unknown"}</div>
    </Col>
  );
}
