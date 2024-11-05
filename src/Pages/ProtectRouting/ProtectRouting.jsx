import { Navigate } from "react-router-dom";

const ProtectRouting = ({ user, children }) => {
  const token = localStorage.getItem("jwtToken");

  // Redirect to login page if no token or user is found
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRouting;  
