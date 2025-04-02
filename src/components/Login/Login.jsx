// import React, {useState, useEffect} from 'react';
// import {Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import './Login.css';

// // Base URL for API
// const API_BASE_URL = 'https://rdrtech-api.atparui.com';

// // Create an axios instance for authenticated requests
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// // Add interceptor to handle token refresh
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // If error is 401 and we haven't tried to refresh the token yet
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         // Get the refresh token
//         const refreshToken = localStorage.getItem('refreshToken');

//         if (!refreshToken) {
//           // No refresh token available, redirect to login
//           window.location.href = '/';
//           return Promise.reject(error);
//         }

//         // Request new access token
//         const response = await axios.post(
//           `${API_BASE_URL}/auth/get-access-token-by-refresh`,
//           {refreshToken},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Accept: 'application/json',
//             },
//           },
//         );

//         // Store the new tokens
//         const {accessToken, refreshToken: newRefreshToken} = response.data;
//         localStorage.setItem('jwtToken', accessToken);
//         localStorage.setItem('refreshToken', newRefreshToken);

//         // Update header for the original request
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // If refresh token is invalid, logout user
//         localStorage.removeItem('jwtToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// // Add request interceptor to add token to all requests
// api.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error),
// );

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [usernameError, setUsernameError] = useState('');
//   const [password, setPassword] = useState('');
//   const [pwordError, setPwordError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Check if user is already logged in
//   useEffect(() => {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//       navigate('/admin');
//     }
//   }, [navigate]);

//   // Validate Username Input
//   const validateUsername = () => {
//     if (username.trim() === '') {
//       setUsernameError('Please enter username');
//       return false;
//     }
//     setUsernameError('');
//     return true;
//   };

//   // Validate Password Input
//   const validatePword = () => {
//     if (password.trim() === '') {
//       setPwordError('Please enter password');
//       return false;
//     }
//     setPwordError('');
//     return true;
//   };

//   // Login Handler
//   const LoginAdmin = async e => {
//     e.preventDefault();

//     // Validate inputs before proceeding
//     if (!validateUsername() || !validatePword()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // API request to authenticate the user
//       const response = await axios({
//         method: 'post',
//         url: `${API_BASE_URL}/auth/authenticate`,
//         data: {
//           username: username,
//           password: password,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         // Ensure credentials are included
//         withCredentials: true,
//       });

//       console.log('Login response:', response.data);

//       const {
//         accessToken,
//         refreshToken,
//         accessTokenExpireIn,
//         refreshTokenExpireIn,
//       } = response.data;

//       // Check if the tokens exist
//       if (accessToken && refreshToken) {
//         // Store the tokens in localStorage for later use
//         localStorage.setItem('jwtToken', accessToken);
//         localStorage.setItem('refreshToken', refreshToken);

//         // Store token expiration times
//         const accessTokenExpiry = new Date(
//           new Date().getTime() + accessTokenExpireIn * 60000,
//         );
//         const refreshTokenExpiry = new Date(
//           new Date().getTime() + refreshTokenExpireIn * 60000,
//         );

//         localStorage.setItem('accessTokenExpiry', accessTokenExpiry.toString());
//         localStorage.setItem(
//           'refreshTokenExpiry',
//           refreshTokenExpiry.toString(),
//         );

//         // Navigate to the admin dashboard after successful login
//         navigate('/admin');

//         // Show a success message using toast
//         toast.success('Login successful!');

//         // Clear the input fields after successful login
//         setUsername('');
//         setPassword('');
//       } else {
//         // Handle cases where the tokens are not returned
//         toast.error(
//           'Failed to retrieve authentication tokens. Please try again.',
//         );
//       }
//     } catch (error) {
//       // Handle errors
//       console.error('Login error:', error);

//       let errorMessage = 'Invalid credentials. Please try again.';

//       if (error.response) {
//         console.log('Response status:', error.response.status);
//         console.log('Response data:', error.response.data);

//         // Customize error message based on server response if available
//         if (error.response.data && error.response.data.message) {
//           errorMessage = error.response.data.message;
//         } else if (error.response.status === 401) {
//           errorMessage =
//             'Authentication failed. Please check your credentials and try again.';
//         } else if (error.response.status === 500) {
//           errorMessage = 'Server error. Please try again later.';
//         }
//       } else if (error.request) {
//         // The request was made but no response was received
//         errorMessage =
//           'No response from server. Please check your internet connection.';
//       } else {
//         // Something happened in setting up the request
//         errorMessage = 'Error setting up request. Please try again.';
//       }

//       // Show an error message using toast
//       toast.error(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
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
//           <div className="login-subsection">
//             <h2>Welcome Again!</h2>
//             <p className="sub-head" style={{color: 'black'}}>
//               Welcome back, you've been missed!
//             </p>
//             <form onSubmit={LoginAdmin}>
//               <input
//                 type="text"
//                 value={username}
//                 id="input-section-email"
//                 placeholder="Username"
//                 onBlur={validateUsername}
//                 onChange={e => setUsername(e.target.value)}
//               />
//               <span className="error-message">{usernameError}</span>
//               <input
//                 type="password"
//                 value={password}
//                 id="input-section-password"
//                 placeholder="Password"
//                 onBlur={validatePword}
//                 onChange={e => setPassword(e.target.value)}
//               />
//               <span className="error-message">{pwordError}</span>
//               <div className="recovery-sec">
//                 <Link
//                   to="/forgot-password"
//                   style={{
//                     fontSize: '14px',
//                     cursor: 'pointer',
//                     marginTop: '10px',
//                     marginBottom: '10px',
//                   }}>
//                   Forgot Password
//                 </Link>
//               </div>
//               <button
//                 type="submit"
//                 className="button-submit"
//                 disabled={isLoading}>
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </button>
//               <div style={{marginTop: '15px', textAlign: 'center'}}>
//                 <p className="signUp">
//                   Don't have an account?{' '}
//                   <Link to="/signup" className="join">
//                     Signup
//                   </Link>
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import TokenServices from '../../services/TokenServices';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [pwordError, setPwordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    // Initialize token refresh system
    const isLoggedIn = TokenServices.initializeTokenRefresh();

    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  // Validate Username Input
  const validateUsername = () => {
    if (username.trim() === '') {
      setUsernameError('Please enter username');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Validate Password Input
  const validatePword = () => {
    if (password.trim() === '') {
      setPwordError('Please enter password');
      return false;
    }
    setPwordError('');
    return true;
  };

  // Login Handler
  const LoginAdmin = async e => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateUsername() || !validatePword()) {
      return;
    }

    setIsLoading(true);

    try {
      // Use TokenServices to login
      await TokenServices.loginUser(username, password);

      // Show success toast
      toast.success('Login successful!');

      // Navigate to admin dashboard
      navigate('/admin');

      // Clear form fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'Invalid credentials. Please try again.';

      if (error.response) {
        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 401) {
          errorMessage =
            'Authentication failed. Please check your credentials and try again.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage =
          'No response from server. Please check your internet connection.';
      } else {
        errorMessage = 'Error setting up request. Please try again.';
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
          <div className="login-subsection">
            <h2>Welcome Again!</h2>
            <p className="sub-head" style={{color: 'black'}}>
              Welcome back, you've been missed!
            </p>
            <form onSubmit={LoginAdmin}>
              <input
                type="text"
                value={username}
                id="input-section-email"
                placeholder="Username"
                onBlur={validateUsername}
                onChange={e => setUsername(e.target.value)}
              />
              <span className="error-message">{usernameError}</span>
              <input
                type="password"
                value={password}
                id="input-section-password"
                placeholder="Password"
                onBlur={validatePword}
                onChange={e => setPassword(e.target.value)}
              />
              <span className="error-message">{pwordError}</span>
              <div className="recovery-sec">
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}>
                  Forgot Password
                </Link>
              </div>
              <button
                type="submit"
                className="button-submit"
                disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              <div style={{marginTop: '15px', textAlign: 'center'}}>
                <p className="signUp">
                  Don't have an account?{' '}
                  <Link to="/signup" className="join">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
