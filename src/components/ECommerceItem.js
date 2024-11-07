// ECommerceItem.js
import React from 'react';

const ECommerceItem = ({ item }) => {
  return (
    <div className="ecommerce-item">
      <img src={item.image_url} alt={item.product_name} />
      <h3>{item.product_name}</h3>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default ECommerceItem;
