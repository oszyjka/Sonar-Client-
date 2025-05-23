import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PropTypes from 'prop-types';

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/products')
      .then((res) => {
        console.log('Products response:', res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {loading && <p>Loading...</p>}
      {!loading && products.length === 0 && <p>No products found.</p>}
      {!loading && products.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button
                onClick={() => addToCart(product)}
                style={{ marginLeft: '1rem' }}
              >
                Buy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Products.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Products;
