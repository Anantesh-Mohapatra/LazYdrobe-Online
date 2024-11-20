import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WardrobeItem from './WardrobeItem';
import WardrobeItemModal from './WardrobeItemModal'; // Import the new WardrobeItemModal component
import '../App.css';
import './styling/Wardrobe.css';
import OutfitModal from './OutfitModal';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const Wardrobe = ({ items, onAdd, onUpdate, onDelete, customOutfits, createOutfit, updateOutfit, deleteOutfit, error }) => {
  const [filter, setFilter] = useState('');
  const [weatherFilter, setWeatherFilter] = useState('');
  const [isItemModal, setIsItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [multiSelect, setMultiSelect] = useState([]);

  const [isOutfitModal, setIsOutfitModal] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [outfitFilter, setOutfitFilter] = useState('');
  const [weatherOutfitFilter, setOutfitWeatherFilter] = useState('');

  const weatherOptions = ["Summer", "Winter", "Rainy", "All Year Around"];

  const filteredItems = items.filter(item =>
    // Filter by item name
    (item?.clothing_type.toLowerCase().includes(filter.toLowerCase()) ||
      // Filter by color
      item?.color?.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
      // Filter by item tag
      item?.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    ) &&
    // Filter by weather
    (weatherFilter === '' || weatherFilter === item.for_weather ||
      (weatherFilter === "Other" && !weatherOptions.includes(item.for_weather))
    )
  );

  const filteredOutfits = customOutfits.filter(outfit =>
    // Filter by outfit occasion
    (outfit?.occasion?.some(tag => tag.toLowerCase().includes(outfitFilter.toLowerCase())) ||
      // Filter by outfit tag
      outfit?.tags?.some(tag => tag.toLowerCase().includes(outfitFilter.toLowerCase()))
    ) &&
    // Filter by weather
    (weatherOutfitFilter === '' || weatherOutfitFilter === outfit.for_weather ||
      (weatherOutfitFilter === "Other" && !weatherOptions.includes(outfit.for_weather))
    )
  );
  
  const openItemModal = (item) => {
    setSelectedItem(item);
    setIsItemModal(true);
  };

  const openOutfitModal = (outfit) => {
    if (outfit) {
      setSelectedOutfit(outfit);
      setIsOutfitModal(true);
    }
    else if (multiSelect.length > 0) {setIsOutfitModal(true);}
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsItemModal(false);

    setSelectedOutfit(null);
    setIsOutfitModal(false);
  };

  const toggleSelection = (itemId) => {
    if (multiSelect.includes(itemId)) {
      setMultiSelect(multiSelect.filter(id => id !== itemId));
    } else {
      setMultiSelect([...multiSelect, itemId]);
    }
  };

  const deleteSelectedItems = () => {
    onDelete(multiSelect);
    unselectAll();
  };

  const selectAll = () => {
    setMultiSelect(filteredItems.map(item => item.item_id));
  }

  const unselectAll = () => {
    setMultiSelect([]);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    if (isItemModal || isOutfitModal) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isItemModal, isOutfitModal]);

  const listToStr = (list) => {
    if (list.length === 1) return list[0];
    return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
  };

  const history = useHistory(); // Initialize useHistory

  const navigateToOutfitSuggestions = () => {
    history.push('/outfits'); // Navigate to the /outfits page
    setTimeout(() => {
      document.querySelector('.big-glowing-button, .small-glowing-button').click(); // Click the suggest new outfits button
    }, 500); // Delay to ensure the page has loaded
  };

  return (
    <div className="wardrobe">
      <h2>Wardrobe</h2>
      <div className='on-top'>
        <button onClick={() => openItemModal(null)} className='add-button'>Add Item</button>
        <button onClick={() => openOutfitModal(null)} className='create-button'>Create Outfit</button>
        <button onClick={selectAll} className='select-button'>Select All</button>
        <button onClick={unselectAll} className='unselect-button'>Unselect All</button>
        
        {/* Filter */}
        <input 
          type="text" 
          placeholder="Filter by clothing type" 
          className="type-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select 
          value={weatherFilter} 
          onChange={(e) => setWeatherFilter(e.target.value)}
          className="weather-filter"
        >
          <option value="">Select weather filter</option>
          <option value="All Year Around">All Year Around</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Rainy">Rainy</option>
          <option value="Other">Other</option>
        </select>

        <button 
          onClick={deleteSelectedItems} 
          className='delete-button' 
          disabled={multiSelect.length == 0}
        >
          Delete Selected
        </button>
      </div>

      {filteredItems.length === 0 ? (
        filter || weatherFilter ? 
          <p>No items match your filter criteria.</p> :
          <>
            <p>No items in your wardrobe. Please add one!</p>
            <img 
              src="https://raw.githubusercontent.com/Anantesh-Mohapatra/LazYdrobe-Online/refs/heads/main/src/assets/emptydrobe.png" 
              alt="Empty Wardrobe" 
              style={{ width: '200px', height: '200px', cursor: 'pointer' }} 
              onClick={() => openItemModal(null)} 
            />
          </>
      ) : (
        <div className="wardrobe-container">
          {filteredItems.map(item => (
            <div>
              <WardrobeItem 
                item={item} 
                onClick={() => {openItemModal(item)}}
                isSelected={multiSelect.includes(item?.item_id)}
                toggleSelect={toggleSelection}
              />
            </div>
          ))}
        </div>
      )}

      <h2>Custom Outfits</h2>
      {customOutfits.length === 0 ? (
        <>
          <p>No custom outfits created.</p>
          <img 
            src="https://raw.githubusercontent.com/Anantesh-Mohapatra/LazYdrobe-Online/refs/heads/main/src/assets/emptyfit.png" 
            alt="Empty Outfits" 
            style={{ width: '200px', height: '200px', cursor: 'pointer' }} 
            onClick={navigateToOutfitSuggestions} 
          />
        </>
      ) : (
        <div>
          {/* Filter */}
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

          {filteredOutfits.length === 0 ? (
            outfitFilter || weatherOutfitFilter ? 
              <p>No outfits match your filter criteria.</p> :
              <>
                <img 
                  src="https://raw.githubusercontent.com/Anantesh-Mohapatra/LazYdrobe-Online/refs/heads/main/src/assets/emptydrobe.png" 
                  alt="Empty Wardrobe" 
                  style={{ width: '200px', height: '200px', cursor: 'pointer' }} 
                  onClick={() => openItemModal(null)} 
                />
              </>
          ) : (
            <div className="custom-outfits-container">
              {filteredOutfits.map((customOutfit, index) => (
                <div
                  key={index}
                  className="custom-outfit"
                  onClick={() => {
                    openOutfitModal(customOutfit);
                  }}
                >
                  <div className="outfit-info">
                    <p>
                      <strong>Occasion:</strong> {listToStr(customOutfit.occasion)}
                    </p>
                    <p>
                      <strong>Weather:</strong> {customOutfit.for_weather}
                    </p>
                  </div>
                  <div className="outfit-images">
                    {customOutfit.clothings.map((clothingId) => {
                      const wardrobeItem = items.find(
                        (item) => item.item_id === clothingId
                      );
                      return wardrobeItem ? (
                        <div key={clothingId} className="clothing-item">
                          <p>{wardrobeItem.clothing_type}</p>
                          <img
                            src={wardrobeItem.image_url}
                            alt={wardrobeItem.clothing_type}
                          />
                        </div>
                      ) : (
                        <p key={clothingId}>Wardrobe Missing Item</p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}


      {/* Wardrobe Modal */}
      <WardrobeItemModal
        isOpen={isItemModal}
        onRequestClose={closeModal}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        item={selectedItem}
        errorFromAbove={error}
      />

      <OutfitModal
        isOpen={isOutfitModal}
        onRequestClose={closeModal}
        unselectAll={unselectAll}

        onCreate={createOutfit}
        onUpdate={updateOutfit}
        onDelete={deleteOutfit}

        outfit={selectedOutfit}
        clothings={selectedOutfit?.clothings || multiSelect}
        wardrobeItems={items}
      />
    </div>
  );
};

// Default props to handle missing `items` prop
Wardrobe.defaultProps = {
  items: []
};

// Prop types for validation
Wardrobe.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    item_id: PropTypes.number.isRequired,
    clothing_type: PropTypes.string.isRequired,
    color: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    for_weather: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  onAdd: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Outfits: PropTypes.arrayOf(PropTypes.shape({
  occasion: PropTypes.string.isRequired,
  for_weather: PropTypes.string.isRequired,
  clothings: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
}));

export default Wardrobe;
