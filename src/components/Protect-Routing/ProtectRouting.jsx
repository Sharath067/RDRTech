import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectRouting = ({ children, user}) => {
  return (
    user ? children : <Navigate to="/" />
  )
}

export default ProtectRouting;