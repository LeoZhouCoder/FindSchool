import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Spinner,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import MultiSelect from "./MultiSelect";

export default function SearchBar({ searchOptions, loading, onSearch }) {
  const [query, setQuery] = useState({});
  const onChangeQuery = (key, value) =>
    setQuery(Object.assign({}, query, { [key]: value }));
  return (
    <div className="searchBar-container">
      <Row>
        <Col>
          <h1>Find My School</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12}>
          <InputGroup className="mb-3">
            <FormControl
              disabled={loading}
              data-testid="input"
              placeholder="Search by school name or suburb"
              value={query.query || ""}
              onChange={(e) => onChangeQuery("query", e.target.value)}
            />
            <InputGroup.Append>
              <Button
                variant="primary"
                disabled={loading}
                onClick={() => onSearch(query)}
              >
                Search{" "}
                {loading ? (
                  <Spinner
                    data-testid="spinner"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <BsSearch data-testid="searchIcon" />
                )}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {searchOptions &&
          searchOptions.map((cfg) => (
            <Col
              md={4}
              sm={6}
              xs={12}
              style={{ margin: "0 0 .5em 0" }}
              key={cfg.key}
            >
              <MultiSelect
                name={cfg.name}
                options={cfg.options}
                onChange={(options) => onChangeQuery(cfg.key, options)}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}

SearchBar.propTypes = {
  searchOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  loading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};
