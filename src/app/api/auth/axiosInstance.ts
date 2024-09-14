import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export { publicAxiosInstance, authAxiosInstance };
