import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onClose, message, isError }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2>{isError ? 'Error' : 'Success'}</h2>
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </Modal>
  );
};

export default SuccessModal;
