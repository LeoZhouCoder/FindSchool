import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchBar from "./components/SearchBar";
import SchoolList from "./components/SchoolList";

import { getSearchOptions, getSchools } from "./actions";

export default class App extends React.Component {
  state = {
    searchOptions: null,
    query: null,
    schools: [],
    total: 0,
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    getSearchOptions().then((options) => {
      this.setState({ loading: false, searchOptions: options });
    });
  }

  onSearch = (query) => {
    this.setState({ query: query, total: 0, schools: [] }, () => {
      this.loadSchools();
    });
  };

  loadSchools = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });

    getSchools(
      Object.assign({}, this.state.query, {
        position: this.state.schools.length,
        limit: 20,
      })
    ).then((result) => {
      this.setState({ loading: false });
      if (result) {
        const { schools, total } = result;
        this.setState({
          schools: [...this.state.schools, ...schools],
          total: total,
        });
      }
    });
  };

  render() {
    return (
      <div className="app-container">
        <SearchBar
          searchOptions={this.state.searchOptions}
          loading={this.state.loading}
          onSearch={this.onSearch}
        />
        <SchoolList
          schools={this.state.schools}
          total={this.state.total}
          getSchools={this.loadSchools}
        />
      </div>
    );
  }
}
