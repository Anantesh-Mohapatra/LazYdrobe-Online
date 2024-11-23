// src/components/PreviousOutfitsList.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styling/PreviousOutfitsList.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PreviousOutfitItem from './PreviousOutfitItem';
import PreviousOutfitsControls from './PreviousOutfitsControls';
import PreviousOutfitPreviews from './PreviousOutfitPreviews';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const PreviousOutfitsList = ({ outfits, setOutfitSuggestions, userId }) => {
  const history = useHistory(); // Initialize useHistory
  const [multiSelect, setMultiSelect] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);

  useEffect(() => {
    console.log('Outfits:', outfits);
  }, [outfits]);

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

  const handleNextOutfit = () => {
    setCurrentOutfitIndex((prevIndex) => (prevIndex + 1) % outfits.length);
  };

  const handlePrevOutfit = () => {
    setCurrentOutfitIndex((prevIndex) => (prevIndex - 1 + outfits.length) % outfits.length);
  };

  if (!outfits || outfits.length === 0) {
    return (
      <div className="previous-outfits-page">
        <p>No previous outfits found.</p>
      </div>
    );
  }

  return (
    <div className="previous-outfits-page">
      <div className="previous-outfits-header">
        <PreviousOutfitsControls
          selectAll={selectAll}
          unselectAll={unselectAll}
          openConfirmationModal={openConfirmationModal}
          multiSelect={multiSelect}
          outfits={outfits}
        />
      </div>
      <div className="outfit-carousel">
        <PreviousOutfitPreviews
          outfits={outfits}
          currentOutfitIndex={currentOutfitIndex}
          setCurrentOutfitIndex={setCurrentOutfitIndex}
        />
        <button onClick={handlePrevOutfit} className="carousel-button">{"<"}</button>
        <PreviousOutfitItem
          outfit={outfits[currentOutfitIndex]}
          isSelected={multiSelect.includes(outfits[currentOutfitIndex].suggestion_id)}
          onSelect={() => setMultiSelect([...multiSelect, outfits[currentOutfitIndex].suggestion_id])}
          onUnselect={() => setMultiSelect(multiSelect.filter(id => id !== outfits[currentOutfitIndex].suggestion_id))}
        />
        <button onClick={handleNextOutfit} className="carousel-button">{">"}</button>
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
