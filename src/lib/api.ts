import axios from "axios";

export const api = axios.create({
  baseURL: 'https://deck-production-35f5.up.railway.app',
  //baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

