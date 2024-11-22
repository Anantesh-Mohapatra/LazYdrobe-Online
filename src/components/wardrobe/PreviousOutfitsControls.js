import React from 'react';
import PropTypes from 'prop-types';

const PreviousOutfitsControls = ({
  selectAll,
  unselectAll,
  openConfirmationModal,
  multiSelect
}) => {
  const isDisabled = multiSelect.length === 0;

  return (
    <div className='previous-outfits-controls'>
      <button onClick={selectAll} className='select-button'>Select All</button>
      {!isDisabled && (
        <>
          <button onClick={unselectAll} className='unselect-button'>Unselect All</button>
        </>
      )}
      <button onClick={() => openConfirmationModal(true)} className='delete-all-button'>Delete All</button>
    </div>
  );
};

PreviousOutfitsControls.propTypes = {
  selectAll: PropTypes.func.isRequired,
  unselectAll: PropTypes.func.isRequired,
  openConfirmationModal: PropTypes.func.isRequired,
  multiSelect: PropTypes.array.isRequired,
};

export default PreviousOutfitsControls;