const API_BASE = "https://6c3f0173-e123-4f5b-873f-b345307e36c4.mock.pstmn.io";

function getToken() {
  return localStorage.getItem("token");
}

function apiFetch(endpoint, options = {}) {
  if (!options.headers) options.headers = {};
  options.headers["Authorization"] = `Bearer ${getToken()}`;
  options.headers["Content-Type"] = "application/json";

  return fetch(`${API_BASE}${endpoint}`, options).then((response) =>
    response.json()
  );
}
