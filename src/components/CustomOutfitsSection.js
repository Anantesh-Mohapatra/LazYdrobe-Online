import React from 'react';
import OutfitModal from './OutfitModal';
import { useHistory } from 'react-router-dom';
import './styling/Wardrobe.css';

const CustomOutfitsSection = ({
  customOutfits, items, outfitFilter, setOutfitFilter, weatherOutfitFilter, 
  setOutfitWeatherFilter, openOutfitModal, isOutfitModal, closeModal, 
  createOutfit, updateOutfit, deleteOutfit, selectedOutfit, multiSelect, unselectAll
}) => {
  const weatherOptions = ["Summer", "Winter", "Rainy", "All Year Around"];
  const history = useHistory();

  const filteredOutfits = customOutfits.filter(outfit =>
    (outfit?.occasion?.some(tag => tag.toLowerCase().includes(outfitFilter.toLowerCase())) ||
      outfit?.tags?.some(tag => tag.toLowerCase().includes(outfitFilter.toLowerCase()))
    ) &&
    (weatherOutfitFilter === '' || weatherOutfitFilter === outfit.for_weather ||
      (weatherOutfitFilter === "Other" && !weatherOptions.includes(outfit.for_weather))
    )
  );

  const navigateToOutfitSuggestions = () => {
    history.push('/outfits');
    setTimeout(() => {
      document.querySelector('.big-glowing-button, .small-glowing-button').click();
    }, 500);
  };

  const listToStr = (list) => {
    if (list.length === 1) return list[0];
    return `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}`;
  };

  return (
    <div>
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
          <input 
            type="text" 
            placeholder="Filter by outfit occasion" 
            className="type-filter" // Use the same CSS class
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

export default CustomOutfitsSection;
