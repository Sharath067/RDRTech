import React, {useState, useEffect} from 'react';
import './PendingUsers.css';
import {FaSearch} from 'react-icons/fa';
import {NavLink, useNavigate} from 'react-router-dom';
// import { useAuth } from "../AuthContexts/AuthContext";
import Header from '../../components/Header/Header';
import viewData from '../../Assets/Images/eye-scanner.png';
import {getPendingUsers} from '../apiServices/apiServices';

const PendingUsers = () => {
  // const { token } = useAuth();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 5;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("jwtToken");
  //     console.log("Token in the Pending users: ", token);
  //     if (token) {
  //       try {
  //         const response = await fetch(
  //           "http://54.152.49.191:8080/admin/professionals/accountPending",
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         const result = await response.json();
  //         console.log("Fetched Result: ", result);
  //         setData(result);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwtToken');
      console.log('Token in the Pending users: ', token);
      if (token) {
        try {
          const result = await getPendingUsers(token);
          console.log('Fetched Result: ', result);
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []);

  const filterData = data.filter(
    item =>
      item.accountStatus === 'Pending' &&
      item.subscriptionStatus === 'Pending' &&
      (item.professionalName.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.emailId.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.phoneNumber.includes(searchItem) ||
        item.referenceNumber.includes(searchItem) ||
        item.companyName.toLowerCase().includes(searchItem.toLowerCase())),
  );

  console.log('Filtered Data: ', filterData);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.slice(startIndex, endIndex);

  console.log('Current Items: ', currentItems);

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleSearch = e => {
    setSearchItem(e.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}>
          {i}
        </button>,
      );
    }
    return pages;
  };

  const getStatusClass = (accountStatus, subscriptionStatus) => {
    if (
      accountStatus.toLowerCase() === 'pending' &&
      subscriptionStatus.toLowerCase() === 'pending'
    ) {
      return 'status-pending';
    } else {
      return 'status-approved';
    }
  };

  return (
    <>
      <Header />
      <div className="table-main-section">
        <div className="admin-customer-list">
          <div className="heading-section-tables">
            <span>
              <i
                className="fa fa-arrow-left fa-1x"
                aria-hidden="true"
                onClick={() => navigate(-1)}></i>
            </span>
            <h4 className="heading-name"> Pending user's List</h4>
          </div>
        </div>

        <div className="table-list-section">
          <div className="table-items-section"></div>
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
        <section className="table_body-1">
          <table>
            <thead>
              <tr>
                <th className="slno-1">Reference No</th>
                <th className="name-1">Name</th>
                <th className="email-1">Email</th>
                <th className="phone-1">Phone</th>
                <th className="company-1">Company Name</th>
                <th className="status-1">Status</th>
                <th className="subscription-1">Subscription</th>
                <th className="action-1">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                const referenceNumber = startIndex + index + 1;
                return (
                  <tr key={index}>
                    <td>{item.referenceNumber}</td>
                    <td>{item.professionalName || 'N/A'}</td>
                    <td>{item.emailId || 'N/A'}</td>
                    <td>{item.phoneNumber || 'N/A'}</td>
                    <td>{item.companyName || 'N/A'}</td>
                    <td>
                      <span
                        className={getStatusClass(
                          item.accountStatus,
                          item.subscriptionStatus,
                        )}>
                        {item.accountStatus || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={getStatusClass(
                          item.accountStatus,
                          item.subscriptionStatus,
                        )}>
                        {item.subscriptionStatus || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <NavLink
                        to={`viewcustomer/${item.professionalId}`}
                        state={{user: {professionalId: item.professionalId}}}
                        style={{paddingLeft: '15px'}}
                        className="nav-link">
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
              className="prev-next">
              &lt; <span>Previous</span>
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="prev-next">
              <span>Next</span> &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingUsers;
