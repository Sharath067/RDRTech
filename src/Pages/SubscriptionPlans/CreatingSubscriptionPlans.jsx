import React, { useState } from "react";
import "./CreatingSubscriptionPlans.css";
import { useAuth } from "../AuthContexts/AuthContext";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatingSubscriptionPlans = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    planName: "",
    planDescription: "",
    planDuration: "",
    planAmount: "",
    numberOfProjects: "",
    numberOfEmployees: "",
    numberOfClients: "",
    isPlanActive: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      if (name !== "isPlanActive") {
        error = "Please enter the Account status";
      }
      error = `Please enter the ${name
        .replace("plan", "")
        .replace("numberOf", "")
        .toLowerCase()}`;
    } else if (
      (name === "planDuration" ||
        name === "planAmount" ||
        name.startsWith("numberOf")) &&
      isNaN(value)
    ) {
      error = `${name
        .replace("plan", "")
        .replace("numberOf", "")
        .replace(/([A-Z])/g, " $1")
        .toLowerCase()} must be a number`;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const submitPlan = async (postData) => {
    try {
      const response = await fetch(
        "http://54.152.49.191:8080/subscription/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      const result = await response.json();
      toast.success("Plan created successfully!");
      console.log("Success:", result);

      setFormData({
        planName: "",
        planDescription: "",
        planDuration: "",
        planAmount: "",
        numberOfProjects: "",
        numberOfEmployees: "",
        numberOfClients: "",
        isPlanActive: "",
      });
      setTimeout(() => {
        navigate("/admin/subscription");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create plan. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};

    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) {
        valid = false;
        newErrors[name] = error;
      }
    }

    setErrors(newErrors);

    if (!valid) {
      setMessage("Please correct the errors above");
      return;
    }

    const postData = {
      name: formData.planName,
      description: formData.planDescription,
      subscriptionDuration: parseInt(formData.planDuration),
      subscriptionPlanAmount: parseFloat(formData.planAmount),
      numberOfProjects: parseInt(formData.numberOfProjects),
      numberOfEmployees: parseInt(formData.numberOfEmployees),
      numberOfClients: parseInt(formData.numberOfClients),
      isPlanActive: formData.isPlanActive,
    };

    setLoading(true);
    setMessage("");
    await submitPlan(postData);
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
            <h1>Create Price Plan</h1>
            <p>Charge a flat rate per subscription, license, or membership.</p>
            <form className="create-plan-form" onSubmit={handleSubmit}>
              <label>
                Plan Name
                <input
                  type="text"
                  name="planName"
                  placeholder="Enter plan name"
                  value={formData.planName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planName && (
                  <span className="error">{errors.planName}</span>
                )}
              </label>
              <label>
                Number of Projects
                <input
                  type="text"
                  name="numberOfProjects"
                  placeholder="Enter number of projects"
                  value={formData.numberOfProjects}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfProjects && (
                  <span className="error">{errors.numberOfProjects}</span>
                )}
              </label>
              <label>
                Number of Employees
                <input
                  type="text"
                  name="numberOfEmployees"
                  placeholder="Enter number of employees"
                  value={formData.numberOfEmployees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfEmployees && (
                  <span className="error">{errors.numberOfEmployees}</span>
                )}
              </label>
              <label>
                Number of Clients
                <input
                  type="text"
                  name="numberOfClients"
                  placeholder="Enter number of clients"
                  value={formData.numberOfClients}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.numberOfClients && (
                  <span className="error">{errors.numberOfClients}</span>
                )}
              </label>
              <label>
                Plan Description
                <input
                  type="text"
                  name="planDescription"
                  placeholder="Enter plan description"
                  value={formData.planDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planDescription && (
                  <span className="error">{errors.planDescription}</span>
                )}
              </label>
              <label>
                Plan Duration
                <input
                  type="text"
                  name="planDuration"
                  placeholder="Enter plan duration"
                  value={formData.planDuration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planDuration && (
                  <span className="error">{errors.planDuration}</span>
                )}
              </label>
              <label>
                Plan Amount
                <input
                  type="text"
                  name="planAmount"
                  placeholder="Enter plan amount"
                  value={formData.planAmount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.planAmount && (
                  <span className="error">{errors.planAmount}</span>
                )}
              </label>
              <label>Account status</label>
              <select
                name="isPlanActive"
                value={formData.isPlanActive}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Status</option>
                <option value={true}>TRUE</option>
                <option value={false}>FALSE</option>
              </select>
              {errors.isPlanActive && (
                <span className="error left-aligned-error">
                  {errors.isPlanActive}
                </span>
              )}
              <div className="form-buttons">
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatingSubscriptionPlans;
