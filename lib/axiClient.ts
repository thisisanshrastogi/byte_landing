"use client";
import axi from "./axi";

let isRefreshing = false;

type QueueItem = {
  resolve: (value?: any) => void;
  reject: (err: any) => void;
};

let failedQueue: QueueItem[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

axi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // No response or non-401 → not auth-related
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Never intercept auth endpoints
    if (
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already in progress, wait
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => axi(originalRequest));
    }

    isRefreshing = true;

    try {
      // Silent refresh (cookie-based)
      await axi.post("/auth/refresh");

      processQueue();
      return axi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      // Session is dead — hard logout
    window.location.replace("/login");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
