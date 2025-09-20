// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://mittarv.onrender.com/api",
  withCredentials: true, // send cookies/session if your backend uses them
});

export default api;
