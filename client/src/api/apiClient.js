import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const apiClient = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://64.226.119.110:8081",

  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
