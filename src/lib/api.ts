import axios from "axios";

export const api = axios.create({
  baseURL: 'https://crm-backened.onrender.com',
  // baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

