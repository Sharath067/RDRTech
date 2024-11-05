import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { app } from '../../firebase'; 

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component that provides both Firebase and JWT tokens to the rest of the app
export const AuthProvider = ({ children }) => {
  const [firebaseToken, setFirebaseToken] = useState(null);  
  const [jwtToken, setJwtToken] = useState(null);           
  const auth = getAuth(app);

  // Function to handle Firebase token and fetch JWT token
  useEffect(() => {
    const fetchTokens = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get Firebase ID token
          const token = await user.getIdToken();
          setFirebaseToken(token);

          // Get JWT token from backend using Firebase token
          try {
            const response = await axios.post('http://54.152.49.191:8080/auth/authenticate', {
              firebaseToken: token, // Send Firebase token to backend
            });

            const { jwtToken } = response.data; // Assuming backend returns jwtToken in response
            setJwtToken(jwtToken);

            // Optionally store JWT token in localStorage for persistence
            localStorage.setItem('jwtToken', jwtToken);
          } catch (error) {
            console.error('Failed to fetch JWT token from server:', error);
            setJwtToken(null);
          }
        } else {
          setFirebaseToken(null);
          setJwtToken(null);
          localStorage.removeItem('jwtToken');
        }
      });
    };

    fetchTokens();
  }, [auth]);

  // Function to handle manual login (for JWT based on username/password)
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://54.152.49.191:8080/auth/authenticate', {
        username,
        password
      });
      const { jwtToken } = response.data; // Assume response contains jwtToken
      setJwtToken(jwtToken);
      localStorage.setItem('jwtToken', jwtToken); // Optionally store in localStorage
    } catch (error) {
      console.error('Login failed:', error);
      setJwtToken(null);
    }
  };

  // Function to handle logout (clearing tokens)
  const logout = () => {
    setFirebaseToken(null);
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  // Load JWT token from localStorage if available on app start
  useEffect(() => {
    const storedJwtToken = localStorage.getItem('jwtToken');
    if (storedJwtToken) {
      setJwtToken(storedJwtToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseToken, jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access Auth context
export const useAuth = () => useContext(AuthContext);
