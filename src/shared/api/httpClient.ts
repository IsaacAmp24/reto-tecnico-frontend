import axios from "axios";
import qs from "qs";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
});