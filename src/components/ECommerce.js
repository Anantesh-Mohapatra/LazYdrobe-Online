// ECommerce.js
import React, { useState } from 'react';
import ECommerceItem from './ECommerceItem';
import '../App.css';

const ECommerce = ({ items }) => {
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.category.toLowerCase().includes(filter.toLowerCase())
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

export default ECommerce;
