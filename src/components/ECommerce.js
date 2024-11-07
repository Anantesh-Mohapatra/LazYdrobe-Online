// ECommerce.js
import React, { useState } from 'react';
import ECommerceItem from './ECommerceItem';
import '../App.css';
import './styling/ECommerce.css';

const ECommerce = ({ items }) => {
  console.log("ECommerce Items:", items);
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.category ? item.category.toLowerCase().includes(filter.toLowerCase()) : false
  );

  return (
    <div className="ecommerce">
      <input 
        type="text" 
        placeholder="Filter by category" 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="ecommerce-grid">
        {filteredItems.map(item => (
          <ECommerceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Set default props to prevent undefined items
ECommerce.defaultProps = {
  items: []
};

export default ECommerce;
