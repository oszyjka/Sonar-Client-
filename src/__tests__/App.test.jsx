/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();

jest.mock('../hooks/useCart', () => {
  const actual = jest.requireActual('../hooks/useCart');
  return {
    useCart: () => ({
      cartItems: [{ id: 1 }, { id: 2 }],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    }),
  };
});

jest.mock('../components/Products', () => ({ addToCart }) => (
  <div>
    Products Page
    <button onClick={() => addToCart({ id: 1, name: 'Test Product' })}>
      Add Test Product
    </button>
  </div>
));

jest.mock('../components/Cart', () => ({ cartItems, removeFromCart }) => (
  <div>
    Cart Page
    <div data-testid="cart-count">{cartItems.length}</div>
    <button onClick={() => removeFromCart(1)}>Remove Item</button>
  </div>
));

jest.mock('../components/Payments', () => ({ cartItems, clearCart }) => (
  <div>
    Payments Page
    <div data-testid="payment-count">{cartItems.length}</div>
    <button onClick={clearCart}>Clear Cart</button>
  </div>
));

describe('App routing and navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('1. List navigation links', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /Products/i })).toBeInTheDocument();
    expect(screen.getByText(/Cart \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Payments/i)).toBeInTheDocument();
  });

  test('2. Show Products page by default and allow adding to cart', () => {
    render(<App />);

    expect(screen.getByText(/Products Page/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Add Test Product/i));
    expect(mockAddToCart).toHaveBeenCalledWith({ id: 1, name: 'Test Product' });
  });

  test('3. Navigate to Cart page and remove item', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Cart \(2\)/i));
    expect(screen.getByText(/Cart Page/i)).toBeInTheDocument();
    expect(screen.getByTestId('cart-count').textContent).toBe('2');

    fireEvent.click(screen.getByText(/Remove Item/i));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  test('4. Navigate to Payments page on link click', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Payments/i));
    expect(screen.getByText(/Payments Page/i)).toBeInTheDocument();
    expect(screen.getByTestId('payment-count').textContent).toBe('2');

    fireEvent.click(screen.getByText(/Clear Cart/i));
    expect(mockClearCart).toHaveBeenCalled();
  });
});
