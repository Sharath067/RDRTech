// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chartjs-plugin-datalabels';

// const UserPieChart = () => {
//   const data = {
//     labels: ['Active Users', 'Pending Users', 'Subscription Pending', 'Subscription Renewal'],
//     datasets: [
//       {
//         data: [400, 150, 250, 150], // Sample data for each user category
//         backgroundColor: [
//           'rgba(50,31,219, 0.8)',
//           'rgba(51,153,255, 0.8)',
//           'rgba(249,177,22, 0.8)',
//           'rgba(229,83,82, 0.8)',
//         ],
//         borderColor: [
//           'rgba(50,31,219, 1)',
//           'rgba(51,153,255, 1)',
//           'rgba(249,177,22, 1)',
//           'rgba(229,83,82, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: true,
//         position: 'right',
//       },
//       datalabels: {
//         color: '#fff', // Color of the data values
//         formatter: (value, context) => {
//           let sum = 0;
//           let dataArr = context.chart.data.datasets[0].data;
//           dataArr.map(data => {
//             sum += data;
//           });
//           let percentage = ((value * 100) / sum).toFixed(2) + '%';
//           return percentage; // Display the data value in percentage
//         },
//         font: {
//           weight: 'bold',
//         }
//       }
//     }
//   };

//   return (
//     <div  style={{ width: '500px', height: '400px' }}>
//       <h2>User Distribution</h2>
//       <Pie data={data} options={options} />
//     </div>
//   );
// };

// export default UserPieChart;

import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import axios from "axios";
import { useAuth } from "../AuthContexts/AuthContext";

const UserPieChart = () => {
  const { token } = useAuth();

  const [userData, setUserData] = useState({
    activeUsers: 0,
    accountApprovalPendingUsers: 0,
    subscriptionPendingUsers: 0,
    subscriptionExpiredUsers: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://54.152.49.191:8080/admin/dashboard",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const {
            activeUsers,
            accountApprovalPendingUsers,
            subscriptionPendingUsers,
            subscriptionExpiredUsers,
          } = response.data;
          setUserData({
            activeUsers,
            accountApprovalPendingUsers,
            subscriptionPendingUsers,
            subscriptionExpiredUsers,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [token]);

  const isEmptyData = Object.values(userData).every((count) => count === 0);

  const data = {
    labels: [
      "Active Users",
      "Pending Users",
      "Approved Pending Users",
      "Subscription Renewal",
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
          "rgba(50,31,219, 0.8)",
          "rgba(51,153,255, 0.8)",
          "rgba(249,177,22, 0.8)",
          "rgba(229,83,82, 0.8)",
        ],
        borderColor: [
          "rgba(50,31,219, 1)",
          "rgba(51,153,255, 1)",
          "rgba(249,177,22, 1)",
          "rgba(229,83,82, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      datalabels: {
        color: "#fff",
        formatter: (value, context) => {
          let sum = 0;
          let dataArr = context.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        font: {
          weight: "bold",
        },
      },
    },
  };

  return (
    <div>
      <h2>User Distribution</h2>
      <div style={{ width: "92%", height: "50%", display: "flex" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
export default UserPieChart;
