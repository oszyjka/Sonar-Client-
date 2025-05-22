/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Cart';

const sampleItems = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
];

describe('Cart component', () => {
  test('1. List cart items', () => {
    render(<Cart cartItems={sampleItems} removeFromCart={() => {}} />);
    expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/1200/)).toBeInTheDocument();
    expect(screen.getByText(/800/)).toBeInTheDocument();
    expect(screen.getAllByText(/Remove/i)).toHaveLength(2);
  });

  test('2. Calls removeFromCart with correct index when Remove clicked', () => {
    const removeFromCart = jest.fn();
    render(<Cart cartItems={sampleItems} removeFromCart={removeFromCart} />);

    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);

    expect(removeFromCart).toHaveBeenCalledWith(0);
  });

  test('3. Shows empty message when cart is empty', () => {
    render(<Cart cartItems={[]} removeFromCart={() => {}} />);
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});
