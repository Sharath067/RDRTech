// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [pwordError, setPwordError] = useState("");

//   const validateEmail = () => {
//     if (email === "") {
//       setEmailError("Enter username");
//       return false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Please enter a valid username");
//       return false;
//     }
//     setEmailError("");
//     return true;
//   };

//   const validatePword = () => {
//     if (password === "") {
//       setPwordError("Please enter password");
//       return false;
//     } else if (password.length < 8) {
//       setPwordError("Password should contain at least 8 characters");
//       return false;
//     }
//     setPwordError("");
//     return true;
//   };

//   const LoginAdmin = (e) => {
//     e.preventDefault();

//     if (!validateEmail() || !validatePword()) {
//       return;
//     }

//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user);

//         user.getIdToken().then((token) => {
//           navigate("/admin");
//           toast.success("Login successful!");
//           setEmail("");
//           setPassword("");
//         });
//       })
//       .catch((error) => {
//         toast.error("Invalid credentials. Please try again.");
//         setEmail("");
//         setPassword("");
//       });
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
//               src={require("../../Assets/Images/logo.jpg")}
//               alt=""
//               width={100}
//               height={60}
//             />{" "}
//             <br />
//             <h2>RDRTECH</h2>
//           </div>
//         </div>
//         <div className="login-section">
//           <div className="login-subsection">
//             <h2>Welcome Again!</h2>
//             <p className="sub-head" style={{ color: "black" }}>
//               Welcome back you've been missed!
//             </p>
//             <form onSubmit={LoginAdmin}>
//               <input
//                 type="text"
//                 value={email}
//                 id="input-section-email"
//                 placeholder="Username"
//                 onBlur={validateEmail}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <span className="error-message">{emailError}</span>
//               <input
//                 type="password"
//                 value={password}
//                 id="input-section-password"
//                 placeholder="Password"
//                 onBlur={validatePword}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span className="error-message">{pwordError}</span>
//               <div className="recovery-sec">
//                 <Link
//                   to="/forgot-password"
//                   style={{
//                     fontSize: "14px",
//                     cursor: "pointer",
//                     marginTop: "10px",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   Forgot Password
//                 </Link>
//               </div>
//               <button type="submit" className="button-submit">
//                 Sign IN
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;








// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [password, setPassword] = useState("");
//   const [pwordError, setPwordError] = useState("");

//   const validateUsername = () => {
//     if (username === "") {
//       setUsernameError("Please enter username");
//       return false;
//     } 
//     setUsernameError("");
//     return true;
//   };
  

//   const validatePword = () => {
//     if (password === "") {
//       setPwordError("Please enter password");
//       return false;
//     } 
//     setPwordError("");
//     return true;
//   };


//   const LoginAdmin = (e) => {
//     e.preventDefault();
  
//     // Ensure validation functions are called and return true before proceeding
//     if (!validateUsername() || !validatePword()) {
//       return;
//     }
  
//     // Make an API request to authenticate the user
//     axios
//       .post("http://54.152.49.191:8080/auth/authenticate", {
//         username: username,
//         password: password,
//       })
//       .then((response) => {
//         // console.log(username, password);
//         const token = response.data.accessToken; 

  
//         // Check if the token exists
//         if (token) {
//           // Store the accessToken in localStorage for later use
//           localStorage.setItem("jwtToken", token);
  
//           // Print the response and token for debugging purposes
//           console.log("Response from the login:", response);
//           console.log("JWT Token:", token);
  
//           // Navigate to the admin dashboard
//           navigate("/admin");
  
//           // Show a success message using toast
//           toast.success("Login successful!");
  
//           // Clear the input fields after successful login
//           setUsername("");
//           setPassword("");
//         } else {
//           // Handle cases where the token is not returned
//           toast.error("Failed to retrieve token. Please try again.");
//           setUsername("");
//           setPassword("");
//         }
//       })
//       .catch((error) => {
//         // Handle errors: logging error details
//         if (error.response) {
//           console.log("Response data:", error.response.data);
//           console.log("Response status:", error.response.status);
//           console.log("Response headers:", error.response.headers);
//         } else if (error.request) {
//           console.log("Request data:", error.request);
//         } else {
//           console.log("Error message:", error.message);
//         }
  
//         // Show an error message using toast
//         toast.error("Invalid credentials. Please try again.");
  
//         // Optionally clear the fields after a failed attempt
//         setUsername("");
//         setPassword("");
//       });
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
//               src={require("../../Assets/Images/logo.jpg")}
//               alt=""
//               width={100}
//               height={60}
//             />
//             <br />
//             <h2>RDRTECH</h2>
//           </div>
//         </div>
//         <div className="login-section">
//           <div className="login-subsection">
//             <h2>Welcome Again!</h2>
//             <p className="sub-head" style={{ color: "black" }}>
//               Welcome back you've been missed!
//             </p>
//             <form onSubmit={LoginAdmin}>
//               <input
//                 type="text"
//                 value={username}
//                 id="input-section-email"
//                 placeholder="Username"
//                 onBlur={validateUsername}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <span className="error-message">{usernameError}</span>
//               <input
//                 type="password"
//                 value={password}
//                 id="input-section-password"
//                 placeholder="Password"
//                 onBlur={validatePword}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span className="error-message">{pwordError}</span>
//               <div className="recovery-sec">
//                 <Link
//                   to="/forgot-password"
//                   style={{
//                     fontSize: "14px",
//                     cursor: "pointer",
//                     marginTop: "10px",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   Forgot Password
//                 </Link>
//               </div>
//               <button type="submit" className="button-submit">
//                 Sign IN
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [pwordError, setPwordError] = useState("");

  // Validate Username Input
  const validateUsername = () => {
    if (username === "") {
      setUsernameError("Please enter username");
      return false;
    }
    setUsernameError("");
    return true;
  };

  // Validate Password Input
  const validatePword = () => {
    if (password === "") {
      setPwordError("Please enter password");
      return false;
    }
    setPwordError("");
    return true;
  };

  // Login Handler
  const LoginAdmin = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateUsername() || !validatePword()) {
      return;
    }

    try {
      // API request to authenticate the user
      const response = await axios.post("http://54.152.49.191:8080/auth/authenticate", {
        username: username,
        password: password,
      });

      const token = response.data.accessToken;

      // Check if the token exists
      if (token) {
        // Store the accessToken in localStorage for later use
        localStorage.setItem("jwtToken", token);

        // Print the response and token for debugging purposes
        console.log("Response from the login:", response);
        console.log("JWT Token:", token);
        console.log("Username : ", username, "password : ", password);
        // Navigate to the admin dashboard after successful login
        navigate("/admin");
        console.log("Navigate to the component")
        // Show a success message using toast
        toast.success("Login successful!");

        // Clear the input fields after successful login
        setUsername("");
        setPassword("");
      } else {
        // Handle cases where the token is not returned
        toast.error("Failed to retrieve token. Please try again.");
      }
    } catch (error) {
      // Handle errors and log details for debugging
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request data:", error.request);
      } else {
        console.log("Error message:", error.message);
      }

      // Show an error message using toast
      toast.error("Invalid credentials. Please try again.");

      // Clear the fields after a failed attempt
      setUsername("");
      setPassword("");
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
              src={require("../../Assets/Images/logo.jpg")}
              alt=""
              width={100}
              height={60}
            />
            <br />
            <h2>RDR TECH</h2>
          </div>
        </div>
        <div className="login-section">
          <div className="login-subsection">
            <h2>Welcome Again!</h2>
            <p className="sub-head" style={{ color: "black" }}>
              Welcome back, you've been missed!
            </p>
            <form onSubmit={LoginAdmin}>
              <input
                type="text"
                value={username}
                id="input-section-email"
                placeholder="Username"
                onBlur={validateUsername}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="error-message">{usernameError}</span>
              <input
                type="password"
                value={password}
                id="input-section-password"
                placeholder="Password"
                onBlur={validatePword}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="error-message">{pwordError}</span>
              <div className="recovery-sec">
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Forgot Password
                </Link>
              </div>
              <button type="submit" className="button-submit">
                Sign IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
