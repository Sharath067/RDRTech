import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import couponService from "./coupon.service";
// import { useAuth } from "../AuthContexts/AuthContext";
import { NavLink } from "react-router-dom";
import "./Addcoupon.css";

const AddCoupon = ({ onAddCoupon }) => {
  // const { token } = useAuth();
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    rupees: "",
    expireDate: "",
    isActive: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('jwtToken');

  const validateField = (name, value) => {
    switch (name) {
      case "code":
        return value ? "" : "Code is required";
      case "description":
        return value ? "" : "Description is required";
      case "rupees":
        return value ? "" : "Rupees are required";
      case "expireDate":
        return value ? "" : "Expiration date is required";
      case "isActive":
        return value !== "" ? "" : "Coupon status is required";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "isActive" ? value === "true" : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        "http://54.152.49.191:8080/coupon/admin/getAllCoupons",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      couponService.updateCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const couponData = { ...formData };

      try {
        const response = await axios.post(
          "http://54.152.49.191:8080/coupon/save",
          couponData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Submitted Coupon Data:", response.data);

        if (onAddCoupon) {
          onAddCoupon(response.data);
        }

        await fetchCoupons();

        resetForm();
        toast.success("Coupon added successfully!");
        setIsModalOpen(false);
      } catch (error) {
        toast.error("Error creating coupon!");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      rupees: "",
      expireDate: "",
      isActive: "",
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      {/* <ToastContainer /> */}
      <NavLink
        to="#"
        className="btn btn-success navlink-custom"
        style={{ backgroundColor: "#00C851", border: "1px solid #00C851" }}
        onClick={() => setIsModalOpen(true)}
      >
        <span className="icon-plus">+</span>add new
      </NavLink>

      {isModalOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog w-25 modal-dialog-centered">
              <div className="modal-content">
                <div
                  className="modal-header text-white"
                  style={{ backgroundColor: "#00C851", position: "relative" }}
                >
                  <h4 className="modal-title">Create Coupon</h4>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      background: "none",
                      border: "none",
                      fontSize: "2.0rem",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <label className="form-label">Code :</label>
                      <input
                        type="text"
                        name="code"
                        placeholder="Enter code"
                        value={formData.code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.code ? "is-invalid" : ""
                        }`}
                      />
                      {errors.code && (
                        <div className="invalid-feedback">{errors.code}</div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Description :</label>
                      <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.description ? "is-invalid" : ""
                        }`}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Rupees :</label>
                      <input
                        type="number"
                        name="rupees"
                        placeholder="Enter rupees"
                        value={formData.rupees}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.rupees ? "is-invalid" : ""
                        }`}
                      />
                      {errors.rupees && (
                        <div className="invalid-feedback">{errors.rupees}</div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Expire Date :</label>
                      <input
                        type="date"
                        name="expireDate"
                        value={formData.expireDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`form-control ${
                          errors.expireDate ? "is-invalid" : ""
                        }`}
                      />
                      {errors.expireDate && (
                        <div className="invalid-feedback">
                          {errors.expireDate}
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Coupon Status :</label>
                      <div className="custom-select-wrapper">
                        <select
                          name="isActive"
                          value={formData.isActive}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`custom-select ${
                            errors.isActive ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select status</option>
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                        {errors.isActive && (
                          <div className="invalid-feedback">
                            {errors.isActive}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success w-25"
                      style={{
                        height: "40px",
                        marginLeft: "35%",
                        backgroundColor: "#00C851",
                        fontWeight: "bold",
                        border: "1px solid #00C851",
                      }}
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCoupon;
