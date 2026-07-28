import { useState, useEffect } from 'react';
import { BookingContext } from './BookingContext';

const STORAGE_KEY = 'hotel_booking_cart';

export const BookingProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error('Could not save cart to local storage:', err.message);
    }
  }, [cartItems]);

  const addBooking = (booking) => {
    setCartItems((prev) => [...prev, { ...booking, id: crypto.randomUUID() }]);
  };

  const removeBooking = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return (
    <BookingContext.Provider
      value={{ cartItems, addBooking, removeBooking, clearCart, cartCount, cartTotal }}
    >
      {children}
    </BookingContext.Provider>
  );
};