import React from 'react';
import WardrobeItem from './WardrobeItem';
import WardrobeItemModal from './WardrobeItemModal';
import '../styling/Wardrobe.css';
import WardrobeControls from './WardrobeControls'; // Ensure this import is present

const WardrobeSection = ({
  items, filter, setFilter, weatherFilter, setWeatherFilter, 
  openItemModal, deleteSelectedItems, multiSelect, toggleSelection, 
  selectAll, unselectAll, isItemModal, closeModal, onAdd, onUpdate, onDelete, 
  selectedItem, error, openOutfitModal // Add this line
}) => {
  const weatherOptions = ["Summer", "Winter", "Rainy", "All Year Around"];

  const filteredItems = items.filter(item =>
    (item?.clothing_type.toLowerCase().includes(filter.toLowerCase()) ||
      item?.color?.some(tag => tag.toLowerCase().includes(filter.toLowerCase())) ||
      item?.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    ) &&
    (weatherFilter === '' || weatherFilter === item.for_weather ||
      (weatherFilter === "Other" && !weatherOptions.includes(item.for_weather))
    )
  );

  return (
    <div>
      <h2>Wardrobe</h2>
      <WardrobeControls
        openItemModal={openItemModal}
        openOutfitModal={openOutfitModal} // Add this line
        selectAll={selectAll}
        unselectAll={unselectAll}
        filter={filter}
        setFilter={setFilter}
        weatherFilter={weatherFilter}
        setWeatherFilter={setWeatherFilter}
        deleteSelectedItems={deleteSelectedItems}
        multiSelect={multiSelect}
      />
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
      <WardrobeItemModal
        isOpen={isItemModal}
        onRequestClose={closeModal}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        item={selectedItem}
        errorFromAbove={error}
      />
    </div>
  );
};

export default WardrobeSection;