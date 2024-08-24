// import React, { useState, useEffect } from 'react';
// import './SubscriptionRenewal.css';
// import { FaSearch } from 'react-icons/fa';
// import { NavLink} from 'react-router-dom';
// import { useAuth } from '../AuthContexts/AuthContext'; 
// import Header from '../../components/Header/Header';


// const SubscriptionRenewal = () => {

//   const { token } = useAuth();

//   const [searchItem, setSearchItem] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]); 
//   const itemsPerPage = 5;

//   const today = new Date();
//   const oneWeekFromNow = new Date();
//   oneWeekFromNow.setDate(today.getDate() + 7);

//   useEffect(() => { 
//     const fetchData = async () => {
//      if(token){
//       try {
//         const response = await fetch('http://192.168.0.106:8080/admin/professionals/subscriptionExpiredProfessionals', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const result = await response.json();
//         console.log("Fetched Result: ", result); 
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//      }
//     };

//     fetchData();
//   }, [token]);

//   const filterData = data.filter((item) => 
//     item.accountStatus === 'Active' && item.subscriptionStatus === 'Active' &&
//     (item.professionalName.toLowerCase().includes(searchItem.toLowerCase()) ||
//      item.emailId.toLowerCase().includes(searchItem.toLowerCase()) ||
//      item.phoneNumber.includes(searchItem) ||
//      item.companyName.toLowerCase().includes(searchItem.toLowerCase()))
//   );

//   const isSubscriptionEndingSoon = endDate => {
//     const subscriptionEndDate = new Date(endDate);
//     return subscriptionEndDate <= oneWeekFromNow && subscriptionEndDate >= today;
//   };

//   console.log("Filtered Data: ", filterData); 
  
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = filterData.slice(startIndex, endIndex);

//   console.log("Current Items: ", currentItems); 
//   console.log("Start Index: ", startIndex); 
//   console.log("End Index: ", endIndex);  

//   const totalPages = Math.ceil(filterData.length / itemsPerPage);

//   const handlePageChange = newPage => {
//     setCurrentPage(newPage);
//   };

//   const handleSearch = (e) => {
//     setSearchItem(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       <Header />
//     <div className='table-main-section'>
//       <div className="admin-cutomer-list">
//         <div className="heading-section-tables">
//           <h2> Subscription renewal List</h2>
//         </div>
//         <div>
//           <button className='notify-all'>Notify all</button>
//         </div>
//       </div>

//       <div className="table-list-section">
//         <div className="table-items-section">
//           {/* <button className='buttons-for-tables' onClick={() => handleFilterChange('all')}>All Member</button>
//           <button className='buttons-for-tables1' onClick={() => handleFilterChange('approved')}>Approval</button>
//           <button className='buttons-for-tables2' onClick={() => handleFilterChange('pending')}>Request Pending</button>
//           <button className='buttons-for-tables3' onClick={() => handleFilterChange('canceled')}>Sub Renewal</button> */}
//         </div>
//         <div className="table-serach-section">
//           <div className='searching-sec'>
//             <FaSearch className='search-icon' />
//             <input
//               type="text"
//               placeholder='search here'
//               value={searchItem}
//               onChange={handleSearch}
//             />
//           </div>
//         </div>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Profile</th>
//             <th>Email / Phone</th>
//             <th>Company Name</th>
//             <th>Status</th>
//             <th>Subscription</th>
//             <th>Edit</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filterData.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <div className='profile-icon-section'>
//                   <div>
//                     <img src={require('../../Assets/Images/logo.jpg')} alt="" className='table-profile' />
//                   </div>
//                   <div>
//                     {/* <div>{item.professionaId}</div> */}
//                     <div>{item.professionalName}</div>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div>{item.emailId}</div>
//                 <div>{item.phoneNumber}</div>
//               </td>
//               <td>{item.companyName}</td>
//               <td>{item.accountStatus}</td>
//               <td>{item.subscriptionStatus}</td>
//               <td>
//                 {/* <NavLink to={`viewcustomer/${item.professionaId}`} state={{ user: { professionaId: item.professionaId } }}>
//                   <button className='table-view-button'>View</button>
//                 </NavLink> */}
//                 {isSubscriptionEndingSoon(item.subscriptionEndDate) && (
//                       <NavLink to="">
//                         <button className='notify'>Notify</button>
//                       </NavLink>
//                     )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className='pagination-section'>
//         <div className='pagination-pagecount'>
//           <span>Page {currentPage} of {totalPages}</span>
//         </div>
//         <div className='pagination-buttons'>
//           <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//             Previous
//           </button>
//           <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default SubscriptionRenewal;





import React, { useState, useEffect } from 'react';
import './SubscriptionRenewal.css';
import { FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContexts/AuthContext'; 
import Header from '../../components/Header/Header';
import viewData from "../../Assets/Images/eye-scanner.png";


const SubscriptionRenewal = () => {

  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const itemsPerPage = 5;

  const today = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(today.getDate() + 7);

  useEffect(() => { 
    const fetchData = async () => {
      if(token){
        try {
          const response = await fetch('http://54.152.49.191:8080/admin/professionals/subscriptionExpiredProfessionals', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const result = await response.json();
          console.log("Fetched Result: ", result); 
          setData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [token]);

  const filterData = data.filter((item) => 
    item.accountStatus === 'Active' && item.subscriptionStatus === 'Active' &&
    (item.professionalName.toLowerCase().includes(searchItem.toLowerCase()) ||
     item.emailId.toLowerCase().includes(searchItem.toLowerCase()) ||
     item.phoneNumber.includes(searchItem) ||
     item.companyName.toLowerCase().includes(searchItem.toLowerCase()))
  );

  // const isSubscriptionEndingSoon = endDate => {
  //   const subscriptionEndDate = new Date(endDate);
  //   return subscriptionEndDate <= oneWeekFromNow && subscriptionEndDate >= today;
  // };

  console.log("Filtered Data: ", filterData); 
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filterData.slice(startIndex, endIndex);

  console.log("Current Items: ", currentItems); 
  console.log("Start Index: ", startIndex); 
  console.log("End Index: ", endIndex);  

  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
    setCurrentPage(1);
  };

  const handleNotifyAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/emial/send/notifyAllByEmail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Notify all response : ",response);
      if (response.ok) {
        console.log('Notifications sent to all users.');
      } else {
        console.error('Failed to send notifications.');
      }
    } catch (error) {
      console.error('Error sending notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const getStatusClass = (status, type) => {
    if (type === 'account') {
      return 'status-approved';
    } else if (type === 'subscription') {
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
                onClick={() => navigate(-1)}
              ></i>
            </span>
            <h4 className="heading-name"> Subscription renewal List</h4>
          </div>
          <div className="notify-button-container">
            <button
              className="notify-all"
              onClick={handleNotifyAll}
              disabled={isLoading}
            >
              {isLoading ? "Notifying..." : "Notify All"}
            </button>
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
                <th className="slno-1">ID</th>
                <th className="name-1">Name</th>
                <th className="email-1">Email</th>
                <th className="phone-1">Phone</th>
                <th className="company-1">Company Name</th>
                <th className="status-1">Status</th>
                <th className="status-1">Subscription</th>
                <th className="action-1">Actions</th>
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
                      <span
                        className={getStatusClass(
                          item.accountStatus,
                          item.subscriptionStatus
                        )}
                      >
                        {item.accountStatus || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={getStatusClass(
                          item.accountStatus,
                          item.subscriptionStatus
                        )}
                      >
                        {item.subscriptionStatus || "N/A"}
                      </span>
                    </td>
                    <td>
                      <NavLink
                        to={`viewcustomer/${item.professionaId}`}
                        state={{ user: { professionaId: item.professionaId } }} style={{paddingLeft: '15px'}}
                      >
                      {/* <i className="fa fa-eye" aria-hidden="true"></i> */}
                      <img src={viewData} height="20px" width="20px" alt="view-data"  />
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
    </>
  );
};

export default SubscriptionRenewal;
