"use client";

import axi  from "./axi";

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
}[] = [];

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
  res => res,
  async error => {
    const originalRequest = error.config;

    // Not an auth error → not our problem
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Never retry refresh or auth checks
    if (
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/me")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If refresh already happening → wait
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => axi(originalRequest));
    }

    isRefreshing = true;

    try {
      // 🔁 Silent refresh (cookies only)
      await axi.post("/auth/refresh");

      failedQueue.forEach(p => p.resolve());
      failedQueue = [];

      return axi(originalRequest);
    } catch (err) {
      failedQueue.forEach(p => p.reject(err));
      failedQueue = [];

      // ❌ refresh failed → session dead
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

