'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tour } from '@/types';

export interface CartItem {
  tour: Tour;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (tour: Tour) => void;
  removeFromCart: (tourId: number) => void;
  clearCart: () => void;
  totalItems: number;
  isInCart: (tourId: number) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('omp-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('omp-cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addToCart = (tour: Tour) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.tour.id === tour.id);
      if (exists) return prev; // already in cart
      return [...prev, { tour, quantity: 1 }];
    });
  };

  const removeFromCart = (tourId: number) => {
    setItems((prev) => prev.filter((i) => i.tour.id !== tourId));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.length;
  const isInCart = (tourId: number) => items.some((i) => i.tour.id === tourId);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
