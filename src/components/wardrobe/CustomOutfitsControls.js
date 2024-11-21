import React from 'react';
import PropTypes from 'prop-types';

const CustomOutfitsControls = ({
  outfitFilter,
  setOutfitFilter,
  weatherOutfitFilter,
  setOutfitWeatherFilter
}) => {
  return (
    <div className='filters'>
      <input 
        type="text" 
        placeholder="Filter by outfit occasion" 
        className="type-filter"
        value={outfitFilter}
        onChange={(e) => setOutfitFilter(e.target.value)}
      />
      <select 
        value={weatherOutfitFilter} 
        onChange={(e) => setOutfitWeatherFilter(e.target.value)}
        className="weather-filter"
      >
        <option value="">Select weather filter</option>
        <option value="All Year Around">All Year Around</option>
        <option value="Summer">Summer</option>
        <option value="Winter">Winter</option>
        <option value="Rainy">Rainy</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
};

CustomOutfitsControls.propTypes = {
  outfitFilter: PropTypes.string.isRequired,
  setOutfitFilter: PropTypes.func.isRequired,
  weatherOutfitFilter: PropTypes.string.isRequired,
  setOutfitWeatherFilter: PropTypes.func.isRequired,
};

export default CustomOutfitsControls;