import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwordError, setPwordError] = useState('');

    const validateEmail = () => {
        if (email === '') {
            setEmailError('Enter username');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid username');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePword = () => {
        if (password === '') {
            setPwordError('Please enter password');
            return false;
        } else if (password.length < 8) {
            setPwordError('Password should contain at least 8 characters');
            return false;
        }
        setPwordError('');
        return true;
    };

    const LoginAdmin = (e) => {
        e.preventDefault();

        if (!validateEmail() || !validatePword()) {
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);

                user.getIdToken().then((token) => {
                    navigate('/admin');
                    toast.success('Login successful!');
                    setEmail('');
                    setPassword('');
                });
            })
            .catch((error) => {
                toast.error('Invalid credentials. Please try again.');
                setEmail('');
                setPassword('');
            });
    }

    return (
        <div className='main-div'>
            <div className="sub-section">
                <div className="login-content">
                    <div className="side-box"></div>
                    <div className="sidebox-2"></div>
                    <div className="side-box-3"></div>
                    <div className="sidebox-4"></div>
                    <div className="logo-section">
                        <img src={require('../../Assets/Images/logo.jpg')} alt="" width={100} height={60} /> <br />
                        <h2>RDRTECH</h2>
                    </div>
                </div>
                <div className="login-section">
                    <div className="login-subsection">
                        <h2>Welcome Again!</h2>
                        <p className='sub-head' style={{ color: 'black' }}>Welcome back you've been missed!</p>
                        <form onSubmit={LoginAdmin}>
                            <input
                                type="text"
                                value={email}
                                id="input-section-email"
                                placeholder='Username'
                                onBlur={validateEmail}
                                onChange={(e) => setEmail(e.target.value)}
                            /> 
                            <span className="error-message">{emailError}</span>
                            <input
                                type="password"
                                value={password}
                                id="input-section-password"
                                placeholder='Password'
                                onBlur={validatePword}
                                onChange={(e) => setPassword(e.target.value)}
                            /> 
                            <span className="error-message">{pwordError}</span>
                            <div className="recovery-sec">
                                <Link to='/forgot-password'
                                    style={{ fontSize: '14px', cursor: 'pointer', marginTop: '10px', marginBottom: '10px' }}
                                >
                                    Forgot Password
                                </Link>
                            </div>
                            <button type='submit' className='button-submit'>Sign IN</button>
                            {/* <div className='sub'>
                                <Link className='signUp' to='/signup'>
                                    New to RDRTECH? <a href='jdfh' className='join'>Join now</a>
                                </Link>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
