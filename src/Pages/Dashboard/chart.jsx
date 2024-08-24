// import React from "react";
// import { Bar } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// const activeUsersData = [100, 150, 200, 180, 220, 250, 200, 150, 100, 180, 200, 180];
// const inactiveUsersData = [20, 30, 40, 35, 45, 50, 35, 40, 45, 50, 20, 30];

// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       label: 'Active Users',
//       data: activeUsersData,
//       backgroundColor: 'rgba(50,255,50)',
//     },
//     {
//       label: 'Inactive Users',
//       data: inactiveUsersData,
//       backgroundColor: 'rgb(229,83,82)',
//     },
//   ],
// };

// const options = {
//   title: {
//     display: true,
//     text: 'Monthly Active vs Inactive Users',
//     fontSize: 20,
//   },
//   scales: {
//     y:
//       {
//         ticks: {
//           beginAtZero: true,
//           suggestedMax: 300,
//         },
//       },

//   },
// };

// export default function ChartBar() {
//   return (
//     <>
//       <h2>Monthly Active vs Inactive Users</h2>
//       <Bar data={data} options={options} style={{ width: '650px', height: '650px' }} />
//     </>
//   );
// }

import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const activeUsersData = [
  100, 150, 200, 180, 220, 250, 200, 150, 100, 180, 200, 180,
];
const inactiveUsersData = [20, 30, 40, 35, 45, 50, 35, 40, 45, 50, 20, 30];

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Active Users",
      data: activeUsersData,
      backgroundColor: "rgba(50,255,50)",
    },
    {
      label: "Inactive Users",
      data: inactiveUsersData,
      backgroundColor: "rgb(229,83,82)",
    },
  ],
};

const options = {
  title: {
    display: true,
    text: "Monthly Active vs Inactive Users",
    fontSize: 20,
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        suggestedMax: 300,
      },
    },
    x: {
      barPercentage: 0.3,
      categoryPercentage: 0.3,
    },
  },
  barThickness: 20,
};

export default function ChartBar() {
  return (
    <>
      <h2>Monthly Active vs Inactive Users</h2>
      <div style={{ width: "98%", height: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
