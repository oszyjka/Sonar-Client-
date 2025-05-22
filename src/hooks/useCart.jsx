import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return { cartItems, addToCart, removeFromCart, clearCart };
}
