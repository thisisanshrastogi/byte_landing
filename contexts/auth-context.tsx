"use client";

import axi from "@/lib/axi";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  data: {
    id: string;
    email: string;
    name: string;
  };

  walletBalance: number;
}

type RegisterRequestBody = {
  name: string;
  email: string;
  password: string;
  role: "student";
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    token: string,
  ) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  updateWalletBalance: (newBalance: number) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshFailed, setRefreshFailed] = useState(false);

  const pathname = usePathname();

  const isPublicRoute = pathname.startsWith("/login");

  useEffect(() => {
    if (isPublicRoute) {
      setLoading(false);
      return;
    }

    refreshUser();
  }, [pathname]);

  const refreshUser = async () => {
    try {
      const { data } = await axi.get("/auth/me");
      setUser(data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setUser(null);
        setRefreshFailed(true);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (refreshFailed) return;
    refreshUser();
  }, [refreshFailed]);

  // 🔐 Login → cookies set → rehydrate via /me
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axi.post("/auth/login", { email, password });
      if (res.status === 200) {
        await refreshUser();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await axi.post("/auth/logout");
    } finally {
      setUser(null);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    token: string,
  ): Promise<boolean> => {
    try {
      const body: RegisterRequestBody = {
        name,
        email,
        password,
        role: "student",
      };
      const res = await axi.post(`/auth/signup?token=${token}`, body);
      return res.status === 200;
    } catch {
      return false;
    }
  };

  const resetPassword = async (
    token: string,
    newPassword: string,
  ): Promise<boolean> => {
    try {
      const res = await axi.post("/auth/reset-password", {
        token,
        new_password: newPassword,
      });
      return res.status === 200;
    } catch {
      return false;
    }
  };

  const updateWalletBalance = (newBalance: number) => {
    setUser((prev) => (prev ? { ...prev, walletBalance: newBalance } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        resetPassword,
        updateWalletBalance,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
