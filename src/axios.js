// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-mittarv.onrender.com/api",//If testing locally, change it to something like http://localhost:5000/api. if 5000 is the port where backend is running
  withCredentials: true, // send cookies/session if your backend uses them
});

export default api;
