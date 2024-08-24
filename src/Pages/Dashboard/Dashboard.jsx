import React, { useState, useEffect } from "react";
import ChartBar from "./chart";
import UserPieChart from "./Piechart";
import Header from "../../components/Header/Header";
import ActiveUser from "../ActiveUsers/ActiveUser";
import PendingUsers from "../PendingUsers/PendingUsers";
import "./Dashboard.css";
import ApprovedPendingSub from "../ApprovedPendingSubscription/ApprovedPendingSub";
import SubscriptionRenewal from "../SubscriptionRenewal/SubscriptionRenewal";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContexts/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [selectedSection, setSelectedSection] = useState(null);
  const [data, setData] = useState({
    activeUsers: 0,
    accountApprovalPendingUsers: 0,
    subscriptionPendingUsers: 0,
    subscriptionExpiredUsers: 0,
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(
            "http://54.152.49.191:8080/admin/dashboard",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          setData({
            activeUsers: result.activeUsers,
            accountApprovalPendingUsers: result.accountApprovalPendingUsers,
            subscriptionPendingUsers: result.subscriptionPendingUsers,
            subscriptionExpiredUsers: result.subscriptionExpiredUsers,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300); // Adjust the delay (in milliseconds) as needed
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "activeUsers":
        return <ActiveUser />;
      case "pendingUsers":
        return <PendingUsers />;
      case "approvedPendingUsers":
        return <ApprovedPendingSub />;
      case "subscriptionRenewal":
        return <SubscriptionRenewal />;
      default:
        return (
          <div className="dashboard-container">
            <div className="items-section">
              <NavLink
                to="/admin/dashboard/active-users"
                className="content-items"
                id="item1"
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("activeUsers")}
              >
                <h4> Active Users</h4>
                <p>{data.activeUsers}</p>
              </NavLink>
              <NavLink
                to="/admin/dashboard/pending-users"
                className="content-items"
                id="item2"
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("pendingUsers")}
              >
                <h4> Pending Users</h4>
                <p>{data.accountApprovalPendingUsers}</p>
              </NavLink>
              <NavLink
                to="/admin/dashboard/approved-pending-subscription"
                className="content-items"
                id="item3"
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("approvedPendingUsers")}
              >
                <h4> Approved Pending Subscription</h4>
                <p>{data.subscriptionPendingUsers}</p>
              </NavLink>
              <NavLink
                to="/admin/dashboard/subscription-renewal"
                className="content-items"
                id="item4"
                style={{ cursor: "pointer" }}
                onClick={() => handleSectionClick("subscriptionRenewal")}
              >
                <h4> Subscription Renewal</h4>
                <p>{data.subscriptionExpiredUsers}</p>
              </NavLink>
            </div>
            <div className="chartbar">
              <div className="barchart-section">
                <ChartBar key={windowWidth} />
              </div>
              <div className="piechart-section">
                <UserPieChart key={windowWidth} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="content-section">
          <div className="content-sub-section">{renderSection()}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
