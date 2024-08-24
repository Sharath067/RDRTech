import React, { useState } from 'react';
import './ForgotPass.css'; 
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2>Success</h2>
      <p>Password reset email sent successfully!</p>
      <button onClick={onClose}>OK</button>
    </Modal>
  );
};

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Uncomment the following line and ensure the endpoint is correct
      // const res = await axios.post('http://localhost:8080/api/forgot-password', { email });
      setModalIsOpen(true); 
    } catch (err) {
      console.error(err);
      console.error('Failed to send password reset email');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEmail(''); 
  };

  return (
    <div className="forgot-container">
      <header className="back-arrow">
        <i
          className="fa fa-arrow-left fa-1x"
          aria-hidden="true"
          onClick={() => navigate(-1)} 
        ></i>
      </header>
      <div className="custom-forgot-password-container">
        <form className="custom-forgot-password-form" onSubmit={handleResetPassword}>
          <h2 className="custom-forgot-password-title">Reset Password</h2>
          <h6>Enter your email address to reset your password</h6>
          <div className="custom-forgot-password-group">
            <input
              type="email"
              className="custom-forgot-password-input"
              placeholder="Please enter the E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="custom-forgot-password-button">Reset Password</button>
        </form>
      </div>
      <SuccessModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};

export default ForgotPass;
