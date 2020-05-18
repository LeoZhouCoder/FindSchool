# Find schools

A simple application that can find Australia schools base on user's search query.
All school data imported from ACARA update to 2019.
Currently, Web API published on free Azure Web server, so it might be a little slow when fetching data.

## Before Run project

In the project directory, run: "npm install"

## Run project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### TODO

- [x] Backend
  - [x] Australia school data
  - [x] Import to DB
  - [x] API - fetch search options base on data
  - [x] API - fetch data base on query
- [ ] Front End
  - [x] MultiSelect
  - [x] SearchBar
  - [x] InfiniteList
  - [x] SchoolCard
  - [x] SchoolList
  - [x] App
