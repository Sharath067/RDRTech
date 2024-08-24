import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import { FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import approveImage from "../../Assets/Images/verified.png";
import allmemberImage from "../../Assets/Images/group-of-men.png";
import pendingImage from "../../Assets/Images/wait.png";
import subscriptionImage from "../../Assets/Images/subscription (2).png";
import viewData from "../../Assets/Images/eye-scanner.png";
import { useAuth } from "../AuthContexts/AuthContext";

const Table = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState("all");
  const [showButtons, setShowButtons] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      if (token) {
        try {
          const res = await axios.get(
            `http://54.152.49.191:8080/admin/professionals`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch data");
        }
      }
    };
    getData();
  }, [token]);

  const filterData = data.filter((item) => {
    if (
      filterStatus === "all" ||
      (item.accountStatus &&
        item.accountStatus.toLowerCase() === filterStatus.toLowerCase())
    ) {
      return (
        (item.name &&
          item.name.toLowerCase().includes(searchItem.toLowerCase())) ||
        (item.emailId &&
          item.emailId.toLowerCase().includes(searchItem.toLowerCase())) ||
        (item.phoneNumber &&
          item.phoneNumber.toLowerCase().includes(searchItem.toLowerCase())) ||
        (item.companyName &&
          item.companyName.toLowerCase().includes(searchItem.toLowerCase()))
      );
    }
    return false;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "status-approved";
      case "pending":
        return "status-pending";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="table-main-section">
      <div className="admin-customer-list">
        <div className="heading-section-tables">
          <span>
            <i
              className="fa fa-arrow-left fa-1x"
              aria-hidden="true"
              onClick={() => navigate(-1)}
            ></i>
          </span>
          <h4 className="heading-name"> Admin Customer's List</h4>
        </div>
      </div>
      <div className="table-container">
        <div className="table-list-section">
          <div
            className={`table-items-section ${
              showButtons ? "show-buttons" : ""
            }`}
          >
            <button
              className={`buttons-for-tables ${
                activeButton === "all" ? "active" : ""
              }`}
              onClick={() => {
                handleFilterChange("all");
                setActiveButton("all");
              }}
            >
              <img
                src={allmemberImage}
                alt="approve"
                width="25px"
                height="25px"
              />
              All Members
            </button>
            <button
              className={`buttons-for-tables ${
                activeButton === "approved" ? "active" : ""
              }`}
              onClick={() => {
                handleFilterChange("approved");
                setActiveButton("approved");
              }}
            >
              <img
                src={approveImage}
                alt="approve"
                width="25px"
                height="25px"
              />
              Approved
            </button>
            <button
              className={`buttons-for-tables ${
                activeButton === "pending" ? "active" : ""
              }`}
              onClick={() => {
                handleFilterChange("pending");
                setActiveButton("pending");
              }}
            >
              <img
                src={pendingImage}
                alt="approve"
                width="25px"
                height="25px"
              />
              Pending
            </button>
            <button
              className={`buttons-for-tables ${
                activeButton === "inactive" ? "active" : ""
              }`}
              onClick={() => {
                handleFilterChange("inactive");
                setActiveButton("inactive");
              }}
            >
              <img
                src={subscriptionImage}
                alt="approve"
                width="25px"
                height="25px"
              />
              Sub renewal
            </button>

            {/* Vertical Ellipsis */}
            <div
              className="ellipsis-menu"
              onClick={() => setShowButtons(!showButtons)}
            >
              ⋮
            </div>
          </div>
          <div className="table-search-section">
            <div className="searching-sec">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search here"
                value={searchItem}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        <section className="table_body">
          <div className="table-scroll-container">
            <table>
              <thead>
                <tr>
                  <th className="slno">ID</th>
                  <th className="name">Name</th>
                  <th className="email">Email</th>
                  <th className="phone">Phone</th>
                  <th className="company">Company Name</th>
                  <th className="status">Status</th>
                  <th className="action">Details</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const serialNumber = startIndex + index + 1;
                  return (
                    <tr key={index}>
                      <td>{serialNumber}</td>
                      <td>{item.professionalName || "N/A"}</td>
                      <td>{item.emailId || "N/A"}</td>
                      <td>{item.phoneNumber || "N/A"}</td>
                      <td>{item.companyName || "N/A"}</td>
                      <td>
                        <span className={getStatusClass(item.accountStatus)}>
                          {item.accountStatus || "N/A"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          to={`viewcustomer/${item.professionaId}`}
                          state={{
                            user: { professionaId: item.professionaId },
                          }}
                          style={{ paddingLeft: "15px" }}
                        >
                          <img
                            src={viewData}
                            height="20px"
                            width="20px"
                            alt="view-data"
                          />
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <div className="pagination-section">
          <div className="pagination-pagecount">
            <span>
              Showing page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="prev-next"
            >
              &lt; <span>Previous</span>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="prev-next"
            >
              <span>Next</span> &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
