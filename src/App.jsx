import React, {useEffect, useState} from 'react';
import Login from './components/Login/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import Admin from './components/Admin/Admin';
import {auth} from './firebase';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ForgotPass from './components/Login/ForgotPass';
import ProtectRouting from './Pages/ProtectRouting/ProtectRouting';
import SignUp from './components/Login/SignUp';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        return;
      }
      setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="toast-custom"
          bodyClassName="body-custom"
          progressClassName="progress-custom"
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectRouting user={user}>
                <Admin />
              </ProtectRouting>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, {useEffect, useState} from 'react';
// import Login from './components/Login/Login';
// import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
// import {onAuthStateChanged} from 'firebase/auth';
// import Admin from './components/Admin/Admin';
// import {auth} from './firebase';
// import {ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
// import ForgotPass from './components/Login/ForgotPass';
// import ProtectRouting from './Pages/ProtectRouting/ProtectRouting';
// import SignUp from './components/Login/SignUp';
// import TokenServices from './services/TokenServices';

// // Protected route component
// const ProtectedRoute = ({children}) => {
//   const isAuthenticated = TokenServices.isAuthenticated();

//   if (!isAuthenticated) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// function App() {
//   const [user, setUser] = useState(null);

//   // Initialize token refresh when app loads
//   useEffect(() => {
//     TokenServices.initializeTokenRefresh();

//     // Clean up timers when app unmounts
//     return () => {
//       TokenServices.logout();
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, user => {
//       if (user) {
//         setUser(user);
//         return;
//       }
//       setUser(null);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div>
//       <BrowserRouter>
//         <ToastContainer
//           position="top-center"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           toastClassName="toast-custom"
//           bodyClassName="body-custom"
//           progressClassName="progress-custom"
//         />
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route
//             path="/admin/*"
//             element={
//               <ProtectedRoute>
//                 <Admin />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPass />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
