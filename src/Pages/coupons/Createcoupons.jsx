import React, {useState} from 'react';
import './Createcoupons.css';
import {useAuth} from '../AuthContexts/AuthContext';
import Header from '../../components/Header/Header';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createCoupon} from '../apiServices/apiServices';

const Createcoupons = () => {
  const {token} = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discount: '',
    valid: '',
    isActive: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const validate = () => {
    const newErrors = {};
    if (!formData.code) newErrors.code = 'Code is required';
    if (!formData.description)
      newErrors.description = 'Description is required';
    if (!formData.discount) newErrors.discount = 'Discount amount is required';
    else if (isNaN(formData.discount))
      newErrors.discount = 'Valid discount amount is required';
    if (!formData.valid) newErrors.valid = 'Valid date is required';
    return newErrors;
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleToggleActive = () => {
    setFormData({
      ...formData,
      isActive: !formData.isActive,
    });
  };

  const handleBlur = e => {
    const fieldErrors = validate();
    setErrors({
      ...errors,
      ...fieldErrors,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Format the data according to the API requirements
      const postData = {
        id: 0,
        code: formData.code,
        discount: parseFloat(formData.discount),
        valid: formData.valid,
        isActive: formData.isActive,
      };

      setLoading(true);

      try {
        const result = await createCoupon(postData, token);
        toast.success('Coupon created successfully!');
        console.log('Success:', result);

        // Reset form after successful creation
        setFormData({
          code: '',
          description: '',
          discount: '',
          valid: '',
          isActive: true,
        });

        // Close modal or redirect
        setTimeout(() => {
          navigate('/coupons'); // Adjust this path to your coupons list page
        }, 2000);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to create coupon!');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <ToastContainer />
      <Header />
      {isModalOpen && (
        <div className="create-sub-container">
          <div className="back-arrow-container">
            <button onClick={() => navigate(-1)}>
              <i className="fa fa-arrow-left fa-1x" aria-hidden="true"></i>
            </button>
          </div>
          <div className="create-plan-container">
            <h1>Create Coupon</h1>
            <form className="create-plan-form" onSubmit={handleSubmit}>
              <label>
                Code
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter code"
                  onBlur={handleBlur}
                />
                {errors.code && (
                  <small className="text-danger">{errors.code}</small>
                )}
              </label>
              <label>
                Description
                <input
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && (
                  <small className="text-danger">{errors.description}</small>
                )}
              </label>
              <label>
                Discount (%)
                <input
                  type="text"
                  name="discount"
                  placeholder="Enter Discount"
                  value={formData.discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.discount && (
                  <small className="text-danger">{errors.discount}</small>
                )}
              </label>
              <label>
                Valid Until
                <input
                  type="date"
                  name="valid"
                  value={formData.valid}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.valid && (
                  <small className="text-danger">{errors.valid}</small>
                )}
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleToggleActive}
                />
                Active Coupon
              </label>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}>
                  {loading ? 'Creating...' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Createcoupons;
