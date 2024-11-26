import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaMagic, FaArchive, FaArrowLeft, FaCheckSquare, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const PreviousOutfitControls = ({ selectAll, unselectAll, openConfirmationModal, multiSelect, outfits }) => {
  const history = useHistory(); // Initialize useHistory

  return (
    <div className="previous-outfits-controls">
      <button className="outfit-generation-button" onClick={() => history.push('/outfits')}>
        <FaArrowLeft />
        Outfit Generation
      </button>
      <div className="control-buttons">
        <button onClick={selectAll} disabled={multiSelect.length === outfits.length} className="select-button">
          <FaCheckSquare /> Select All
        </button>
        {multiSelect.length > 0 && (
          <>
            <button onClick={unselectAll} className="unselect-button">
              <FaTimes /> Unselect All
            </button>
            <button onClick={() => openConfirmationModal(false)} className="delete-button">
              <FaTrashAlt /> Delete Selected
            </button>
          </>
        )}
        <button onClick={() => openConfirmationModal(true)} className="delete-all-button">
          <FaTrashAlt /> Delete All
        </button>
      </div>
    </div>
  );
};

PreviousOutfitControls.propTypes = {
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  openConfirmationModal: PropTypes.func.isRequired,
  multiSelect: PropTypes.array.isRequired,
  outfits: PropTypes.array.isRequired,
};

export default PreviousOutfitControls;