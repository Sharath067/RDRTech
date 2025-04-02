import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { useAuth } from "../AuthContexts/AuthContext";
import {toast, ToastContainer} from 'react-toastify';
import couponService from './coupon.service';
import './Couponstable.css';

const CouponList = () => {
  // const { token } = useAuth();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [couponData, setCouponData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchCoupons = async () => {
      if (token) {
        try {
          const response = await axios.get(
            'https://rdrtech-api.atparui.com/coupon/admin/getAllCoupons',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setCouponData(response.data);
          couponService.updateCoupons(response.data);
          console.log('Get all the user coupons: ', response.data);
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchCoupons();
  }, [token]);

  useEffect(() => {
    const subscription = couponService.getCoupons().subscribe(setCouponData);
    return () => subscription.unsubscribe();
  }, []);

  const filterData = couponData.filter(item => {
    return (
      (item.description &&
        item.description.toLowerCase().includes(searchItem.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(searchItem.toLowerCase()))
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEditClick = coupon => {
    setEditingCoupon({...coupon});
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCoupon(null);
    setErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!editingCoupon?.code) errors.code = 'Coupon code is required.';
    if (!editingCoupon?.description)
      errors.description = 'Description is required.';
    if (!editingCoupon?.rupees || isNaN(editingCoupon.rupees))
      errors.rupees = 'Rupees must be a valid number.';
    if (!editingCoupon?.expireDate)
      errors.expireDate = 'Expire date is required.';
    if (editingCoupon?.isActive === undefined)
      errors.isActive = 'Account status is required.';
    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        'https://rdrtech-api.atparui.com/coupon/save',
        editingCoupon,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setCouponData(prevData =>
        prevData.map(coupon =>
          coupon.id === response.data.id ? response.data : coupon,
        ),
      );
      toast.success('Coupon updated successfully!');
      handleModalClose();
    } catch (err) {
      toast.error('Failed to update coupon: ' + err.message);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}>
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="coupon-list-container">
        <ToastContainer />
        <section className="coupon-list">
          {currentItems.map(coupon => (
            <div key={coupon.id} className="coupon-card">
              <div className="coupon-content">
                <div className="coupon-details">
                  <h2 className="coupon-discount">{coupon.description}</h2>
                  <p className="coupon-description">
                    <span className="label-bold">&#8377; {coupon.rupees}</span>
                  </p>
                  <span className="coupon-code">Code: {coupon.code}</span>
                </div>
                <div className="coupon-expiry">
                  <p>
                    <span className="label-bold">Expires on:</span>{' '}
                    {coupon.expireDate}
                  </p>
                  <p>
                    <span className="label-bold">Status:</span>{' '}
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
              <div className="coupon-actions">
                <i
                  className="fa fa-pencil-square-o"
                  aria-hidden="true"
                  onClick={() => handleEditClick(coupon)}></i>
                <div className="tooltip">Edit Coupon</div>
              </div>
            </div>
          ))}
        </section>

        <div className="pagination-section">
          <div className="pagination-pagecount">
            <span>
              Showing page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="prev-next">
              &lt; <span>Previous</span>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="prev-next">
              <span>Next</span> &gt;
            </button>
          </div>
        </div>

        {/* Modal Implementation */}
        {isModalOpen && (
          <>
            <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`}></div>
            <div
              className={`modal fade ${isModalOpen ? 'show' : ''}`}
              style={{display: isModalOpen ? 'block' : 'none'}}
              tabIndex="-1">
              <div className="modal-dialog w-25 modal-dialog-centered">
                <div className="modal-content">
                  <div
                    className="modal-header text-white"
                    style={{backgroundColor: '#00C851', position: 'relative'}}>
                    <h4 className="modal-title">Edit Coupon</h4>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleModalClose}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '2.0rem',
                        color: '#fff',
                        cursor: 'pointer',
                      }}>
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      {/* Form fields */}
                      <div className="mb-2">
                        <label className="form-label">Code :</label>
                        <input
                          type="text"
                          name="code"
                          placeholder="Enter code"
                          value={editingCoupon?.code || ''}
                          onChange={e =>
                            setEditingCoupon({
                              ...editingCoupon,
                              code: e.target.value,
                            })
                          }
                          required
                          className="form-control"
                        />
                        {errors.code && (
                          <small className="text-danger">{errors.code}</small>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Description :</label>
                        <input
                          type="text"
                          name="description"
                          placeholder="Enter description"
                          value={editingCoupon?.description || ''}
                          onChange={e =>
                            setEditingCoupon({
                              ...editingCoupon,
                              description: e.target.value,
                            })
                          }
                          required
                          className="form-control"
                        />
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Rupees :</label>
                        <input
                          type="number"
                          name="rupees"
                          placeholder="Enter rupees"
                          value={editingCoupon?.rupees || ''}
                          onChange={e =>
                            setEditingCoupon({
                              ...editingCoupon,
                              rupees: e.target.value,
                            })
                          }
                          required
                          className="form-control"
                        />
                        {errors.rupees && (
                          <small className="text-danger">{errors.rupees}</small>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Expire Date :</label>
                        <input
                          type="date"
                          name="expireDate"
                          value={editingCoupon?.expireDate || ''}
                          onChange={e =>
                            setEditingCoupon({
                              ...editingCoupon,
                              expireDate: e.target.value,
                            })
                          }
                          required
                          className="form-control"
                        />
                        {errors.expireDate && (
                          <small className="text-danger">
                            {errors.expireDate}
                          </small>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label"> Coupon status :</label>
                        <div className="custom-select-wrapper">
                          <select
                            name="isActive"
                            value={
                              editingCoupon?.isActive !== undefined
                                ? editingCoupon.isActive
                                : ''
                            }
                            onChange={e =>
                              setEditingCoupon({
                                ...editingCoupon,
                                isActive: e.target.value === 'true',
                              })
                            }
                            required
                            className="form-control custom-select">
                            <option value="" disabled>
                              Select status
                            </option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>

                          {errors.isActive && (
                            <small className="text-danger">
                              {errors.isActive}
                            </small>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success w-25"
                        style={{
                          height: '40px',
                          marginLeft: '35%',
                          backgroundColor: '#00C851',
                          fontWeight: 'bold',
                          border: '1px solid #00C851',
                        }}>
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CouponList;
