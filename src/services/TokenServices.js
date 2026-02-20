// tokenService.js
import axios from 'axios';

const API_BASE_URL = 'http://54.221.22.62:8080';
// 100.24.7.142

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Time constants in milliseconds
const MINUTE_MS = 60 * 1000;
const ACCESS_TOKEN_EXPIRY = 20 * MINUTE_MS; // 20 minutes
const REFRESH_TOKEN_EXPIRY = 1440 * MINUTE_MS; // 24 hours (1440 minutes)

// Refresh 5 minutes before expiry for access token
const REFRESH_BUFFER = 5 * MINUTE_MS;

// Timers for token refresh
let accessTokenTimer = null;
let refreshTokenTimer = null;

// Add request interceptor to automatically add token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Add response interceptor to handle token refresh on 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh the token yet
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Get new tokens using refresh token
        const newTokens = await refreshAccessToken();

        if (newTokens) {
          // Update authorization header with new access token
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${newTokens.accessToken}`;

          // Retry the original request with new token
          return api(originalRequest);
        } else {
          // If token refresh fails, redirect to login
          logoutAndRedirect();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        logoutAndRedirect();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Initialize token timers when app loads or user logs in
 */
export const initializeTokenRefresh = () => {
  clearTokenTimers();

  const jwtToken = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!jwtToken || !refreshToken) {
    return false;
  }

  setupTokenRefreshTimers();
  return true;
};

/**
 * Setup timers to refresh tokens before they expire
 */
export const setupTokenRefreshTimers = () => {
  // Clear any existing timers
  clearTokenTimers();

  // Get stored expiry times
  const accessTokenExpiryStr = localStorage.getItem('accessTokenExpiry');
  const refreshTokenExpiryStr = localStorage.getItem('refreshTokenExpiry');

  if (!accessTokenExpiryStr || !refreshTokenExpiryStr) {
    // If no expiry times are stored, set default ones
    const now = new Date().getTime();
    const accessExpiry = new Date(now + ACCESS_TOKEN_EXPIRY);
    const refreshExpiry = new Date(now + REFRESH_TOKEN_EXPIRY);

    localStorage.setItem('accessTokenExpiry', accessExpiry.toString());
    localStorage.setItem('refreshTokenExpiry', refreshExpiry.toString());

    scheduleTokenRefresh(accessExpiry, refreshExpiry);
  } else {
    // Use stored expiry times
    scheduleTokenRefresh(
      new Date(accessTokenExpiryStr),
      new Date(refreshTokenExpiryStr),
    );
  }
};

/**
 * Schedule token refresh based on expiry times
 */
const scheduleTokenRefresh = (accessExpiry, refreshExpiry) => {
  const now = new Date().getTime();

  // Calculate time until refresh needed (5 minutes before expiry)
  const timeUntilAccessRefresh = Math.max(
    accessExpiry.getTime() - now - REFRESH_BUFFER,
    0,
  );

  const timeUntilRefreshTokenRefresh = Math.max(
    refreshExpiry.getTime() - now - REFRESH_BUFFER,
    0,
  );

  console.log(
    `Access token will refresh in ${
      timeUntilAccessRefresh / 1000 / 60
    } minutes`,
  );
  console.log(
    `Refresh token will refresh in ${
      timeUntilRefreshTokenRefresh / 1000 / 60
    } minutes`,
  );

  // Set timer to refresh the access token
  if (timeUntilAccessRefresh < REFRESH_TOKEN_EXPIRY) {
    accessTokenTimer = setTimeout(() => {
      refreshAccessToken();
    }, timeUntilAccessRefresh);
  }

  // Set timer to refresh the refresh token
  if (timeUntilRefreshTokenRefresh < REFRESH_TOKEN_EXPIRY) {
    refreshTokenTimer = setTimeout(() => {
      refreshRefreshToken();
    }, timeUntilRefreshTokenRefresh);
  }
};

/**
 * Clear all token refresh timers
 */
const clearTokenTimers = () => {
  if (accessTokenTimer) {
    clearTimeout(accessTokenTimer);
    accessTokenTimer = null;
  }

  if (refreshTokenTimer) {
    clearTimeout(refreshTokenTimer);
    refreshTokenTimer = null;
  }
};

/**
 * Refresh the access token using the refresh token
 */
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      return null;
    }

    const response = await axios.post(
      `${API_BASE_URL}/auth/get-access-token-by-refresh`,
      {refreshToken},
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const {
      accessToken,
      refreshToken: newRefreshToken,
      accessTokenExpireIn,
      refreshTokenExpireIn,
    } = response.data;

    // Store new tokens
    localStorage.setItem('jwtToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    // Update token expiry times
    const now = new Date().getTime();
    const accessExpiry = new Date(now + accessTokenExpireIn * 60 * 1000);
    const refreshExpiry = new Date(now + refreshTokenExpireIn * 60 * 1000);

    localStorage.setItem('accessTokenExpiry', accessExpiry.toString());
    localStorage.setItem('refreshTokenExpiry', refreshExpiry.toString());

    // Reset timers for next refresh
    setupTokenRefreshTimers();

    return {accessToken, refreshToken: newRefreshToken};
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

/**
 * Specifically refresh the refresh token before it expires
 */
export const refreshRefreshToken = async () => {
  try {
    // Use the current refresh token to get a new pair of tokens
    const result = await refreshAccessToken();

    if (result) {
      console.log('Successfully refreshed tokens');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error refreshing refresh token:', error);
    logoutAndRedirect();
    return false;
  }
};

/**
 * Handle login and token storage
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_BASE_URL}/auth/authenticate`,
      data: {
        username: username,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    const {
      accessToken,
      refreshToken,
      accessTokenExpireIn,
      refreshTokenExpireIn,
    } = response.data;

    if (!accessToken || !refreshToken) {
      throw new Error('Tokens not provided in the response');
    }

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
    setupTokenRefreshTimers();

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Handle logout
 */
export const logout = () => {
  clearTokenTimers();
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessTokenExpiry');
  localStorage.removeItem('refreshTokenExpiry');
};

/**
 * Logout and redirect to login page
 */
export const logoutAndRedirect = () => {
  logout();
  window.location.href = '/';
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('jwtToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!token || !refreshToken) {
    return false;
  }

  // Check if tokens are expired
  const accessTokenExpiryStr = localStorage.getItem('accessTokenExpiry');
  const refreshTokenExpiryStr = localStorage.getItem('refreshTokenExpiry');

  if (!accessTokenExpiryStr || !refreshTokenExpiryStr) {
    return false;
  }

  const now = new Date().getTime();
  const refreshExpiry = new Date(refreshTokenExpiryStr).getTime();

  // If refresh token is expired, user needs to log in again
  if (now >= refreshExpiry) {
    logout();
    return false;
  }

  return true;
};

export default {
  api,
  initializeTokenRefresh,
  refreshAccessToken,
  loginUser,
  logout,
  isAuthenticated,
};
