// import React, {useState} from 'react';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './SignUp.css';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios'; // Make sure to install axios: npm install axios

// const SignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: '',
//     name: '',
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = e => {
//     const {id, value} = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   const validateField = (field, value) => {
//     switch (field) {
//       case 'username':
//         return value === '' ? 'Username is required' : '';
//       case 'name':
//         return value === '' ? 'Name is required' : '';
//       case 'email':
//         if (value === '') {
//           return 'Email is required';
//         } else if (!/\S+@\S+\.\S+/.test(value)) {
//           return 'Please enter a valid email address';
//         }
//         return '';
//       case 'password':
//         if (value === '') {
//           return 'Password is required';
//         } else if (value.length < 8) {
//           return 'Password should contain at least 8 characters';
//         }
//         return '';
//       default:
//         return '';
//     }
//   };

//   const handleBlur = e => {
//     const {id, value} = e.target;
//     const errorMessage = validateField(id, value);
//     setErrors({
//       ...errors,
//       [id]: errorMessage,
//     });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(formData).forEach(field => {
//       const errorMessage = validateField(field, formData[field]);
//       newErrors[field] = errorMessage;
//       if (errorMessage) {
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const SignUpForm = async e => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const response = await axios.post(
//         'https://rdrtech-api.atparui.com/auth/signup',
//         {
//           username: formData.username,
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         },
//       );

//       console.log(response.data, 'API Response in the sign up');
//       toast.success('Sign-up successful!');
//       navigate('/login');
//     } catch (error) {
//       console.error('Error during signup:', error);
//       toast.error(
//         error.response?.data?.message ||
//           'An error occurred during registration',
//       );
//     }
//   };

//   const handleSignIn = e => {
//     e.preventDefault();
//     navigate('/login');
//   };

//   return (
//     <div className="main-div">
//       <div className="sub-section">
//         <div className="login-content">
//           <div className="side-box"></div>
//           <div className="sidebox-2"></div>
//           <div className="side-box-3"></div>
//           <div className="sidebox-4"></div>
//           <div className="logo-section">
//             <img
//               src={require('../../Assets/Images/1024.png')}
//               className="main_logo"
//               alt=""
//               width={100}
//               height={80}
//             />
//             <br />
//             <h2 className="company-name">RDR TECH</h2>
//           </div>
//         </div>
//         <div className="login-section">
//           <div className="login-subsection-1">
//             <h2>Create an Account</h2>
//             <p style={{color: 'black'}}>Join us and enjoy our services!</p>
//             <form onSubmit={SignUpForm}>
//               <input
//                 type="text"
//                 id="username"
//                 className="input-field"
//                 value={formData.username}
//                 placeholder="Username"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />{' '}
//               <br />
//               <span className="error-message">{errors.username}</span>
//               <input
//                 type="text"
//                 id="name"
//                 className="input-field"
//                 value={formData.name}
//                 placeholder="Full Name"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />{' '}
//               <br />
//               <span className="error-message">{errors.name}</span>
//               <input
//                 type="text"
//                 id="email"
//                 className="input-field"
//                 value={formData.email}
//                 placeholder="Email"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />{' '}
//               <br />
//               <span className="error-message">{errors.email}</span>
//               <input
//                 type="password"
//                 id="password"
//                 className="input-field"
//                 value={formData.password}
//                 placeholder="Password"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />{' '}
//               <br />
//               <span className="error-message">{errors.password}</span>
//               <button type="submit" className="button-submit">
//                 Sign Up
//               </button>
//               <p className="signUp">
//                 Already have an account?{' '}
//                 <a href="" className="join" onClick={handleSignIn}>
//                   Sign IN
//                 </a>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TokenServices from '../../services/TokenServices';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  // Check if user is already logged in
  useEffect(() => {
    if (TokenServices.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleChange = e => {
    const {id, value} = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateField = (field, value) => {
    switch (field) {
      case 'username':
        return value === '' ? 'Username is required' : '';
      case 'name':
        return value === '' ? 'Name is required' : '';
      case 'email':
        if (value === '') {
          return 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'password':
        if (value === '') {
          return 'Password is required';
        } else if (value.length < 8) {
          return 'Password should contain at least 8 characters';
        }
        return '';
      default:
        return '';
    }
  };

  const handleBlur = e => {
    const {id, value} = e.target;
    const errorMessage = validateField(id, value);
    setErrors({
      ...errors,
      [id]: errorMessage,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(field => {
      const errorMessage = validateField(field, formData[field]);
      newErrors[field] = errorMessage;
      if (errorMessage) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const SignUpForm = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        'https://rdrtech-api.atparui.com/auth/signup',
        {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );

      console.log(response.data, 'API Response in the sign up');

      // If signup returns tokens directly
      if (response.data.accessToken && response.data.refreshToken) {
        const {
          accessToken,
          refreshToken,
          accessTokenExpireIn,
          refreshTokenExpireIn,
        } = response.data;

        // Store tokens
        localStorage.setItem('jwtToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        // Calculate and store expiry times
        const now = new Date().getTime();
        const accessExpiry = new Date(now + accessTokenExpireIn * 60 * 1000);
        const refreshExpiry = new Date(now + refreshTokenExpireIn * 60 * 1000);

        localStorage.setItem('accessTokenExpiry', accessExpiry.toString());
        localStorage.setItem('refreshTokenExpiry', refreshExpiry.toString());

        // Setup token refresh timers
        TokenServices.initializeTokenRefresh();

        toast.success('Sign-up successful!');
        navigate('/admin');
      } else {
        // If signup doesn't return tokens, navigate to login
        toast.success('Sign-up successful! Please login.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(
        error.response?.data?.message ||
          'An error occurred during registration',
      );
    }
  };

  const handleSignIn = e => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="main-div">
      <div className="sub-section">
        <div className="login-content">
          <div className="side-box"></div>
          <div className="sidebox-2"></div>
          <div className="side-box-3"></div>
          <div className="sidebox-4"></div>
          <div className="logo-section">
            <img
              src={require('../../Assets/Images/1024.png')}
              className="main_logo"
              alt=""
              width={100}
              height={80}
            />
            <br />
            <h2 className="company-name">RDR TECH</h2>
          </div>
        </div>
        <div className="login-section">
          <div className="login-subsection-1">
            <h2>Create an Account</h2>
            <p style={{color: 'black'}}>Join us and enjoy our services!</p>
            <form onSubmit={SignUpForm}>
              <input
                type="text"
                id="username"
                className="input-field"
                value={formData.username}
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              <br />
              <span className="error-message">{errors.username}</span>
              <input
                type="text"
                id="name"
                className="input-field"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              <br />
              <span className="error-message">{errors.name}</span>
              <input
                type="text"
                id="email"
                className="input-field"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              <br />
              <span className="error-message">{errors.email}</span>
              <input
                type="password"
                id="password"
                className="input-field"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />{' '}
              <br />
              <span className="error-message">{errors.password}</span>
              <button type="submit" className="button-submit">
                Sign Up
              </button>
              <p className="signUp">
                Already have an account?{' '}
                <a href="" className="join" onClick={handleSignIn}>
                  Sign IN
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
