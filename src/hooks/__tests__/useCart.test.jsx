/* eslint-disable no-undef */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';

describe('useCart hook', () => {
  test('1. Initial cart is empty', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cartItems).toHaveLength(0);
  });

  test('2. addToCart adds items', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart({ id: 1, name: 'Laptop', price: 1999 });
    });
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({
      id: 1,
      name: 'Laptop',
      price: 1999,
    });

    act(() => {
      result.current.addToCart({ id: 2, name: 'T-Shirt', price: 30 });
    });
    expect(result.current.cartItems).toHaveLength(2);
    expect(result.current.cartItems[1].name).toBe('T-Shirt');
  });

  test('3. removeFromCart removes correct item', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart({ id: 1, name: 'Laptop', price: 1999 });
      result.current.addToCart({ id: 2, name: 'T-Shirt', price: 30 });
    });
    expect(result.current.cartItems).toHaveLength(2);

    act(() => {
      result.current.removeFromCart(0);
    });
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('T-Shirt');

    act(() => {
      result.current.removeFromCart(5);
    });

    expect(result.current.cartItems).toHaveLength(1);
  });

  test('4. clearCart empties the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart({ id: 1, name: 'Laptop', price: 1999 });
    });
    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });
    expect(result.current.cartItems).toHaveLength(0);
  });

  test('5. cartItems returns a new array on add/remove', () => {
    const { result } = renderHook(() => useCart());

    const item = { name: 'Book', price: 10 };
    const prevCart = result.current.cartItems;
    act(() => result.current.addToCart(item));
    const newCart = result.current.cartItems;

    expect(prevCart).not.toBe(newCart);
    expect(Array.isArray(newCart)).toBe(true);
    expect(newCart[0]).toEqual(item);
  });
});
