// src/components/PreviousOutfitsList.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styling/PreviousOutfitsList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PreviousOutfitItem from './PreviousOutfitItem';
import PreviousOutfitsControls from './wardrobe/PreviousOutfitsControls';

const PreviousOutfitsList = ({ outfits, setOutfitSuggestions, userId }) => {
  const [multiSelect, setMultiSelect] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  const openConfirmationModal = (deleteAll = false) => {
    setDeleteAll(deleteAll);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    closeConfirmationModal();
    try {
      if (deleteAll) {
        await axios.delete(`/outfits/suggestions/all`, { params: { user_id: userId } });
        setOutfitSuggestions([]);
        toast.success("All outfit suggestions deleted successfully.");
      }
      setMultiSelect([]);
    } catch (err) {
      console.error("Failed to delete outfit suggestions:", err);
      toast.error("Failed to delete outfit suggestions.");
    }
  };

  const selectAll = () => {
    setMultiSelect(outfits.map(outfit => outfit.suggestion_id));
  };

  const unselectAll = () => {
    setMultiSelect([]);
  };

  if (!outfits || outfits.length === 0) {
    return (
      <div className="previous-outfits-page">
        <h2>Previous Outfit Recommendations</h2>
        <p>No previous outfits found.</p>
      </div>
    );
  }

  return (
    <div className="previous-outfits-page">
      <div className="previous-outfits-header">
        <h2>Previous Outfit Recommendations</h2>
        <PreviousOutfitsControls
          selectAll={selectAll}
          unselectAll={unselectAll}
          openConfirmationModal={openConfirmationModal}
          multiSelect={multiSelect}
        />
      </div>
      <div className="outfit-list">
        {outfits.map((outfit) => (
          <PreviousOutfitItem
            key={outfit.suggestion_id}
            outfit={outfit}
            isSelected={multiSelect.includes(outfit.suggestion_id)}
            onSelect={() => setMultiSelect([...multiSelect, outfit.suggestion_id])}
            onUnselect={() => setMultiSelect(multiSelect.filter(id => id !== outfit.suggestion_id))}
          />
        ))}
      </div>
      {isModalOpen && (
        <div className="previous-outfits-modal-overlay">
          <div className="previous-outfits-modal-content">
            <p className="modal-message">
              Are you sure you want to delete {deleteAll ? 'all' : 'selected'} outfit suggestions? This action cannot be undone.
            </p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="confirm-button">
                Yes
              </button>
              <button onClick={closeConfirmationModal} className="cancel-button">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PreviousOutfitsList.propTypes = {
  outfits: PropTypes.array.isRequired,
  setOutfitSuggestions: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default PreviousOutfitsList;
