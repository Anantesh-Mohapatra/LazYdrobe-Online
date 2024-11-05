// ECommerceModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ECommerceModal = ({ isOpen, onRequestClose, onSubmit, item = {} }) => {
  const [name, setName] = useState(item.name || '');
  const [category, setCategory] = useState(item.category || '');
  const [image, setImage] = useState(item.image || '');
  const [url, setURL] = useState(item.url || '');

  const handleSubmit = () => {
    if (name && category) {
      onSubmit({ ...item, name, category, image, url});
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="ECommerce Item Modal">
      <h2>{item.id ? 'Edit' : 'Add'} ECommerce Item</h2>
      <form>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Product URL" value={url} onChange={(e) => setURL(e.target.value)} />
        <button type="button" onClick={handleSubmit}>Save</button>
      </form>
    </Modal>
  );
};

export default ECommerceModal;
