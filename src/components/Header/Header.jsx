import {useNavigate} from 'react-router-dom';
import './Header.css';
import TokenServices from '../../services/TokenServices';

const Header = () => {
  const navigate = useNavigate();

  const dashBoardPage = () => {
    navigate('/admin');
  };

  const logoutPage = () => {
    try {
      // Clear all authentication tokens from localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpiry');
      localStorage.removeItem('refreshTokenExpiry');

      // Clear any token refresh timers if TokenServices has a cleanup method
      if (TokenServices.clearTokenRefresh) {
        TokenServices.clearTokenRefresh();
      }

      console.log('Logout successful');

      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, still navigate to login
      navigate('/login');
    }
  };

  return (
    <div className="header-section">
      <div className="header-subsection">
        <div className="company-name">
          <h3 onClick={dashBoardPage} className="projectTitle">
            {' '}
            RDR TECH Admin Panel
          </h3>
        </div>
        <div className="details">
          <div>
            <button onClick={logoutPage}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
