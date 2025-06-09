// import {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import couponService from './coupon.service';
// import {NavLink} from 'react-router-dom';
// import './Addcoupon.css';
// import {createCoupon, getAllCoupons} from '../apiServices/apiServices';

// const AddCoupon = ({onAddCoupon}) => {
//   const [formData, setFormData] = useState({
//     code: '',
//     discount: '',
//     valid: '',
//     isActive: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const token = localStorage.getItem('jwtToken');

//   const validateField = (name, value) => {
//     switch (name) {
//       case 'code':
//         return value ? '' : 'Code is required';
//       case 'discount':
//         return value ? '' : 'Discount is required';
//       case 'valid':
//         return value ? '' : 'Valid until date is required';
//       case 'isActive':
//         return value !== '' ? '' : 'Coupon status is required';
//       default:
//         return '';
//     }
//   };

//   const handleBlur = e => {
//     const {name, value} = e.target;
//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: validateField(name, value),
//     }));
//   };

//   const handleChange = e => {
//     const {name, value} = e.target;
//     let formattedValue = value;

//     // Special handling for isActive to convert string to boolean
//     if (name === 'isActive') {
//       formattedValue = value === 'true';
//     }

//     setFormData(prevData => ({
//       ...prevData,
//       [name]: formattedValue,
//     }));

//     setErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: validateField(name, value),
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = Object.keys(formData).reduce((acc, key) => {
//       acc[key] = validateField(key, formData[key]);
//       return acc;
//     }, {});

//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const fetchCoupons = async () => {
//     try {
//       const couponsData = await getAllCoupons();
//       couponService.updateCoupons(couponsData);
//     } catch (error) {
//       console.error('Error fetching coupons:', error);
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     console.log('Form submitted with data:', formData);

//     if (validateForm()) {
//       const couponData = {
//         id: 0,
//         code: formData.code || `COUPON-${Math.floor(Math.random() * 10000)}`,
//         discount: Number(formData.discount),
//         valid: formData.valid,
//         isActive: formData.isActive === '' ? true : formData.isActive,
//       };

//       try {
//         console.log('Sending coupon data:', couponData);
//         const responseData = await createCoupon(couponData);
//         console.log('Submitted Coupon Data:', responseData);

//         if (onAddCoupon) {
//           onAddCoupon(responseData);
//         }

//         await fetchCoupons();

//         resetForm();
//         toast.success('Coupon added successfully!');
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error('Error creating coupon:', error);
//         toast.error('Error creating coupon!');
//       }
//     } else {
//       console.log('Form validation failed');
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       code: '',
//       discount: '',
//       valid: '',
//       isActive: '',
//     });
//     setErrors({});
//   };

//   const handleCloseModal = () => {
//     resetForm();
//     setIsModalOpen(false);
//   };

//   // Generate today's date in YYYY-MM-DD format for the date picker
//   const today = new Date().toISOString().split('T')[0];

//   return (
//     <div className="container">
//       <NavLink
//         to="#"
//         className="btn btn-success navlink-custom"
//         style={{backgroundColor: '#00C851', border: '1px solid #00C851'}}
//         onClick={() => setIsModalOpen(true)}>
//         <span className="icon-plus">+</span>add new
//       </NavLink>

//       {isModalOpen && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div
//             className="modal fade show"
//             style={{display: 'block'}}
//             tabIndex="-1">
//             <div className="modal-dialog w-25 modal-dialog-centered">
//               <div className="modal-content">
//                 <div
//                   className="modal-header text-white"
//                   style={{backgroundColor: '#00C851', position: 'relative'}}>
//                   <h4 className="modal-title">Create Coupon</h4>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     aria-label="Close"
//                     onClick={handleCloseModal}
//                     style={{
//                       position: 'absolute',
//                       right: '10px',
//                       top: '10px',
//                       background: 'none',
//                       border: 'none',
//                       fontSize: '2.0rem',
//                       color: 'white',
//                       cursor: 'pointer',
//                     }}>
//                     &times;
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-2">
//                       <label className="form-label">Code (Optional):</label>
//                       <input
//                         type="text"
//                         name="code"
//                         placeholder="Enter coupon code or leave blank for auto-generation"
//                         value={formData.code}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className={`form-control ${
//                           errors.code ? 'is-invalid' : ''
//                         }`}
//                       />
//                       {errors.code && (
//                         <div className="invalid-feedback">{errors.code}</div>
//                       )}
//                     </div>
//                     <div className="mb-2">
//                       <label className="form-label">Discount (%):</label>
//                       <input
//                         type="number"
//                         name="discount"
//                         placeholder="Enter discount percentage"
//                         value={formData.discount}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className={`form-control ${
//                           errors.discount ? 'is-invalid' : ''
//                         }`}
//                       />
//                       {errors.discount && (
//                         <div className="invalid-feedback">
//                           {errors.discount}
//                         </div>
//                       )}
//                     </div>
//                     <div className="mb-2">
//                       <label className="form-label">Valid Until:</label>
//                       <input
//                         type="date"
//                         name="valid"
//                         value={formData.valid}
//                         min={today}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className={`form-control ${
//                           errors.valid ? 'is-invalid' : ''
//                         }`}
//                       />
//                       {errors.valid && (
//                         <div className="invalid-feedback">{errors.valid}</div>
//                       )}
//                     </div>
//                     <div className="mb-2">
//                       <label className="form-label">Coupon Status:</label>
//                       <div className="custom-select-wrapper">
//                         <select
//                           name="isActive"
//                           value={
//                             formData.isActive === true
//                               ? 'true'
//                               : formData.isActive === false
//                               ? 'false'
//                               : ''
//                           }
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           className={`form-control ${
//                             errors.isActive ? 'is-invalid' : ''
//                           }`}>
//                           <option value="">Select status</option>
//                           <option value="true">ACTIVE</option>
//                           <option value="false">INACTIVE</option>
//                         </select>
//                         {errors.isActive && (
//                           <div className="invalid-feedback">
//                             {errors.isActive}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       className="btn btn-success w-25"
//                       style={{
//                         height: '40px',
//                         marginLeft: '35%',
//                         backgroundColor: '#00C851',
//                         fontWeight: 'bold',
//                         border: '1px solid #00C851',
//                       }}>
//                       Create
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AddCoupon;

import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import couponService from './coupon.service';
import {NavLink} from 'react-router-dom';
import './Addcoupon.css';
import {createCoupon, getAllCoupons} from '../apiServices/apiServices';

const AddCoupon = ({onAddCoupon}) => {
  const [formData, setFormData] = useState({
    discount: '',
    valid: '',
    isActive: '',
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('jwtToken');

  // Function to generate a unique coupon code
  const generateCouponCode = () => {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `COUPON-${timestamp}${randomNum}`;
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'discount':
        if (!value) return 'Discount is required';
        if (isNaN(value) || Number(value) <= 0)
          return 'Discount must be a positive number';
        if (Number(value) > 100) return 'Discount cannot exceed 100%';
        return '';
      case 'valid':
        if (!value) return 'Valid until date is required';
        // Check if the selected date is not in the past
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
        if (selectedDate < today)
          return 'Valid until date cannot be in the past';
        return '';
      case 'isActive':
        return value !== '' ? '' : 'Coupon status is required';
      default:
        return '';
    }
  };

  const handleBlur = e => {
    const {name, value} = e.target;
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleChange = e => {
    const {name, value} = e.target;
    let formattedValue = value;

    // Special handling for isActive to convert string to boolean
    if (name === 'isActive') {
      formattedValue = value === 'true';
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchCoupons = async () => {
    try {
      const couponsData = await getAllCoupons();
      couponService.updateCoupons(couponsData);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (validateForm()) {
      // Generate coupon code internally
      const generatedCode = generateCouponCode();

      const couponData = {
        id: 0,
        code: generatedCode, // Use generated code instead of user input
        discount: Number(formData.discount),
        valid: formData.valid, // This should now properly contain the date
        isActive: formData.isActive === '' ? true : formData.isActive,
      };

      try {
        console.log('Sending coupon data:', couponData);
        const responseData = await createCoupon(couponData);
        console.log('Submitted Coupon Data:', responseData);

        if (onAddCoupon) {
          onAddCoupon(responseData);
        }

        await fetchCoupons();

        resetForm();
        toast.success(`Coupon created successfully! Code: ${generatedCode}`);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error creating coupon:', error);
        toast.error('Error creating coupon!');
      }
    } else {
      console.log('Form validation failed');
      toast.error('Please fix the validation errors before submitting');
    }
  };

  const resetForm = () => {
    setFormData({
      discount: '',
      valid: '',
      isActive: '',
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  // Generate today's date in YYYY-MM-DD format for the date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
      <NavLink
        to="#"
        className="btn btn-success navlink-custom"
        style={{backgroundColor: '#00C851', border: '1px solid #00C851'}}
        onClick={() => setIsModalOpen(true)}>
        <span className="icon-plus">+</span>add new
      </NavLink>

      {isModalOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{display: 'block'}}
            tabIndex="-1">
            <div className="modal-dialog w-25 modal-dialog-centered">
              <div className="modal-content">
                <div
                  className="modal-header text-white"
                  style={{backgroundColor: '#00C851', position: 'relative'}}>
                  <h4 className="modal-title">Create Coupon</h4>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '10px',
                      background: 'none',
                      border: 'none',
                      fontSize: '2.0rem',
                      color: 'white',
                      cursor: 'pointer',
                    }}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Removed the code input field as requested */}

                    <div className="mb-2">
                      <label className="form-label">Discount (%):</label>
                      <input
                        type="number"
                        name="discount"
                        placeholder="Enter discount percentage"
                        value={formData.discount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="1"
                        max="100"
                        step="1"
                        className={`form-control ${
                          errors.discount ? 'is-invalid' : ''
                        }`}
                      />
                      {errors.discount && (
                        <div className="invalid-feedback">
                          {errors.discount}
                        </div>
                      )}
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Valid Until:</label>
                      <input
                        type="date"
                        name="valid"
                        value={formData.valid}
                        min={today}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.valid ? 'is-invalid' : ''
                        }`}
                      />
                      {errors.valid && (
                        <div className="invalid-feedback">{errors.valid}</div>
                      )}
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Coupon Status:</label>
                      <div className="custom-select-wrapper">
                        <select
                          name="isActive"
                          value={
                            formData.isActive === true
                              ? 'true'
                              : formData.isActive === false
                              ? 'false'
                              : ''
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`form-control ${
                            errors.isActive ? 'is-invalid' : ''
                          }`}>
                          <option value="">Select status</option>
                          <option value="true">ACTIVE</option>
                          <option value="false">INACTIVE</option>
                        </select>
                        {errors.isActive && (
                          <div className="invalid-feedback">
                            {errors.isActive}
                          </div>
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
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCoupon;
