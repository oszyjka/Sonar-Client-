/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Products from '../Products';
import api from '../../api/axios';

// Mock the api module
jest.mock('../../api/axios');

describe('Products component', () => {
  const sampleProducts = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Phone', price: 800 },
  ];

  test('1. Show loading initially and then renders products', async () => {
    api.get.mockResolvedValueOnce({ data: sampleProducts });

    render(<Products addToCart={jest.fn()} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone/i)).toBeInTheDocument();
    });
  });

  test('2. Show "No products found." when API returns empty list', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(<Products addToCart={jest.fn()} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/No products found./i)).toBeInTheDocument();
    });
  });

  test('3. Call addToCart when Buy button is clicked', async () => {
    api.get.mockResolvedValueOnce({ data: sampleProducts });

    const addToCartMock = jest.fn();

    render(<Products addToCart={addToCartMock} />);

    await waitFor(() => screen.getByText(/Laptop/i));

    const buyButtons = screen.getAllByText(/Buy/i);
    fireEvent.click(buyButtons[0]);

    expect(addToCartMock).toHaveBeenCalledWith(sampleProducts[0]);
  });

  test('4. Handle API errors gracefully', async () => {
    api.get.mockRejectedValueOnce(new Error('API error'));

    render(<Products addToCart={jest.fn()} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/No products found./i)).toBeInTheDocument();
    });
  });

  test('5. List product names and Buy buttons', async () => {
    api.get.mockResolvedValue({ data: sampleProducts });
    const addToCartMock = jest.fn();
    render(<Products addToCart={addToCartMock} />);

    await waitFor(() => {
      expect(screen.getByText(/Laptop/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Buy/i)).toHaveLength(2);
    });
  });
});
