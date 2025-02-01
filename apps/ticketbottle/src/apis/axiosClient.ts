import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
