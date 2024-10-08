import axios from "axios";
export const Axios = axios.create({
  baseURL: "https://fyp-testing-server.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
