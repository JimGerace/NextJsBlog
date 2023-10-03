"use client";
import axios from "axios";
import toast from "react-hot-toast";

export default function request(config) {
  const instance = axios.create({
    baseURL: "/",
    timeout: 1000 * 60 * 3,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.status !== 200) {
        toast.error("网络异常，请稍后再试");
      }
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance(config);
}
