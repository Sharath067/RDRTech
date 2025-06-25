import React, {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import {useAuth} from '../AuthContexts/AuthContext';
import {fetchPieChartData} from '../apiServices/apiServices';

const UserPieChart = () => {
  const {token} = useAuth();

  const [userData, setUserData] = useState({
    activeUsers: 0,
    accountApprovalPendingUsers: 0,
    subscriptionPendingUsers: 0,
    subscriptionExpiredUsers: 0,
  });

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem('jwtToken');
      console.log('Token from the pie chart:', token);

      if (token) {
        try {
          const data = await fetchPieChartData(token);
          const {
            activeUsers,
            accountApprovalPendingUsers,
            subscriptionPendingUsers,
            subscriptionExpiredUsers,
          } = data;

          setUserData({
            activeUsers,
            accountApprovalPendingUsers,
            subscriptionPendingUsers,
            subscriptionExpiredUsers,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    getUserData();
  }, [token]);

  const isEmptyData = Object.values(userData).every(count => count === 0);

  const data = {
    labels: [
      'Active Users',
      'Pending Users',
      'Approved Pending Users',
      'Subscription Renewal',
    ],
    datasets: [
      {
        data: isEmptyData
          ? [1, 1, 1, 1]
          : [
              userData.activeUsers,
              userData.accountApprovalPendingUsers,
              userData.subscriptionPendingUsers,
              userData.subscriptionExpiredUsers,
            ],
        backgroundColor: [
          'rgba(50,31,219, 0.8)',
          'rgba(51,153,255, 0.8)',
          'rgba(249,177,22, 0.8)',
          'rgba(229,83,82, 0.8)',
        ],
        borderColor: [
          'rgba(50,31,219, 1)',
          'rgba(51,153,255, 1)',
          'rgba(249,177,22, 1)',
          'rgba(229,83,82, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach(data => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + '%';
          return percentage;
        },
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div>
      <h2>User Distribution</h2>
      <div style={{width: '92%', height: '50%', display: 'flex'}}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default UserPieChart;
