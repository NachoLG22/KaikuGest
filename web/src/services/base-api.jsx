import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL || 'http://localhost:3001/api/v1',
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && !window.location.href.includes('login')) {
      window.location.href = "/login";
      return Promise.resolve();
    } else {
      return Promise.reject(error);
    }
  }
);

export default http;
