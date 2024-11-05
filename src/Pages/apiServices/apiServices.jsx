import axios from 'axios';
import axiosInstance from '../TokenExpire/TokenExpire';

// port of the website
const BASE_URL = 'http://54.152.49.191:8080';

//JWT Token
const token = localStorage.getItem('jwtToken');

// Dashboard
// export const fetchDashboardData = async () => {
//   const token = localStorage.getItem("jwtToken");
//     if (token) {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/dashboard`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();
//         return {
//           activeUsers: result.activeUsers,
//           accountApprovalPendingUsers: result.accountApprovalPendingUsers,
//           subscriptionPendingUsers: result.subscriptionPendingUsers,
//           subscriptionExpiredUsers: result.subscriptionExpiredUsers,
//         };
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         throw error;
//       }
//     } else {
//       throw new Error("No token found");
//     }
//   };

// Fetch Dashboard Data
export const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard');
    const result = response.data;
    return {
      activeUsers: result.activeUsers,
      accountApprovalPendingUsers: result.accountApprovalPendingUsers,
      subscriptionPendingUsers: result.subscriptionPendingUsers,
      subscriptionExpiredUsers: result.subscriptionExpiredUsers,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// pie chat
// export const fetchPieChartData = async (token) => {
//     try {
//       const response = await fetch(`${BASE_URL}/admin/dashboard`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         console.error("Failed to fetch user data. Status:", response.status);
//         throw new Error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//       throw error;
//     }
//   };

// Fetch Pie Chart Data
export const fetchPieChartData = async () => {
  try {
    const response = await axiosInstance.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    throw error;
  }
};

// Active user's component
// export const fetchActiveUsers = async (token) => {
//     try {
//       const response = await fetch(`${BASE_URL}/admin/professionals/active`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         return result;
//       } else {
//         console.error("Failed to fetch data. Status:", response.status);
//         return [];
//       }
//     } catch (error) {
//       console.error("Error fetching active users:", error);
//       return [];
//     }
//   };

// Fetch Active Users
export const fetchActiveUsers = async () => {
  try {
    const response = await axiosInstance.get('/admin/professionals/active');
    return response.data;
  } catch (error) {
    console.error('Error fetching active users:', error);
    return [];
  }
};

// Pending users's component
// export const getPendingUsers = async (token) => {
//     const response = await fetch(
//       `${BASE_URL}/admin/professionals/accountPending`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch pending users");
//     }

//     return await response.json();
//   };

// Fetch Pending Users
export const getPendingUsers = async () => {
  try {
    const response = await axiosInstance.get(
      '/admin/professionals/accountPending',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pending users:', error);
    throw error;
  }
};

// Approved pending user's component
// export const fetchPendingUsers = async (token) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/admin/professionals/subscriptionPending`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching pending users:", error);
//     throw error;
//   }
// };

export const fetchPendingUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/professionals/subscriptionPending`,
    );
    return response.data; // Return the response data (parsed JSON)
  } catch (error) {
    console.error('Error fetching pending users:', error);
    throw error; // Re-throw error to handle it in calling code if needed
  }
};

// Approved pending user's notify to all who are not subscribed
// export const notifyAllPendingUsers = async (token) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/email/notifyAllSubscriptionPendingUsers`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to send notifications.");
//     }

//     return response;
//   } catch (error) {
//     console.error("Error sending notifications:", error);
//     throw error;
//   }
// };

// Notify All Subscription Pending Users
export const notifyAllPendingUsers = async () => {
  try {
    const response = await axiosInstance.post(
      '/api/email/notifyAllSubscriptionPendingUsers',
    );
    return response.data;
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

// Subscription Renewal component
// export const fetchExpiredProfessionals = async (token) => {
//   try {
//     const response = await fetch(`${BASE_URL}/admin/professionals/subscriptionExpiredProfessionals`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching expired professionals:', error);
//     throw error; // Re-throw error for further handling
//   }
// };

export const fetchExpiredProfessionals = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/professionals/subscriptionExpiredProfessionals`,
    );
    return response.data; // Return the parsed JSON response
  } catch (error) {
    console.error('Error fetching expired professionals:', error);
    throw error; // Re-throw error for further handling
  }
};

//subscription renewal expired user's
// export const notifyAllSubscriptionExpiredUsers = async (token) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/email/notifyAllSubscriptionExpiredUsers`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send notifications');
//     }

//     return await response.json(); // Optionally return the response data
//   } catch (error) {
//     console.error('Error sending notifications:', error);
//     throw error; // Re-throw error for further handling
//   }
// };

export const notifyAllSubscriptionExpiredUsers = async () => {
  try {
    const response = await axiosInstance.post(
      `/api/email/notifyAllSubscriptionExpiredUsers`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the parsed JSON response
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error; // Re-throw error for further handling
  }
};

// All Professional's data
// export const fetchProfessionals = async (token) => {
//   if (!token) {
//     throw new Error("No token provided");
//   }

//   const response = await axios.get(`${BASE_URL}/admin/professionals`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };

export const fetchProfessionals = async () => {
  try {
    const response = await axiosInstance.get(`/admin/professionals`);
    return response.data; // Return the parsed JSON response
  } catch (error) {
    console.error('Error fetching professionals:', error);
    throw error; // Re-throw error for further handling
  }
};

// Coupon's component
// Creating the Coupons
// export const createCoupon = async (postData, token) => {
//   const response = await fetch(`${BASE_URL}/coupon/save`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//     body: JSON.stringify(postData),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to create coupon');
//   }

//   return await response.json();
// };

export const createCoupon = async postData => {
  try {
    const response = await axiosInstance.post('/coupon/save', postData);
    return response.data; // Return the parsed JSON response
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error; // Re-throw error for further handling
  }
};

// getting all the  Coupon's
// export const getAllCoupons = async (token) => {
//   if (!token) {
//     throw new Error("No token provided");
//   }

//   const response = await axios.get(`${BASE_URL}/coupon/admin/getAllCoupons`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return response.data;
// };

export const getAllCoupons = async () => {
  try {
    const response = await axiosInstance.get('/coupon/admin/getAllCoupons');
    return response.data;
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    throw error; // Re-throw error for further handling
  }
};

// updating all the Coupon's
// export const updateCoupon = async (token, couponData) => {
//   if (!token) {
//     throw new Error("No token provided");
//   }

//   const response = await axios.post(`${BASE_URL}/coupon/save`, couponData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   return response.data; // Return the created coupon data
// };

export const updateCoupon = async couponData => {
  try {
    const response = await axiosInstance.post('/coupon/save', couponData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the updated coupon data
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error; // Re-throw error for further handling
  }
};

// Getting all the subscription plans
// export const fetchPlans = async (token) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/subscription/admin/getAllPlans`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

export const fetchPlans = async () => {
  try {
    const response = await axiosInstance.get('/subscription/admin/getAllPlans');
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

// Creating the Subscriptions plans
// export const createSubscriptionPlan = async (postData) => {
//   console.log("Token in the creating subscription plan :", token);
//     const response = await fetch(`${BASE_URL}/subscription/save`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(postData),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to create plan');
//     }

//     return await response.json();
//   };

export const createSubscriptionPlan = async postData => {
  try {
    const response = await axiosInstance.post('/subscription/save', postData);
    return response.data; // Return the created plan data
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
};

//Updating the subscription plans
// just getting the data to show predefined data
// export const getAllPlans = async (token) => {
//   const response = await fetch(`${BASE_URL}/subscription/admin/getAllPlans`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch plans");
//   }
//   return response.json();
// };

export const getAllPlans = async () => {
  try {
    const response = await axiosInstance.get('/subscription/admin/getAllPlans');
    return response.data; // Return the fetched plans data
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

// Updating the subscription plan's
// export const updatePlan = async (token, postData) => {
//   const response = await fetch(`${BASE_URL}/subscription/save`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(postData),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to update plan");
//   }
//   return response.json();
// };

export const updatePlan = async (token, postData) => {
  try {
    const response = await axiosInstance.put('/subscription/save', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return the updated plan data
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};
