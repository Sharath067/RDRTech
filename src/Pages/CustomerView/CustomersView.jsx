// import React, { useState, useEffect } from 'react';
// import './CustomersView.css';
// import Header from '../../components/Header/Header';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuth } from '../AuthContexts/AuthContext';

// const CustomersView = () => {
//   const { token } = useAuth();
//   const { id } = useParams();
//   const [professional, setProfessional] = useState(null);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   useEffect(() => {
//     const fetchProfessionalData = async () => {
//       if (token) {
//         try {
//           const response = await axios.get(`http://54.152.49.191:8080/admin/professional/${id}`, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           setProfessional(response.data);
//           console.log("Response of the Customer view : ", response.data);
//           setDataLoaded(true);
//         } catch (error) {
//           console.error('Error fetching professional data:', error);
//         }
//       }
//     };
//     fetchProfessionalData();
//   }, [id, token]);

//   const handleApprove = async () => {
//     if (token) {
//       try {
//         const res = await axios.post(`http://54.152.49.191:8080/admin/active/${id}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log("Resposne when i click on the Approve button : ",res);
//         setProfessional({ ...professional, accountStatus: 'Approved' });
//       } catch (error) {
//         console.error('Error approving professional:', error);
//       }
//     }
//   };

//   // console.log("Handle Approve button : ",handleApprove);

//   const handleReject = async () => {
//     if (token) {
//       try {
//         await axios.post(`http://54.152.49.191:8080/admin/reject/${id}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setProfessional({ ...professional, accountStatus: 'Rejected' });
//       } catch (error) {
//         console.error('Error rejecting professional:', error);
//       }
//     }
//   };

//   if (!professional) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="view-customer-details-main">
//         <div className='view-customer-sub-section'>
//           <section className='profile-section-main'>
//             <h3 className='profile-heading'>My Profile</h3>
//             <div className="profile-section">
//               <div className="myprofile-section">
//                 <img src={professional?.imageS3SignedURL || require('../../Assets/Images/logo.jpg')} alt="Profile" />
//               </div>
//               <div className="profile-details">
//                 <label>Name: <strong>{professional?.name}</strong></label> <br />
//                 <label>Phone Number: <strong>{professional?.phoneNumber}</strong></label> <br />
//                 <label>Email: <strong>{professional?.professionalEmail}</strong></label>
//               </div>
//             </div>
//           </section>

//           <section className='company-details-section'>
//             <div className='company-details-sub-section'>
//               <section className='company-deatials-section-main'>
//                 <h4 className='company-details-section-heading'>Company Details</h4>
//                 <div className='company-details-section-1'>
//                   <div>
//                     <label className='labels-for-details'>Company</label> <br />
//                     <label>{professional?.companyName}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>Business Email</label> <br />
//                     <label>{professional?.companyEmail}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>Company Website</label> <br />
//                     <label>{professional?.websiteLink || 'N/A'}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>Social Media</label> <br />
//                     <label>{professional?.socialMediaLink || 'N/A'}</label>
//                   </div>
//                 </div>
//               </section>
//               <section className='company-deatials-section-main'>
//                 <h4 className='company-details-section-heading'>GST / PAN card Details</h4>
//                 <div className='company-details-section-1'>
//                   <div>
//                     <label className='labels-for-details'>GST Number</label> <br />
//                     <label>{professional?.gstNumber || 'N/A'}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>PAN Card</label> <br />
//                     <label>{professional?.panNumber || 'N/A'}</label>
//                     {/* {professional?.panCardS3SignedURL
//                     ? (
//                       <img src={professional.panCardS3SignedURL} alt="PAN Card" className='pan-adhar-image' />
//                     ) : (
//                       'N/A'
//                     )} */}
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </section>

//           <section className='company-details-section'>
//             <div className='company-details-sub-section'>
//               <section className='company-deatials-section-main'>
//                 <h4 className='company-details-section-heading'>Address</h4>
//                 <div className='company-details-section-1'>
//                   <div>
//                     <label className='labels-for-details'>Address</label> <br />
//                     <label>{professional?.address}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>City</label> <br />
//                     <label>{professional?.city}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>Country</label> <br />
//                     <label>{professional?.country}</label>
//                   </div>
//                   <div>
//                     <label className='labels-for-details'>Pincode</label> <br />
//                     <label>{professional?.pinCode}</label>
//                   </div>
//                 </div>
//               </section>
//               <section className='company-deatials-section-main'>
//                 <h4 className='company-details-section-heading'>GST / PAN card Details</h4>
//                 <div className='company-details-section-1'>
//                   <div style={{ paddingLeft: "20px" }}>
//                     <p>GST form</p>
//                     <a href={professional.gstFormS3SignedURL}><i className="fa fa-file-pdf-o fa-5x"></i></a>
//                   </div>
//                   <div>
//                     <p>Pan card</p>
//                     <a href={professional.panCardS3SignedURL}><i className="fa fa-file-pdf-o fa-5x"></i></a>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </section>

//           {professional.accountStatus === "Pending" && (
//             <section>
//               <div className="approve-button-section">
//                 <div>
//                   <button className='approve-button' onClick={handleApprove}>
//                     Approve
//                   </button>
//                 </div>
//                 <div>
//                   <button className='reject-button' onClick={handleReject}>
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             </section>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomersView;

// import React, { useState, useEffect } from 'react';
// import './CustomersView.css';
// import Header from '../../components/Header/Header';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../AuthContexts/AuthContext';

// const CustomersView = () => {
//   const { token } = useAuth();
//   const { id } = useParams();
//   const [professional, setProfessional] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfessionalData = async () => {
//       if (token) {
//         try {
//           const response = await axios.get(`http://54.152.49.191:8080/admin/professional/${id}`, {
//             headers: {
//               'Authorization': `Bearer ${token}`
//             }
//           });
//           setProfessional(response.data);
//           console.log("Response of the Customer view : ", response.data);
//         } catch (error) {
//           console.error('Error fetching professional data:', error);
//         }
//       }
//     };
//     fetchProfessionalData();
//   }, [id, token]);

//   const handleApprove = async () => {
//     if (token) {
//       try {
//         const res = await axios.post(`http://54.152.49.191:8080/admin/active/${id}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log("Resposne when i click on the Approve button : ",res);
//         setProfessional({ ...professional, accountStatus: 'Approved' });
//       } catch (error) {
//         console.error('Error approving professional:', error);
//       }
//     }
//   };

//   const handleReject = async () => {
//     if (token) {
//       try {
//         await axios.post(`http://54.152.49.191:8080/admin/reject/${id}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         setProfessional({ ...professional, accountStatus: 'Rejected' });
//       } catch (error) {
//         console.error('Error rejecting professional:', error);
//       }
//     }
//   };

//   if (!professional) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="view-customer-details-main">
//         <div className='view-customer-sub-section'>
//         <span> <i
//               className="fa fa-arrow-left fa-1x"
//               aria-hidden="true"
//               onClick={() => navigate(-1)}
//               ></i>
//           </span>
//           <div className='profile-company-section'>
//             <section className='profile-section-main'>
//               <h3 className='profile-heading'>My Profile</h3>
//               <div className="profile-section">
//                 <div className="myprofile-section">
//                   <img src={professional?.imageS3SignedURL || require('../../Assets/Images/logo.jpg')} alt="Profile" />
//                 </div>
//                 <div className="profile-details">
//                   <label>Name: <strong>{professional?.name}</strong></label> <br />
//                   <label>Phone Number: <strong>{professional?.phoneNumber}</strong></label> <br />
//                   <label>Email: <strong>{professional?.professionalEmail}</strong></label>
//                 </div>
//               </div>
//             </section>
//             <section className='company-details-section-main'>
//               <h4 className='company-details-section-heading'>Company Details</h4>
//               <div className='company-details-section-1'>
//                 <div>
//                   <label className='labels-for-details'>Company</label> <br />
//                   <label>{professional?.companyName}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>Business Email</label> <br />
//                   <label>{professional?.companyEmail}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>Company Website</label> <br />
//                   <label>{professional?.websiteLink || 'N/A'}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>Social Media</label> <br />
//                   <label>{professional?.socialMediaLink || 'N/A'}</label>
//                 </div>
//               </div>
//             </section>
//           </div>

//           <div className='address-gst-section'>
//             <section className='company-details-section-main'>
//               <h4 className='company-details-section-heading'>Address</h4>
//               <div className='company-details-section-1'>
//                 <div>
//                   <label className='labels-for-details'>Address</label> <br />
//                   <label>{professional?.address}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>City</label> <br />
//                   <label>{professional?.city}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>Country</label> <br />
//                   <label>{professional?.country}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>Pincode</label> <br />
//                   <label>{professional?.pinCode}</label>
//                 </div>
//               </div>
//             </section>
//             <section className='company-details-section-main'>
//               <h4 className='company-details-section-heading'>GST / PAN card Details</h4>
//               <div className='company-details-section-1'>
//                 <div>
//                   <label className='labels-for-details'>GST Number</label> <br />
//                   <label>{professional?.gstNumber || 'N/A'}</label>
//                 </div>
//                 <div>
//                   <label className='labels-for-details'>PAN Card</label> <br />
//                   <label>{professional?.panNumber || 'N/A'}</label>
//                 </div>
//               </div>
//             </section>
//           </div>

//           <div className='documents-section'>
//             <section className='company-details-section-main'>
//               <h4 className='company-details-section-heading'>GST / PAN card Documents</h4>
//               <div className='company-details-section-1'>
//                 <div >
//                   <p>GST form</p>
//                   <a href={professional.gstFormS3SignedURL}><i className="fa fa-file-pdf-o fa-5x"></i></a>
//                 </div>
//                 <div>
//                   <p>Pan card</p>
//                   <a href={professional.panCardS3SignedURL}><i className="fa fa-file-pdf-o fa-5x"></i></a>
//                 </div>
//               </div>
//             </section>
//             <section className='company-details-section-main-buttons'>
//               {professional.accountStatus === "Pending" && (
//               <div className='approve-button-section'>
//                 <button className='approve-button' onClick={handleApprove}>Approve</button>
//                 <button className='reject-button' onClick={handleReject}>Reject</button>
//               </div>
//               )}
//             </section>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default CustomersView;

import React, { useState, useEffect } from "react";
import "./CustomersView.css";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContexts/AuthContext";

const CustomersView = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [gstDownloaded, setGstDownloaded] = useState(false);
  const [panDownloaded, setPanDownloaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionalData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `http://54.152.49.191:8080/admin/professional/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfessional(response.data);
          console.log("Response of the Customer view : ", response.data);
        } catch (error) {
          console.error("Error fetching professional data:", error);
        }
      }
    };
    fetchProfessionalData();
  }, [id, token]);

  const handleApprove = async () => {
    if (token) {
      try {
        const res = await axios.post(
          `http://54.152.49.191:8080/admin/active/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response when clicking the Approve button : ", res);
        setProfessional({ ...professional, accountStatus: "Approved" });
      } catch (error) {
        console.error("Error approving professional:", error);
      }
    }
  };

  const handleReject = async () => {
    if (token) {
      try {
        await axios.post(
          `http://54.152.49.191:8080/admin/reject/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfessional({ ...professional, accountStatus: "Rejected" });
      } catch (error) {
        console.error("Error rejecting professional:", error);
      }
    }
  };

  const handleGstDownload = () => {
    setGstDownloaded(true);
  };

  const handlePanDownload = () => {
    setPanDownloaded(true);
  };

  if (!professional) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="view-customer-details-main">
        <div className="view-customer-sub-section">
          <span>
            <i
              className="fa fa-arrow-left fa-1x arrLeft-1"
              aria-hidden="true"
              onClick={() => navigate(-1)}
            ></i>
          </span>
          <div className="profile-company-section">
            <section className="profile-section-main">
              <h3 className="profile-heading">My Profile</h3>
              <div className="profile-section">
                <div className="myprofile-section">
                  <img
                    src={
                      professional?.imageS3SignedURL ||
                      require("../../Assets/Images/logo.jpg")
                    }
                    alt="Profile"
                  />
                </div>
                <div className="profile-details">
                  <label>
                    Name: <strong>{professional?.name}</strong>
                  </label>{" "}
                  <br />
                  <label>
                    Phone Number: <strong>{professional?.phoneNumber}</strong>
                  </label>{" "}
                  <br />
                  <label>
                    Email: <strong>{professional?.professionalEmail}</strong>
                  </label>
                </div>
              </div>
            </section>
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">
                Company Details
              </h4>
              <div className="company-details-section-1">
                <div>
                  <label className="labels-for-details">Company</label> <br />
                  <label>{professional?.companyName}</label>
                </div>
                <div>
                  <label className="labels-for-details">Business Email</label>{" "}
                  <br />
                  <label>{professional?.companyEmail}</label>
                </div>
                <div>
                  <label className="labels-for-details">Company Website</label>{" "}
                  <br />
                  <label>{professional?.websiteLink || "N/A"}</label>
                </div>
                <div>
                  <label className="labels-for-details">Social Media</label>{" "}
                  <br />
                  <label>{professional?.socialMediaLink || "N/A"}</label>
                </div>
              </div>
            </section>
          </div>

          <div className="address-gst-section">
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">Address</h4>
              <div className="company-details-section-1">
                <div>
                  <label className="labels-for-details">Address</label> <br />
                  <label>{professional?.address}</label>
                </div>
                <div>
                  <label className="labels-for-details">City</label> <br />
                  <label>{professional?.city}</label>
                </div>
                <div>
                  <label className="labels-for-details">Country</label> <br />
                  <label>{professional?.country}</label>
                </div>
                <div>
                  <label className="labels-for-details">Pincode</label> <br />
                  <label>{professional?.pinCode}</label>
                </div>
              </div>
            </section>
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">
                GST / PAN card Details
              </h4>
              <div className="company-details-section-1">
                <div>
                  <label className="labels-for-details">GST Number</label>{" "}
                  <br />
                  <label>{professional?.gstNumber || "N/A"}</label>
                </div>
                <div>
                  <label className="labels-for-details">PAN Card</label> <br />
                  <label>{professional?.panNumber || "N/A"}</label>
                </div>
              </div>
            </section>
          </div>

          <div className="documents-section">
            <section className="company-details-section-main">
              <h4 className="company-details-section-heading">
                GST / PAN card Documents
              </h4>
              <div className="company-details-section-1">
                <div>
                  <p>GST form</p>
                  {!gstDownloaded ? (
                    <a
                      href={professional.gstFormS3SignedURL}
                      onClick={handleGstDownload}
                    >
                      <i className="fa fa-file-pdf-o fa-5x"></i>
                    </a>
                  ) : (
                    <p>
                      Downloaded
                      <i className="fa fa-ban fa-5x" aria-hidden="true"></i>
                    </p>
                  )}
                </div>
                <div>
                  <p>Pan card</p>
                  {!panDownloaded ? (
                    <a
                      href={professional.panCardS3SignedURL}
                      onClick={handlePanDownload}
                    >
                      <i className="fa fa-file-pdf-o fa-5x"></i>
                    </a>
                  ) : (
                    <p>
                      Downloaded
                      <i className="fa fa-ban fa-5x" aria-hidden="true"></i>
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className="company-details-section-main-buttons">
              {professional.accountStatus === "Pending" && (
                <div className="approve-button-section">
                  <button className="approve-button" onClick={handleApprove}>
                    Approve
                  </button>
                  <button className="reject-button" onClick={handleReject}>
                    Reject
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomersView;
