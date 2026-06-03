"use client";
import React, { createContext, useContext, useState } from "react";

export type Restaurant = {
  id: number;
  name: string;
  rating: number;
  time: string;
  delivery: string;
  icon: string;
  bg: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: string;
  desc: string;
  type: string;
  image: string;
  isBestSeller: boolean;
};

export type CartItem = MenuItem & {
  qty: number;
};

interface PhoneContextType {
  activeRestaurant: Restaurant | null;
  setActiveRestaurant: (r: Restaurant | null) => void;
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  walletBalance: number;
  setWalletBalance: (b: number) => void;
  orders: any[];
  addOrder: (order: any) => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [walletBalance, setWalletBalance] = useState(1000);
  const [orders, setOrders] = useState<any[]>([]);

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty - 1 } : i
        );
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const clearCart = () => setCartItems([]);

  const addOrder = (order: any) => setOrders((prev) => [order, ...prev]);

  return (
    <PhoneContext.Provider
      value={{
        activeRestaurant,
        setActiveRestaurant,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        walletBalance,
        setWalletBalance,
        orders,
        addOrder,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error("usePhone must be used within PhoneProvider");
  }
  return context;
};
