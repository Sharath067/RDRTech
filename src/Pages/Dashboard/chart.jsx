// import React from 'react';
// import {Bar} from 'react-chartjs-2';
// import Chart from 'chart.js/auto';

// const activeUsersData = [
//   100, 150, 200, 180, 220, 250, 200, 150, 100, 180, 200, 180,
// ];
// const inactiveUsersData = [20, 30, 40, 35, 45, 50, 35, 40, 45, 50, 20, 30];

// const data = {
//   labels: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ],
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
//     y: {
//       ticks: {
//         beginAtZero: true,
//         suggestedMax: 300,
//       },
//     },
//     x: {
//       barPercentage: 0.3,
//       categoryPercentage: 0.3,
//     },
//   },
//   barThickness: 20,
// };

// export default function ChartBar() {
//   return (
//     <>
//       <h2>Monthly Active vs Inactive Users</h2>
//       <div style={{width: '98%', height: '100%'}}>
//         <Bar data={data} options={options} />
//       </div>
//     </>
//   );
// }

import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
  fetchMonthlySubscriptionStats,
  fetchDailySubscriptionStats,
} from '../apiServices/apiServices';

const ChartBar = () => {
  // Monthly data state
  const [monthlyActive, setMonthlyActive] = useState([]);
  const [monthlyExpired, setMonthlyExpired] = useState([]);

  // Daily data state
  const [dailyActive, setDailyActive] = useState([]);
  const [dailyExpired, setDailyExpired] = useState([]);

  // View control state
  const [viewType, setViewType] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [loading, setLoading] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Load monthly data
  const loadMonthlyData = async () => {
    try {
      setLoading(true);
      const data = await fetchMonthlySubscriptionStats(currentYear);
      console.log('Monthly API Response:', data);

      const activeArray = new Array(12).fill(0);
      const expiredArray = new Array(12).fill(0);

      Object.entries(data.activeUsers || {}).forEach(([month, count]) => {
        activeArray[month - 1] = count;
      });

      Object.entries(data.expiredUsers || {}).forEach(([month, count]) => {
        expiredArray[month - 1] = count;
      });

      setMonthlyActive(activeArray);
      setMonthlyExpired(expiredArray);
    } catch (err) {
      console.error('Error loading monthly data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load daily data
  const loadDailyData = async (year, month) => {
    try {
      setLoading(true);
      const data = await fetchDailySubscriptionStats(year, month);
      console.log('Daily API Response:', data);

      setDailyActive(data.dailyActiveUsers || []);
      setDailyExpired(data.dailyExpiredUsers || []);
    } catch (err) {
      console.error('Error loading daily data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate day labels for the selected month
  const getDayLabels = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
  };

  // Load initial monthly data
  useEffect(() => {
    loadMonthlyData();
  }, [currentYear]);

  // Load daily data when switching to daily view or changing month/year
  useEffect(() => {
    if (viewType === 'daily') {
      loadDailyData(selectedYear, selectedMonth);
    }
  }, [viewType, selectedYear, selectedMonth]);

  // Handle view type change
  const handleViewChange = newViewType => {
    setViewType(newViewType);
  };

  // Handle month/year change for daily view
  const handleDateChange = (type, value) => {
    if (type === 'month') {
      setSelectedMonth(parseInt(value));
    } else if (type === 'year') {
      setSelectedYear(parseInt(value));
    }
  };

  // Prepare chart data based on current view
  const getChartData = () => {
    if (viewType === 'monthly') {
      return {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'Active Users',
            data: monthlyActive,
            backgroundColor: 'rgba(50,255,50)',
          },
          {
            label: 'Inactive Users',
            data: monthlyExpired,
            backgroundColor: 'rgb(229,83,82)',
          },
        ],
      };
    } else {
      return {
        labels: getDayLabels(selectedYear, selectedMonth),
        datasets: [
          {
            label: 'Active Users',
            data: dailyActive,
            backgroundColor: 'rgba(50,255,50)',
          },
          {
            label: 'Inactive Users',
            data: dailyExpired,
            backgroundColor: 'rgb(229,83,82)',
          },
        ],
      };
    }
  };

  // Prepare chart options based on current view
  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      plugins: {
        title: {
          display: false, // Remove the Chart.js title
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: viewType === 'monthly' ? 300 : 50,
        },
        x: {
          barPercentage: viewType === 'monthly' ? 0.3 : 0.8,
          categoryPercentage: viewType === 'monthly' ? 0.4 : 0.9,
        },
      },
      barThickness: viewType === 'monthly' ? 20 : 'flex',
    };

    return baseOptions;
  };

  // Helper function to get month name
  const getMonthName = monthNum => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNum - 1];
  };

  // Generate year options
  const getYearOptions = () => {
    const years = [];
    for (let year = currentYear - 2; year <= currentYear + 1; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div>
      {/* Chart Title */}
      <h2>
        {viewType === 'monthly'
          ? 'Monthly Active vs Inactive Users'
          : `Daily Active vs Inactive Users - ${getMonthName(
              selectedMonth,
            )} ${selectedYear}`}
      </h2>

      {/* Loading indicator */}
      {loading && (
        <div style={{textAlign: 'center', margin: '20px 0'}}>Loading...</div>
      )}

      {/* Chart */}
      <div style={{width: '98%', height: '100%'}}>
        <Bar data={getChartData()} options={getChartOptions()} />
      </div>
    </div>
  );
};

export default ChartBar;
