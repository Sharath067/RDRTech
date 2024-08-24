// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from '../../firebase';

// const SignUp = () => {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [pwordError, setPwordError] = useState('');

//     const validateEmail = () => {
//         if (email === '') {
//             setEmailError('Enter email address');
//             return false;
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             setEmailError('Please enter a valid email address');
//             return false;
//         }
//         setEmailError('');
//         return true;
//     };

//     const validatePword = () => {
//         if (password === '') {
//             setPwordError('Please enter password');
//             return false;
//         } else if (password.length < 8) {
//             setPwordError('Password should contain at least 8 characters');
//             return false;
//         }
//         setPwordError('');
//         return true;
//     };

    
//     const SignUpForm = (e) => {
//         e.preventDefault();

//         if (!validateEmail() || !validatePword()) {
//             return;
//         }

//         createUserWithEmailAndPassword(auth, email, password)
//             .then((data) => {
//                 console.log(data, "authData");
//                 toast.success('Sign-up successful!');
//                 navigate('/login');
//             })
//             .catch((err) => {
//                 toast.error(err.message);
//             });
//     };

//     const handleSignIn = (e) => {
//         e.preventDefault();
//         navigate('/login');
//     };

//     return (
//         <div className='main-div'>
//             <div className="sub-section">
//                 <div className="login-content">
//                     <div className="side-box"></div>
//                     <div className="sidebox-2"></div>
//                     <div className="side-box-3"></div>
//                     <div className="sidebox-4"></div>
//                     <div className="logo-section">
//                         <img src={require('../../Assets/Images/logo.jpg')} alt="" width={100} height={60} /> <br />
//                         <h2>RDRTECH</h2>
//                     </div>
//                 </div>
//                 <div className="login-section">
//                     <div className="login-subsection">
//                         <h2>Create an Account</h2>
//                         <p style={{ color: 'black' }}>Join us and enjoy our services!</p>
//                         <form onSubmit={SignUpForm}>
//                             <input
//                                 type="text"
//                                 value={email}
//                                 id="input-section-email"
//                                 placeholder='Email'
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 onBlur={validateEmail}
//                             /> <br />
//                             <span className="error-message">{emailError}</span>
//                             <input
//                                 type="password"
//                                 value={password}
//                                 id="input-section-password"
//                                 placeholder='Password'
//                                 onChange={(e) => setPassword(e.target.value)}
//                             /> <br />
//                             <span className="error-message">{pwordError}</span>
//                             <button type='submit' className='button-submit'>Sign Up</button>
//                             <p className='signUp'>
//                                 Already have an account? <a href='' className='join' onClick={handleSignIn}>Sign IN</a>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
