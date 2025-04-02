import axiosInstance from '../TokenExpire/TokenExpire';
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

export const fetchPendingUsers = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/professionals/subscriptionPending`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pending users:', error);
    throw error;
  }
};

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

export const fetchExpiredProfessionals = async () => {
  try {
    const response = await axiosInstance.get(
      `/admin/professionals/subscriptionExpiredProfessionals`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching expired professionals:', error);
    throw error;
  }
};

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
    return response.data;
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
};

export const fetchProfessionals = async () => {
  try {
    const response = await axiosInstance.get(`/admin/professionals`);
    console.log('response of the professionals', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching professionals:', error);
    throw error;
  }
};

export const createCoupon = async postData => {
  try {
    const response = await axiosInstance.post('/coupon/save', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

export const getAllCoupons = async () => {
  try {
    const response = await axiosInstance.get('/coupon/admin/getAllCoupons');
    return response.data;
  } catch (error) {
    console.error('Error fetching all coupons:', error);
    throw error;
  }
};

export const updateCoupon = async couponData => {
  try {
    const response = await axiosInstance.post('/coupon/save', couponData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error;
  }
};

export const fetchPlans = async () => {
  try {
    const response = await axiosInstance.get(
      '/admin/subscription/admin/getAllPlans',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const createSubscriptionPlan = async postData => {
  try {
    const response = await axiosInstance.post(
      '/admin/subscription/save',
      postData,
    );
    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.data.message.includes('already exists')
    ) {
      throw new Error('Duplicate plans cannot be created.');
    }
    throw error;
  }
};

export const getAllPlans = async () => {
  try {
    const response = await axiosInstance.get(
      '/admin/subscription/admin/getAllPlans',
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    throw error;
  }
};

export const updatePlan = async (token, postData) => {
  try {
    const response = await axiosInstance.put(
      '/admin/subscription/save',
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error updating plan:', error);
    throw error;
  }
};
