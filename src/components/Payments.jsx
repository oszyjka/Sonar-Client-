import React, { useState } from 'react';
import api from '../api/axios';
import PropTypes from 'prop-types';

function Payments({ cartItems, clearCart }) {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = () => {
    if (!cartItems) {
      setMessage('Please select a product first.');
      return;
    }

    api
      .post('/payments', {
        items: cartItems,
        userName,
      })
      .then(() => {
        setMessage(`Payment successful for "${cartItems.length}" items!`);
        setUserName('');
        clearCart();
      })
      .catch((err) => {
        console.error('Payment failed:', err);
        setMessage('Payment failed. Please try again.');
      });
  };

  return (
    <div>
      <h2>Payments</h2>
      <input
        placeholder="Your name"
        value={userName}
        onChange={(user) => setUserName(user.target.value)}
      />
      <button
        onClick={handlePayment}
        disabled={!userName || cartItems.length == 0}
      >
        Pay for {cartItems.length} items
      </button>
      <p>{message}</p>
    </div>
  );
}

Payments.propTypes = {
  cartItems: PropTypes.array.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default Payments;
