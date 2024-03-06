import axios from "axios";

const baseURL = "http://localhost:4000"; // Your base URL

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
