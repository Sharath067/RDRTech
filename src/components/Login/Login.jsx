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
