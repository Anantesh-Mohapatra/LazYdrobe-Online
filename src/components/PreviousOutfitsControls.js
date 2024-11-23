import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const PreviousOutfitsControls = ({ selectAll, unselectAll, openConfirmationModal, multiSelect, outfits }) => {
  const history = useHistory(); // Initialize useHistory

  return (
    <div className="previous-outfits-controls">
      <button className="outfit-generation-button" onClick={() => history.push('/outfits')}>
        <FaArrowLeft />
        Outfit Generation
      </button>
      <div className="control-buttons">
        <button onClick={selectAll} disabled={multiSelect.length === outfits.length} className="select-button">Select All</button>
        {multiSelect.length > 0 && (
          <>
            <button onClick={unselectAll} className="unselect-button">Unselect All</button>
            <button onClick={() => openConfirmationModal(false)} className="delete-button">Delete Selected</button>
          </>
        )}
        <button onClick={() => openConfirmationModal(true)} className="delete-all-button">Delete All</button>
      </div>
    </div>
  );
};

PreviousOutfitsControls.propTypes = {
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  openConfirmationModal: PropTypes.func.isRequired,
  multiSelect: PropTypes.array.isRequired,
  outfits: PropTypes.array.isRequired,
};

export default PreviousOutfitsControls;