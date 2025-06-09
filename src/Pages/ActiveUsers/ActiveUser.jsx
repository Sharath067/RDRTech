import React, {useState, useEffect} from 'react';
import './ActiveUser.css';
import {FaSearch} from 'react-icons/fa';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContexts/AuthContext';
import Header from '../../components/Header/Header';
import viewData from '../../Assets/Images/eye-scanner.png';
import {fetchActiveUsers} from '../apiServices/apiServices';

const ActiveUser = () => {
  const {token} = useAuth();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadActiveUsers = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const result = await fetchActiveUsers(token);
        console.log('Fetched Active Users: ', result);
        console.log('Token from the active user : ', token);
        setData(result);
      }
    };

    loadActiveUsers();
  }, [token]);

  const filterData = data.filter(
    item =>
      item.accountStatus.toLowerCase() === 'active' &&
      item.subscriptionStatus.toLowerCase() === 'active' &&
      (item.professionalName.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.emailId.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.phoneNumber.includes(searchItem) ||
        item.referenceNumber.includes(searchItem) ||
        item.companyName.toLowerCase().includes(searchItem.toLowerCase())),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.slice(startIndex, endIndex);

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
      accountStatus.toLowerCase() === 'active' &&
      subscriptionStatus.toLowerCase() === 'active'
    ) {
      return 'status-approved';
    } else {
      return 'status-pending';
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
            <h4 className="heading-name"> Active User's List</h4>
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
          <div className="table-scroll-container">
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
                          state={{
                            user: {professionalId: item.professionalId},
                          }}
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

export default ActiveUser;
