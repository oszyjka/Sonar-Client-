/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Payments from '../Payments';
import api from '../../api/axios';

jest.mock('../../api/axios');

describe('Payments component', () => {
  const sampleCartItems = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Phone', price: 800 },
  ];

  test('1. Payment button disabled for empty user', () => {
    render(<Payments cartItems={sampleCartItems} clearCart={jest.fn()} />);

    const input = screen.getByPlaceholderText(/Your name/i);
    const button = screen.getByRole('button', { name: /Pay for 2 items/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('2. Payment button enabled,after entering user name', () => {
    render(<Payments cartItems={sampleCartItems} clearCart={jest.fn()} />);

    const input = screen.getByPlaceholderText(/Your name/i);
    const button = screen.getByRole('button', { name: /Pay for 2 items/i });

    fireEvent.change(input, { target: { value: 'John' } });

    expect(button).toBeEnabled();
  });

  test('3. Payment button disabled for empty cart', () => {
    render(<Payments cartItems={[]} clearCart={jest.fn()} />);

    const input = screen.getByPlaceholderText(/Your name/i);
    const button = screen.getByRole('button', { name: /Pay for 0 items/i });

    fireEvent.change(input, { target: { value: 'John' } });

    expect(button).toBeDisabled();
  });

  test('4. Successful payment message and clear cart', async () => {
    api.post.mockResolvedValueOnce({});

    const clearCartMock = jest.fn();

    render(<Payments cartItems={sampleCartItems} clearCart={clearCartMock} />);

    const input = screen.getByPlaceholderText(/Your name/i);
    const button = screen.getByRole('button', { name: /Pay for 2 items/i });

    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/payments', {
        items: sampleCartItems,
        userName: 'John',
      });

      expect(clearCartMock).toHaveBeenCalled();
      expect(
        screen.getByText(/Payment successful for "2" items!/i),
      ).toBeInTheDocument();
      expect(input.value).toBe('');
    });
  });

  test('5. Failed payment shows failure message', async () => {
    api.post.mockRejectedValueOnce(new Error('Failed'));

    render(<Payments cartItems={sampleCartItems} clearCart={jest.fn()} />);

    const input = screen.getByPlaceholderText(/Your name/i);
    const button = screen.getByRole('button', { name: /Pay for 2 items/i });

    fireEvent.change(input, { target: { value: 'John' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText(/Payment failed. Please try again./i),
      ).toBeInTheDocument();
    });
  });
});
