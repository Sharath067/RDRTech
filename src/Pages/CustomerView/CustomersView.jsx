import React, {useState, useEffect, useRef} from 'react';
import './CustomersView.css';
import Header from '../../components/Header/Header';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
// import { useAuth } from "../AuthContexts/AuthContext";

const CustomersView = () => {
  // const { token } = useAuth();
  const {id} = useParams();
  const [professional, setProfessional] = useState(null);
  const [gstDownloaded, setGstDownloaded] = useState(false);
  const [panDownloaded, setPanDownloaded] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);

  // Field selection states
  const [selectedField, setSelectedField] = useState('');
  const [isCustomField, setIsCustomField] = useState(false);
  const [fieldOptions, setFieldOptions] = useState([
    {value: '', label: 'Select a field'},
    {value: 'gstNumber', label: 'GST Number'},
    {value: 'panNumber', label: 'PAN Card Number'},
    {value: 'others', label: 'Others'},
  ]);

  // Error type states
  const [errorType, setErrorType] = useState('');
  const [isCustomErrorType, setIsCustomErrorType] = useState(false);
  const [errorTypeOptions, setErrorTypeOptions] = useState([
    {value: '', label: 'Please select the reason for rejection'},
    {
      value: 'Information provided does not match with the uploaded documents',
      label: 'Information provided does not match with the uploaded documents',
    },
    {
      value:
        'Required documentation is incomplete or essential information is missing',
      label:
        'Required documentation is incomplete or essential information is missing',
    },
    {
      value:
        'Provided details are invalid, do not meet our verification standards',
      label:
        'Provided details are invalid, do not meet our verification standards',
    },
    {value: 'others', label: 'Others'},
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  const fieldInputRef = useRef(null);
  const errorTypeInputRef = useRef(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `http://100.24.7.142:8080/admin/professional/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setProfessional(response.data);
          console.log('Response of the Customer view : ', response.data);
        } catch (error) {
          console.error('Error fetching professional data:', error);
        }
      }
    };
    fetchProfessionalData();
  }, [id, token]);

  // Focus input field when switching to custom input mode
  useEffect(() => {
    if (isCustomField && fieldInputRef.current) {
      fieldInputRef.current.focus();
    }
  }, [isCustomField]);

  useEffect(() => {
    if (isCustomErrorType && errorTypeInputRef.current) {
      errorTypeInputRef.current.focus();
    }
  }, [isCustomErrorType]);

  const handleApprove = async () => {
    if (token) {
      try {
        const res = await axios.post(
          `http://100.24.7.142:8080/admin/active/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Response when clicking the Approve button : ', res);
        setProfessional({...professional, accountStatus: 'Approved'});
      } catch (error) {
        console.error('Error approving professional:', error);
      }
    }
  };

  const handleFieldChange = e => {
    const value = e.target.value;
    setSelectedField(value);

    if (value === 'others') {
      setIsCustomField(true);
      setSelectedField(''); // Clear the field to accept custom input
    } else {
      setIsCustomField(false);
    }
  };

  const handleErrorTypeChange = e => {
    const value = e.target.value;
    setErrorType(value);

    if (value === 'others') {
      setIsCustomErrorType(true);
      setErrorType(''); // Clear the field to accept custom input
    } else {
      setIsCustomErrorType(false);
    }
  };

  const handleReject = async () => {
    // Validate inputs
    if (!selectedField || selectedField.trim() === '') {
      setErrorMessage('Please specify the field for rejection.');
      return;
    }

    if (!errorType || errorType.trim() === '') {
      setErrorMessage('Please specify the reason for rejection.');
      return;
    }

    setErrorMessage('');

    if (token) {
      try {
        console.log('Token being used:', token);

        const res = await axios.post(
          'http://100.24.7.142:8080/admin/decline/professional',
          {
            professionalId: id,
            declinedFieldDTOs: [
              {
                fieldName: selectedField,
                reason: errorType,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('Reject response:', res);

        if (res.status === 200) {
          console.log('Reject operation was successful.');
          setProfessional({...professional, accountStatus: 'Rejected'});
          setShowRejectPopup(false);
        } else {
          console.error('Unexpected response status:', res.status);
        }
      } catch (error) {
        console.error(
          'Error rejecting professional:',
          error.response?.data || error.message,
        );
      }
    } else {
      console.error('No token available. User might be logged out.');
    }
  };

  const handleClosePopup = () => {
    setErrorType('');
    setSelectedField('');
    setIsCustomField(false);
    setIsCustomErrorType(false);
    setErrorMessage('');
    setShowRejectPopup(false);
  };

  const handleGstDownload = () => {
    setGstDownloaded(true);
  };

  const handlePanDownload = () => {
    setPanDownloaded(true);
  };

  if (!professional) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="view-customer-details-main">
        <div className="view-customer-sub-section">
          <span>
            <i
              className="fa fa-arrow-left fa-1x arrLeft-1"
              aria-hidden="true"
              onClick={() => navigate(-1)}></i>
          </span>
          <div className="profile-company-section">
            <section className="profile-section-main">
              <h3 className="profile-heading">My Profile</h3>
              <div className="profile-section">
                <div className="myprofile-section">
                  <img
                    src={
                      professional?.imageS3SignedURL ||
                      require('../../Assets/Images/logo.jpg')
                    }
                    alt="Profile"
                  />
                </div>
                <div className="profile-details">
                  <label>
                    Name: <strong>{professional?.name}</strong>
                  </label>{' '}
                  <br />
                  <label>
                    Phone Number: <strong>{professional?.phoneNumber}</strong>
                  </label>{' '}
                  <br />
                  <label>
                    Email: <strong>{professional?.professionalEmail}</strong>
                  </label>
                </div>
              </div>
            </section>
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">
                Company Details
              </h4>
              <div className="company-details-section-1">
                <div>
                  <label className="labels-for-details">Company</label> <br />
                  <label>{professional?.companyName}</label>
                </div>
                <div>
                  <label className="labels-for-details">GST Number</label>{' '}
                  <br />
                  <label>{professional?.gstNumber || 'N/A'}</label>
                </div>
                <div>
                  <label className="labels-for-details">PAN Card</label> <br />
                  <label>{professional?.panNumber || 'N/A'}</label>
                </div>
              </div>
            </section>
          </div>

          <div className="address-gst-section">
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">Address</h4>
              <div className="company-details-section-1">
                <div>
                  <label className="labels-for-details">Address</label> <br />
                  <label>{professional?.address}</label>
                </div>
                <div>
                  <label className="labels-for-details">City</label> <br />
                  <label>{professional?.city}</label>
                </div>
                <div>
                  <label className="labels-for-details">Country</label> <br />
                  <label>{professional?.country}</label>
                </div>
                <div>
                  <label className="labels-for-details">Pincode</label> <br />
                  <label>{professional?.pinCode}</label>
                </div>
              </div>
            </section>
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">
                GST / PAN card Documents
              </h4>
              <div className="company-details-section-1">
                <div>
                  <p>GST form</p>
                  {!gstDownloaded ? (
                    <a
                      href={professional.gstFormS3SignedURL}
                      onClick={handleGstDownload}>
                      <i className="fa fa-file-pdf-o fa-5x"></i>
                    </a>
                  ) : (
                    <p>
                      Downloaded
                      <i className="fa fa-ban fa-5x" aria-hidden="true"></i>
                    </p>
                  )}
                </div>
                <div>
                  <p>Pan card</p>
                  {!panDownloaded ? (
                    <a
                      href={professional.panCardS3SignedURL}
                      onClick={handlePanDownload}>
                      <i className="fa fa-file-pdf-o fa-5x"></i>
                    </a>
                  ) : (
                    <p>
                      Downloaded
                      <i className="fa fa-ban fa-5x" aria-hidden="true"></i>
                    </p>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="documents-section">
            <section className="company-details-section-main-buttons">
              {professional.accountStatus === 'Pending' && (
                <div className="approve-button-section">
                  <button
                    className="reject-button"
                    onClick={() => setShowRejectPopup(true)}>
                    Reject
                  </button>
                  <button className="approve-button" onClick={handleApprove}>
                    Approve
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
        {showRejectPopup && (
          <div className="reject-popup">
            <div className="reject-popup-content">
              <div className="reject-popup-header">
                <div>
                  <h4>Reject Professional</h4>
                </div>
                <div>
                  <button className="close-button" onClick={handleClosePopup}>
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="reject-popup-fields">
                <label>Select Field:</label>
                <div className="combobox-container">
                  {!isCustomField ? (
                    <select
                      value={
                        selectedField === '' && isCustomField
                          ? 'others'
                          : selectedField
                      }
                      onChange={handleFieldChange}
                      className="combobox-select">
                      {fieldOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="custom-input-container">
                      <input
                        ref={fieldInputRef}
                        type="text"
                        value={selectedField}
                        onChange={e => setSelectedField(e.target.value)}
                        placeholder="Specify field"
                        className="combobox-input"
                      />
                      <button
                        className="back-to-select-btn"
                        onClick={() => {
                          setIsCustomField(false);
                          setSelectedField('');
                        }}>
                        <i className="fa fa-chevron-left"></i>
                      </button>
                    </div>
                  )}
                </div>

                <label>Select Error Type:</label>
                <div className="combobox-container">
                  {!isCustomErrorType ? (
                    <select
                      value={
                        errorType === '' && isCustomErrorType
                          ? 'others'
                          : errorType
                      }
                      onChange={handleErrorTypeChange}
                      className="combobox-select">
                      {errorTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="custom-input-container">
                      <input
                        ref={errorTypeInputRef}
                        type="text"
                        value={errorType}
                        onChange={e => setErrorType(e.target.value)}
                        placeholder="Specify reason for rejection"
                        className="combobox-input"
                      />
                      <button
                        className="back-to-select-btn"
                        onClick={() => {
                          setIsCustomErrorType(false);
                          setErrorType('');
                        }}>
                        <i className="fa fa-chevron-left"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="reject-popup-buttons">
                <button className="cancelButton" onClick={handleClosePopup}>
                  Cancel
                </button>
                <button onClick={handleReject}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomersView;
