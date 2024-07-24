import axios from "axios";
import { API_PPGCO_URL } from "core/env";

export const axiosAuth = axios.create({
  baseURL: `${API_PPGCO_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
