import axios from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

const authAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

authAxiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { publicAxiosInstance, authAxiosInstance };
