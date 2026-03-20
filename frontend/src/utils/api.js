import axios from "axios";

const bakedApiUrl = import.meta.env.VITE_API_URL;

// Vite bakes env vars at server start time. If the dev server was started
// before you updated `.env`, `bakedApiUrl` may point to an unavailable port.
// Fall back to the working default to keep the UI functional.
const apiBaseUrl =
  bakedApiUrl && bakedApiUrl !== "http://localhost:3000"
    ? bakedApiUrl
    : "http://localhost:3002";

const API = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: true,
});

export default API;