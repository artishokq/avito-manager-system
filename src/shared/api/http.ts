import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 10000,
});
