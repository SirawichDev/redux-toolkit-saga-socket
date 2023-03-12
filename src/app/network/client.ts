import axios from "axios";

const axiosClient =  axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptors
axiosClient.interceptors.request.use(config => {
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(response => {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

const get = axiosClient.get
const post = axiosClient.post

export { get, post}