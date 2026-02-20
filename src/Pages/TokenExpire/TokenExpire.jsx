import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://54.221.22.62:8080';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Axios interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  response => {
    // If the response is successful (status 200), just return the response
    return response;
  },
  error => {
    // If the error is 401 (Unauthorized), handle token expiration
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/'; // Use React Router's `navigate` for more complex routing
      // Optionally clear token from local storage
      localStorage.removeItem('jwtToken');
    }
    // Reject the promise to propagate the error further
    return Promise.reject(error);
  },
);

// Add JWT token to all requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
