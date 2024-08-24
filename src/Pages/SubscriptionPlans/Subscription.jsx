import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subscription.css";
import Header from "../../components/Header/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Subscription = () => {
  const { token } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://54.152.49.191:8080/subscription/admin/getAllPlans",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Updated response of subscription : ", response.data);
          setPlans(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchPlans();
  }, [token]);

  const handleCreatePlanClick = () => {
    navigate("/admin/subscription/creating-plans");
  };

  const handleEditPlanClick = (plan) => {
    navigate(`/admin/subscription/updating-plans/${plan.id}`);
  };

  if (loading) {
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

  if (error) {
    return <p>Error loading plans: {error.message}</p>;
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="header-component-back-button">
        <span className="back-arrow-2"></span>
        <NavLink
          to="/admin/subscription/creating-plans"
          className="create-plan-button1"
          onClick={handleCreatePlanClick}
        >
          <span className="create-plan-span">+</span>
          add new
        </NavLink>
      </div>
      <div className="main-container contain">
        <div className="contains">
          <div>
            <h1>Our Pricing Plans</h1>
            <p>
              To create a new pricing plan, start by selecting one of the
              following:
            </p>
          </div>
          <div className="plans">
            {plans.map((plan) => (
              <div className="plan" key={plan.id}>
                <div className="plan-name-container">
                  <h2 className="planName">{plan.name}</h2>
                </div>
                <p className="price">
                  &#8377;{plan.subscriptionPlanAmount}{" "}
                  <span>
                    {"/"}
                    {plan.subscriptionDuration} months
                  </span>
                </p>
                <div className="detailed-plans">
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      {plan.description}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Projects: {plan.numberOfProjects}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Employees: {plan.numberOfEmployees}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>Clients:{" "}
                      {plan.numberOfClients}
                    </p>
                  </div>
                  <div className="plan-detail">
                    <p>
                      <i className="fa fa-check" aria-hidden="true"></i>
                      Account: {plan.isPlanActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
                <div className="change-Plans">
                  <NavLink
                    to={`/admin/subscription/updating-plans/${plan.id}`}
                    className="editClick"
                    onClick={() => handleEditPlanClick(plan)}
                    data-tooltip="Edit Plan"
                  >
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      style={{ margin: "5px" }}
                    ></i>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Subscription.css";
// import Header from "../../components/Header/Header";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContexts/AuthContext";
// import { ToastContainer } from "react-toastify";
// import { Modal, Button, Form } from "react-bootstrap";
// import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Subscription = () => {
//   const { token } = useAuth();
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPlans = async () => {
//       if (token) {
//         try {
//           const response = await axios.get(
//             "http://54.152.49.191:8080/subscription/admin/getAllPlans",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setPlans(response.data);
//           setLoading(false);
//         } catch (err) {
//           setError(err);
//           setLoading(false);
//         }
//       }
//     };

//     fetchPlans();
//   }, [token]);

//   const handleCreatePlanClick = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleEditPlanClick = (plan) => {
//     navigate(`/admin/subscription/updating-plans/${plan.id}`);
//   };

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return <p>Error loading plans: {error.message}</p>;
//   }

//   return (
//     <>
//       <Header />
//       <ToastContainer />

//       {/* Button to open the modal */}
//       <div className="header-component-back-button">
//         <span className="back-arrow-2"></span>
//         <Button
//           variant="primary"
//           className="create-plan-button1"
//           onClick={handleCreatePlanClick}
//         >
//           <span className="create-plan-span">+</span> add new
//         </Button>
//       </div>

//       {/* Modal Component */}
//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Create a New Plan</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form className="create-plan-form">
//             <Form.Group controlId="formPlanName">
//               <Form.Label>Plan Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan name"
//                 // value={formData.planName}
//                 // onChange={handleChange}
//                 // isInvalid={errors.planName}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.planName}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formNumberOfProjects">
//               <Form.Label>Number of Projects</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter number of projects"
//                 // value={formData.numberOfProjects}
//                 // onChange={handleChange}
//                 // isInvalid={errors.numberOfProjects}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.numberOfProjects}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formNumberOfEmployees">
//               <Form.Label>Number of Employees</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter number of employees"
//                 // value={formData.numberOfEmployees}
//                 // onChange={handleChange}
//                 // isInvalid={errors.numberOfEmployees}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.numberOfEmployees}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formNumberOfClients">
//               <Form.Label>Number of Clients</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter number of clients"
//                 // value={formData.numberOfClients}
//                 // onChange={handleChange}
//                 // isInvalid={errors.numberOfClients}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.numberOfClients}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formPlanDescription">
//               <Form.Label>Plan Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan description"
//                 // value={formData.planDescription}
//                 // onChange={handleChange}
//                 // isInvalid={errors.planDescription}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.planDescription}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formPlanDuration">
//               <Form.Label>Plan Duration</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter plan duration"
//                 // value={formData.planDuration}
//                 // onChange={handleChange}
//                 // isInvalid={errors.planDuration}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.planDuration}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formPlanAmount">
//               <Form.Label>Plan Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter plan amount"
//                 // value={formData.planAmount}
//                 // onChange={handleChange}
//                 // isInvalid={errors.planAmount}
//               />
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.planAmount}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <Form.Group controlId="formPlanStatus">
//               <Form.Label>Account Status</Form.Label>
//               <Form.Control
//                 as="select"
//                 // value={formData.isPlanActive}
//                 // onChange={handleChange}
//               >
//                 <option value="">Select Status</option>
//                 <option value={true}>Active</option>
//                 <option value={false}>Inactive</option>
//               </Form.Control>
//               {/* <Form.Control.Feedback type="invalid">
//                 {errors.isPlanActive}
//               </Form.Control.Feedback> */}
//             </Form.Group>

//             <div className="form-buttons">
//               <Button
//                 type="submit"
//                 className="create-button"
//                 variant="primary"
//                 disabled={loading}
//               >
//                 {loading ? "Creating..." : "Create Plan"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//         {/* <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//         </Modal.Footer> */}
//       </Modal>

//       <div className="main-container contain">
//         <div className="contains">
//           <div>
//             <h1>Our Pricing Plans</h1>
//             <p>
//               To create a new pricing plan, start by selecting one of the
//               following:
//             </p>
//           </div>
//           <div className="plans">
//             {plans.map((plan) => (
//               <div className="plan" key={plan.id}>
//                 <div className="plan-name-container">
//                   <h2 className="planName">{plan.name}</h2>
//                 </div>
//                 <p className="price">
//                   &#8377;{plan.subscriptionPlanAmount}{" "}
//                   <span>
//                     {"/"}
//                     {plan.subscriptionDuration} months
//                   </span>
//                 </p>
//                 <div className="detailed-plans">
//                   <div className="plan-detail">
//                     <p>
//                       <i className="fa fa-check" aria-hidden="true"></i>
//                       {plan.description}
//                     </p>
//                   </div>
//                   <div className="plan-detail">
//                     <p>
//                       <i className="fa fa-check" aria-hidden="true"></i>
//                       Projects: {plan.numberOfProjects}
//                     </p>
//                   </div>
//                   <div className="plan-detail">
//                     <p>
//                       <i className="fa fa-check" aria-hidden="true"></i>
//                       Employees: {plan.numberOfEmployees}
//                     </p>
//                   </div>
//                   <div className="plan-detail">
//                     <p>
//                       <i className="fa fa-check" aria-hidden="true"></i>Clients:{" "}
//                       {plan.numberOfClients}
//                     </p>
//                   </div>
//                   <div className="plan-detail">
//                     <p>
//                       <i className="fa fa-check" aria-hidden="true"></i>
//                       Account: {plan.isPlanActive ? "Active" : "Inactive"}
//                     </p>
//                   </div>
//                 </div>
//                 {/* <div className="plan-buttons">
//                   <Button
//                     variant="warning"
//                     className="edit-button"
//                     onClick={() => handleEditPlanClick(plan)}
//                   >
//                     <i className="fa fa-pencil" aria-hidden="true"></i>
//                   </Button>
//                 </div> */}
//                 <div className="change-Plans">
//                   <NavLink
//                     to={`/admin/subscription/updating-plans/${plan.id}`}
//                     className="editClick"
//                     onClick={() => handleEditPlanClick(plan)}
//                     data-tooltip="Edit Plan"
//                   >
//                     <i
//                       className="fa fa-pencil"
//                       aria-hidden="true"
//                       style={{ margin: "5px" }}
//                     ></i>
//                   </NavLink>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Subscription;
