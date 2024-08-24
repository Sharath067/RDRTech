// import React, { useState, useEffect } from 'react';
// import './UpdateSubscriptionPlans';
// import { useAuth } from '../AuthContexts/AuthContext';
// import Header from '../../components/Header/Header';
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateSubscriptionPlans = () => {
//     const { token } = useAuth();
//     const navigate = useNavigate();
//     const { id } = useParams();

//     const [formData, setFormData] = useState({
//         planId: '',
//         planName: '',
//         planDescription: '',
//         planDuration: '',
//         planAmount: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const fetchPlanData = async () => {
//             if (id) {
//                 try {
//                     const response = await fetch(`http://54.152.49.191:8080/subscription/getAllPlans`, {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${token}`
//                         }
//                     });
//                     const data = await response.json();
//                     let temp = data.findIndex((val) => Number(val.id) === Number(id));
//                     if(temp !== -1) {
//                         setFormData({
//                             planId: data[temp].id,
//                             planName: data[temp].name,
//                             planDescription: data[temp].description,
//                             planDuration: data[temp].subscriptionDuration,
//                             planAmount: data[temp].subscriptionPlanAmount,
//                         });
//                     }
//                     setLoading(false);
//                 } catch (error) {
//                     setMessage('Failed to load plan data. Please try again.');
//                     console.error('Error:', error);
//                 }
//             }
//         };

//         fetchPlanData();
//     }, [id, token]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const postData = {
//             id: parseInt(formData.planId),
//             name: formData.planName,
//             description: formData.planDescription,
//             subscriptionDuration: parseInt(formData.planDuration),
//             subscriptionPlanAmount: parseFloat(formData.planAmount)
//         };

//         setLoading(true);
//         setMessage('');

//         try {
//             const response = await fetch('http://54.152.49.191:8080/subscription/save', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(postData)
//             });

//             const result = await response.json();
//             setMessage('Plan updated successfully!');
//             console.log('Success:', result);

//             setFormData({
//                 planId: '',
//                 planName: '',
//                 planDescription: '',
//                 planDuration: '',
//                 planAmount: ''
//             });
//         } catch (error) {
//             setMessage('Failed to update plan. Please try again.');
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="create-sub-container">
//                 <div className="back-arrow-container">
//                     <header className="back-arrow-1">
//                         <i
//                             className="fa fa-arrow-left fa-1x"
//                             aria-hidden="true"
//                             onClick={() => navigate(-1)}
//                         ></i>
//                     </header>
//                 </div>

//                 <div className="create-plan-container">
//                     <h1>Update Price Plan</h1>
//                     <p>This rate remains consistent when creating new plans or updating existing ones.</p>
//                     <form className="create-plan-form" onSubmit={handleSubmit}>
//                         <label>
//                             Plan Name
//                             <input type="text" name="planName" value={formData.planName} onChange={handleChange} />
//                         </label>
//                         <label>
//                             Plan Description
//                             <input type="text" name="planDescription" value={formData.planDescription} onChange={handleChange} />
//                         </label>
//                         <label>
//                             Plan Duration
//                             <input type="text" name="planDuration" value={formData.planDuration} onChange={handleChange} />
//                         </label>
//                         <label>
//                             Plan Amount
//                             <input type="text" name="planAmount" value={formData.planAmount} onChange={handleChange} />
//                         </label>
//                         <div className="form-buttons">
//                             <button type="submit" className="create-button" disabled={loading}>
//                                 {loading ? 'Updating...' : 'Update Plan'}
//                             </button>
//                         </div>
//                     </form>
//                     {message && <p className="form-message">{message}</p>}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default UpdateSubscriptionPlans;

import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContexts/AuthContext";
import Header from "../../components/Header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateSubscriptionPlans";

const UpdateSubscriptionPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    planId: "",
    planName: "",
    planDescription: "",
    planDuration: "",
    planAmount: "",
    numberOfProjects: "",
    numberOfEmployees: "",
    numberOfClients: "",
    isPlanActive: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPlanData = async () => {
      if (id) {
        try {
          const response = await fetch(
            `http://54.152.49.191:8080/subscription/admin/getAllPlans`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log("Upate subscription plan : ", data);
          let temp = data.findIndex((val) => Number(val.id) === Number(id));
          if (temp !== -1) {
            setFormData({
              planId: data[temp].id,
              planName: data[temp].name,
              planDescription: data[temp].description,
              planDuration: data[temp].subscriptionDuration,
              planAmount: data[temp].subscriptionPlanAmount,
              numberOfProjects: data[temp].numberOfProjects,
              numberOfEmployees: data[temp].numberOfEmployees,
              numberOfClients: data[temp].numberOfClients,
              isPlanActive: data[temp].isPlanActive,
            });
          }
        } catch (error) {
          toast.error("Failed to load plan data. Please try again.");
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlanData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isPlanActive" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      id: parseInt(formData.planId),
      name: formData.planName,
      description: formData.planDescription,
      subscriptionDuration: parseInt(formData.planDuration),
      subscriptionPlanAmount: parseFloat(formData.planAmount),
      numberOfProjects: parseInt(formData.numberOfProjects),
      numberOfEmployees: parseInt(formData.numberOfEmployees),
      numberOfClients: parseInt(formData.numberOfClients),
      isPlanActive: Boolean(formData.isPlanActive),
    };

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://54.152.49.191:8080/subscription/save",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Plan updated successfully!");
        setTimeout(() => {
          navigate("/admin/subscription");
        }, 1000);
        console.log(result);
      } else {
        const error = await response.json();
        toast.error(
          `Failed to update plan: ${error.message || "Please try again."}`
        );
      }
    } catch (error) {
      toast.error("Failed to update plan. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="create-container">
        <span>
          <Link to="/admin/subscription">
            <i
              className="fa fa-arrow-left fa-1x arrowLeft"
              aria-hidden="true"
            ></i>
          </Link>
        </span>
        <div className="create-sub-container">
          <div className="create-plan-container">
            <h1>Update Price Plan</h1>
            <p>
              This rate remains consistent when creating new plans or updating
              existing ones.
            </p>
            <form className="create-plan-form" onSubmit={handleSubmit}>
              <label>
                Plan Name
                <input
                  type="text"
                  name="planName"
                  value={formData.planName}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Projects
                <input
                  type="text"
                  name="numberOfProjects"
                  value={formData.numberOfProjects}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Employees
                <input
                  type="text"
                  name="numberOfEmployees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                />
              </label>
              <label>
                Number of Clients
                <input
                  type="text"
                  name="numberOfClients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Description
                <input
                  type="text"
                  name="planDescription"
                  value={formData.planDescription}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Duration
                <input
                  type="text"
                  name="planDuration"
                  value={formData.planDuration}
                  onChange={handleChange}
                />
              </label>
              <label>
                Plan Amount
                <input
                  type="text"
                  name="planAmount"
                  value={formData.planAmount}
                  onChange={handleChange}
                />
              </label>
              <label>Status</label>
              <select
                name="isPlanActive"
                value={formData.isPlanActive}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              <div className="form-buttons">
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Plan"}
                </button>
              </div>
            </form>
            {message && <p className="form-message">{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubscriptionPlans;
