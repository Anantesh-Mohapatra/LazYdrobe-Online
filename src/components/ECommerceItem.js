// ECommerceItem.js
import React from 'react';
import '../App.css';

const ECommerceItem = ({ item }) => {
  return (
    <div className="ecommerce-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.category}</p>
    </div>
  );
};

export default ECommerceItem;
