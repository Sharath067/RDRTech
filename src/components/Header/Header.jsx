import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "./Header.css";
import { auth } from "../../firebase";

const Header = () => {
  const navigate = useNavigate();


  const dashBoardPage = () => {
    navigate("/admin");
  };

  const logoutPage = () => {
    signOut(auth)
      .then(() => {
        console.log("signout successful");
        navigate("/"); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header-section">
      <div className="header-subsection">
        <div className="company-name">
          <h3 onClick={dashBoardPage} className="projectTitle"> RDR TECH Admin Panel</h3>
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
