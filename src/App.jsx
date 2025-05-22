import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Products from './components/Products';
import Payments from './components/Payments';

import Cart from './components/Cart';
import { useCart } from './hooks/useCart';

function App() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Products</Link> |{' '}
        <Link to="/cart">Cart ({cartItems.length})</Link> |{' '}
        <Link to="/payments">Payments</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
        <Route
          path="/payments"
          element={<Payments cartItems={cartItems} clearCart={clearCart} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
