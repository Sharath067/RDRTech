// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Setting.css";
// import Header from "../../components/Header/Header";
// import { useAuth } from "../AuthContexts/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import { Modal, Button, Form } from "react-bootstrap";

// const Setting = () => {
//   const { token } = useAuth();
//   const [faqs, setFaqs] = useState([]);
//   const [privacyPolicies, setPrivacyPolicies] = useState([]);
//   const [contactInfo, setContactInfo] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("FAQ");
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);

//   useEffect(() => {
//     fetchData();
//   });

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://54.152.49.191:8080/HelpAndSupport/all",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = response.data;
//       console.log("GET method response : ", response.data);

//       setFaqs(data.filter((item) => item.category === "FAQ"));
//       setPrivacyPolicies(
//         data.filter((item) => item.category === "PRIVACY_POLICY")
//       );
//       setContactInfo(data.filter((item) => item.category === "CONTACT_US"));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to load data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addItem = async () => {
//     try {
//       const newItem = {
//         question: newQuestion,
//         answer: newAnswer,
//         category: selectedCategory,
//       };
//       console.log("Sending new item:", newItem);
//       const response = await axios.post(
//         "http://54.152.49.191:8080/HelpAndSupport",
//         newItem,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Post method Response:", response);

//       // Add the new item to the relevant state
//       if (selectedCategory === "FAQ") {
//         setFaqs([...faqs, response.data]);
//       } else if (selectedCategory === "PRIVACY_POLICY") {
//         setPrivacyPolicies([...privacyPolicies, response.data]);
//       } else if (selectedCategory === "CONTACT_US") {
//         setContactInfo([...contactInfo, response.data]);
//       }

//       setNewQuestion("");
//       setNewAnswer("");
//       hidePopup();
//       toast.success("Item added successfully.");
//     } catch (error) {
//       console.error(
//         "Error adding item:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed to add item.");
//     }
//   };

//   const updateItem = async () => {
//     if (!editItem) return;
//     try {
//       const updatedItem = {
//         ...editItem,
//         question: newQuestion,
//         answer: newAnswer,
//       };

//       const response = await axios.put(
//         `http://54.152.49.191:8080/HelpAndSupport`,
//         updatedItem,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Update method Response:", response);

//       // Update the item in the relevant state
//       if (editItem.category === "FAQ") {
//         setFaqs(
//           faqs.map((item) => (item.id === editItem.id ? response.data : item))
//         );
//       } else if (editItem.category === "PRIVACY_POLICY") {
//         setPrivacyPolicies(
//           privacyPolicies.map((item) =>
//             item.id === editItem.id ? response.data : item
//           )
//         );
//       } else if (editItem.category === "CONTACT_US") {
//         setContactInfo(
//           contactInfo.map((item) =>
//             item.id === editItem.id ? response.data : item
//           )
//         );
//       }

//       setEditItem(null);
//       setNewQuestion("");
//       setNewAnswer("");
//       setIsEditPopupVisible(false);
//       toast.success("Item updated successfully.");
//     } catch (error) {
//       console.error(
//         "Error updating item:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed to update item.");
//     }
//   };

//   const deleteItem = async (id, category) => {
//     try {
//       await axios.delete(`http://54.152.49.191:8080/HelpAndSupport/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Remove the item from the relevant state
//       if (category === "FAQ") {
//         setFaqs(faqs.filter((item) => item.id !== id));
//       } else if (category === "PRIVACY_POLICY") {
//         setPrivacyPolicies(privacyPolicies.filter((item) => item.id !== id));
//       } else if (category === "CONTACT_US") {
//         setContactInfo(contactInfo.filter((item) => item.id !== id));
//       }
//       toast.success("Item deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       toast.error("Failed to delete item.");
//     }
//   };

//   const showPopup = () => setIsPopupVisible(true);
//   const hidePopup = () => setIsPopupVisible(false);

//   const showEditPopup = (item) => {
//     setEditItem(item);
//     setNewQuestion(item.question);
//     setNewAnswer(item.answer);
//     setSelectedCategory(item.category);
//     setIsEditPopupVisible(true);
//   };
//   const hideEditPopup = () => {
//     setEditItem(null);
//     setNewQuestion("");
//     setNewAnswer("");
//     setIsEditPopupVisible(false);
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

//   return (
//     <>
//       <Header />
//       <div className="settings-container">
//         <div className="addnew-button-container">
//           <button className="addnew-button" onClick={showPopup}>
//             + Add New
//           </button>
//         </div>

//         <Modal show={isPopupVisible} onHide={hidePopup}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add New Item</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="category">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="FAQ">FAQ</option>
//                   <option value="PRIVACY_POLICY">Privacy Policy</option>
//                   <option value="CONTACT_US">Contact Us</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group controlId="question">
//                 <Form.Label>Question</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="answer">
//                 <Form.Label>Answer</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={newAnswer}
//                   onChange={(e) => setNewAnswer(e.target.value)}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="primary"
//               onClick={addItem}
//               style={{
//                 background: "#00C851",
//                 color: "white",
//                 width: "100px",
//                 height: "40px",
//                 marginRight: "170px",
//               }}
//             >
//               Create
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={isEditPopupVisible} onHide={hideEditPopup}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Item</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group controlId="edit-category">
//                 <Form.Label>Category</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   <option value="FAQ">FAQ</option>
//                   <option value="PRIVACY_POLICY">Privacy Policy</option>
//                   <option value="CONTACT_US">Contact Us</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group controlId="edit-question">
//                 <Form.Label>Question</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                 />
//               </Form.Group>
//               <Form.Group controlId="edit-answer">
//                 <Form.Label>Answer</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   value={newAnswer}
//                   onChange={(e) => setNewAnswer(e.target.value)}
//                 />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="primary"
//               onClick={updateItem}
//               className="update-button"
//               style={{
//                 background: "#00C851",
//                 color: "white",
//                 width: "100px",
//                 height: "40px",
//                 marginRight: "170px",
//               }}
//             >
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         <details className="faq-section">
//           <summary>Help & Support</summary>
//           <div className="faq">
//             {faqs.map((faq) => (
//               <details key={faq.id}>
//                 <summary>{faq.question}</summary>
//                 <p>{faq.answer}</p>
//                 <div className="icon-container">
//                   <i
//                     className="fa fa-pencil edit-icon"
//                     aria-hidden="true"
//                     onClick={() => showEditPopup(faq)}
//                   ></i>
//                   <i
//                     className="fa fa-trash delete-icon"
//                     aria-hidden="true"
//                     onClick={() => deleteItem(faq.id, "FAQ")}
//                   ></i>
//                 </div>
//               </details>
//             ))}
//           </div>
//         </details>

//         <details className="privacy-policy-section">
//           <summary>Privacy Policies</summary>
//           <div className="privacy-policy">
//             {privacyPolicies.map((policy) => (
//               <details key={policy.id}>
//                 <summary>{policy.question}</summary>
//                 <p>{policy.answer}</p>
//                 <div className="icon-container">
//                   <i
//                     className="fa fa-pencil edit-icon"
//                     aria-hidden="true"
//                     onClick={() => showEditPopup(policy)}
//                   ></i>
//                   <i
//                     className="fa fa-trash delete-icon"
//                     aria-hidden="true"
//                     onClick={() => deleteItem(policy.id, "PRIVACY_POLICY")}
//                   ></i>
//                 </div>
//               </details>
//             ))}
//           </div>
//         </details>

//         <details className="contact-us-section">
//           <summary>Contact Us</summary>
//           <div className="contact-info">
//             {contactInfo.map((contact) => (
//               <details key={contact.id}>
//                 <summary>{contact.question}</summary>
//                 <p>{contact.answer}</p>
//                 <div className="icon-container">
//                   <i
//                     className="fa fa-pencil edit-icon"
//                     aria-hidden="true"
//                     onClick={() => showEditPopup(contact)}
//                   ></i>
//                   <i
//                     className="fa fa-trash delete-icon"
//                     aria-hidden="true"
//                     onClick={() => deleteItem(contact.id, "CONTACT_US")}
//                   ></i>
//                 </div>
//               </details>
//             ))}
//           </div>
//         </details>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default Setting;



import React from 'react'

const Setting = () => {
  return (
    <div>Setting</div>
  )
}

export default Setting