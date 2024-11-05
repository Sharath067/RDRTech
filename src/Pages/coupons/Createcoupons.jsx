// import React, { useState } from 'react';
// import './Createcoupons.css';
// import { useAuth } from '../AuthContexts/AuthContext';
// import Header from '../../components/Header/Header';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Createcoupons = () => {
//     const { token } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         code: '',
//         description: '',
//         rupees: '',
//         expireDate: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(true);

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.code) newErrors.code = 'Code is required';
//         if (!formData.description) newErrors.description = 'Description is required';
//         if (!formData.rupees) newErrors.rupees = 'Rupees are required';
//         else if (isNaN(formData.rupees)) newErrors.rupees = 'Valid Rupees amount is required';
//         if (!formData.expireDate) newErrors.expireDate = 'Expiration date is required';
//         return newErrors;
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         if (errors[name]) {
//             setErrors({
//                 ...errors,
//                 [name]: ''
//             });
//         }
//     };

//     const handleBlur = (e) => {
//         const fieldErrors = validate();
//         setErrors({
//             ...errors,
//             ...fieldErrors
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = validate();
//         if (Object.keys(newErrors).length === 0) {
//             const postData = {
//                 code: formData.code,
//                 description: formData.description,
//                 rupees: parseFloat(formData.rupees),
//                 expireDate: formData.expireDate
//             };

//             setLoading(true);

//             try {
//                 const response = await fetch('http://54.152.49.191:8080/coupon/save', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(postData)
//                 });

//                 const result = await response.json();
//                 toast.success('Coupon created successfully!');
//                 console.log('Success:', result);

//                 setFormData({
//                     code: '',
//                     description: '',
//                     rupees: '',
//                     expireDate: ''
//                 });

//                 setIsModalOpen(false);
//             } catch (error) {
//                 console.error('Error:', error);
//                 toast.error('Failed to create coupon!');
//             } finally {
//                 setLoading(false);
//             }
//         } else {
//             setErrors(newErrors);
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <Header />
//             {isModalOpen && (
//                 <div className="create-sub-container">
//                     <div className="back-arrow-container">
//                         <button onClick={() => navigate(-1)}>
//                             <i className="fa fa-arrow-left fa-1x" aria-hidden="true"></i>
//                         </button>
//                     </div>
//                     <div className="create-plan-container">
//                         <h1>Create Coupon</h1>
//                         <form className="create-plan-form" onSubmit={handleSubmit}>
//                             <label>
//                                 Code
//                                 <input
//                                     type="text"
//                                     name="code"
//                                     value={formData.code}
//                                     onChange={handleChange}
//                                     placeholder='Enter code'
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.code && <small className="text-danger">{errors.code}</small>}
//                             </label>
//                             <label>
//                                 Description
//                                 <input
//                                     type="text"
//                                     name="description"
//                                     placeholder='Enter description'
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.description && <small className="text-danger">{errors.description}</small>}
//                             </label>
//                             <label>
//                                 Rupees
//                                 <input
//                                     type="text"
//                                     name="rupees"
//                                     placeholder='Enter rupees'
//                                     value={formData.rupees}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.rupees && <small className="text-danger">{errors.rupees}</small>}
//                             </label>
//                             <label>
//                                 Expire Date
//                                 <input
//                                     type="date"
//                                     name="expireDate"
//                                     value={formData.expireDate}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.expireDate && <small className="text-danger">{errors.expireDate}</small>}
//                             </label>
//                             <label>
//                                 Account
//                                 <input
//                                     type="boolean"
//                                     name="account"
//                                     value={formData.isActive}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />
//                                 {errors.isActive && <small className="text-danger">{errors.isActive}</small>}
//                             </label>
//                             <div className="form-buttons">
//                                 <button type="submit" className="create-button" disabled={loading}>
//                                     {loading ? 'Creating...' : 'Create Coupon'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Createcoupons;






import React, { useState } from 'react';
import './Createcoupons.css';
import { useAuth } from '../AuthContexts/AuthContext';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCoupon } from '../apiServices/apiServices';

const Createcoupons = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        rupees: '',
        expireDate: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const validate = () => {
        const newErrors = {};
        if (!formData.code) newErrors.code = 'Code is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.rupees) newErrors.rupees = 'Rupees are required';
        else if (isNaN(formData.rupees)) newErrors.rupees = 'Valid Rupees amount is required';
        if (!formData.expireDate) newErrors.expireDate = 'Expiration date is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleBlur = (e) => {
        const fieldErrors = validate();
        setErrors({
            ...errors,
            ...fieldErrors
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            const postData = {
                code: formData.code,
                description: formData.description,
                rupees: parseFloat(formData.rupees),
                expireDate: formData.expireDate
            };

            setLoading(true);

            try {
                const result = await createCoupon(postData, token);  
                toast.success('Coupon created successfully!');
                console.log('Success:', result);

                setFormData({
                    code: '',
                    description: '',
                    rupees: '',
                    expireDate: ''
                });

                setIsModalOpen(false);
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
                                    placeholder='Enter code'
                                    onBlur={handleBlur}
                                />
                                {errors.code && <small className="text-danger">{errors.code}</small>}
                            </label>
                            <label>
                                Description
                                <input
                                    type="text"
                                    name="description"
                                    placeholder='Enter description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.description && <small className="text-danger">{errors.description}</small>}
                            </label>
                            <label>
                                Rupees
                                <input
                                    type="text"
                                    name="rupees"
                                    placeholder='Enter rupees'
                                    value={formData.rupees}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.rupees && <small className="text-danger">{errors.rupees}</small>}
                            </label>
                            <label>
                                Expire Date
                                <input
                                    type="date"
                                    name="expireDate"
                                    value={formData.expireDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expireDate && <small className="text-danger">{errors.expireDate}</small>}
                            </label>
                            <div className="form-buttons">
                                <button type="submit" className="create-button" disabled={loading}>
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
