import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WardrobeSection from './wardrobe/WardrobeSection';
// import CustomOutfitsSection from './wardrobe/CustomOutfitsSection'; // Custom Outfits is currently disabled, please un-comment to reenable
import { useHistory } from 'react-router-dom';
import '../App.css';
import './wardrobe/Wardrobe.css';

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
    setMultiSelect(items.map(item => item.item_id));
  }

  const unselectAll = () => {
    setMultiSelect([]);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isItemModal || isOutfitModal) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isItemModal, isOutfitModal]);

  return (
    <div className="wardrobe">
      <WardrobeSection
        items={items}
        filter={filter}
        setFilter={setFilter}
        weatherFilter={weatherFilter}
        setWeatherFilter={setWeatherFilter}
        openItemModal={openItemModal}
        deleteSelectedItems={deleteSelectedItems}
        multiSelect={multiSelect}
        toggleSelection={toggleSelection}
        selectAll={selectAll}
        unselectAll={unselectAll}
        isItemModal={isItemModal}
        closeModal={closeModal}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        selectedItem={selectedItem}
        error={error}
        openOutfitModal={openOutfitModal}
      />
      {/* <CustomOutfitsSection // Uncomment to re-enable Custom Outfits
        customOutfits={customOutfits}
        items={items}
        outfitFilter={outfitFilter}
        setOutfitFilter={setOutfitFilter}
        weatherOutfitFilter={weatherOutfitFilter}
        setOutfitWeatherFilter={setOutfitWeatherFilter}
        openOutfitModal={openOutfitModal}
        isOutfitModal={isOutfitModal}
        closeModal={closeModal}
        createOutfit={createOutfit}
        updateOutfit={updateOutfit}
        deleteOutfit={deleteOutfit}
        selectedOutfit={selectedOutfit}
        multiSelect={multiSelect}
        unselectAll={unselectAll}
      /> */}
    </div>
  );
};

Wardrobe.defaultProps = {
  items: []
};

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
  customOutfits: PropTypes.arrayOf(PropTypes.shape({
    occasion: PropTypes.string.isRequired,
    for_weather: PropTypes.string.isRequired,
    clothings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  })).isRequired,
  createOutfit: PropTypes.func.isRequired,
  updateOutfit: PropTypes.func.isRequired,
  deleteOutfit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Wardrobe;
