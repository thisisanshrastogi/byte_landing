"use client";
import axi from "./axi";

let isRefreshing = false;

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  failedQueue = [];
};

axi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle phone verification required
    if (error.response?.status === 428) {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (!path.startsWith("/verify-phone")) {
          window.location.href = "/verify-phone";
        }
      }
      return Promise.reject(error);
    }

    // Not an auth error
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Never retry these
    if (
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => axi(originalRequest));
    }

    isRefreshing = true;

    try {
      await axi.post("/auth/refresh");
      processQueue();
      return axi(originalRequest);
    } catch (err) {
      processQueue(err);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default axi;
