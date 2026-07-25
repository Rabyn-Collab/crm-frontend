import axios from "axios";

export const api = axios.create({
  baseURL: 'https://crm-backened.onrender.com',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

