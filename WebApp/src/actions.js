const SERVER = "http://findschools.azurewebsites.net/";

export const getSearchOptions = () => {
  return fetch(SERVER + "api/getSearchOptions", {
    method: "GET",
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .catch((ex) => {
      throw new Error("getSearchOptions failed:" + ex);
    });
};

export const getSchools = (query) => {
  return fetch(SERVER + "api/getSchools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .catch((ex) => {
      throw new Error("getSchools failed:" + ex);
    });
};
