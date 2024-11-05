import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Customers from "../../Pages/Customers/Customers";
import CustomersView from "../../Pages/CustomerView/CustomersView";
import Settings from "../../Pages/settingspage/Setting";
import Coupon from "../../Pages/coupons/Coupons";
import ActiveUser from "../../Pages/ActiveUsers/ActiveUser";
import PendingUsers from "../../Pages/PendingUsers/PendingUsers";
import ApprovedPendingSub from "../../Pages/ApprovedPendingSubscription/ApprovedPendingSub";
import SubscriptionRenewal from "../../Pages/SubscriptionRenewal/SubscriptionRenewal";
import CreatingPlans from "../../Pages/SubscriptionPlans/CreatingPlans";
import CreatingSubscriptionPlans from "../../Pages/SubscriptionPlans/CreatingSubscriptionPlans";
import UpdateSubscriptionplans from "../../Pages/SubscriptionPlans/UpdateSubscriptionPlans";
import Subscription from "../../Pages/SubscriptionPlans/Subscription";
import Createcoupons from "../../Pages/coupons/Createcoupons";

function Admin() {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="dashboard/" element={<Dashboard />} />
          <Route path="customers/" element={<Customers />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="customers/viewcustomer" element={<CustomersView />} />
          <Route
            path="customers/viewcustomer/:id"
            element={<CustomersView />}
          />
          <Route path="customers/:customerId" element={<CustomersView />} />
          <Route path="dashboard/active-users" element={<ActiveUser />} />
          <Route
            path="dashboard/active-users/viewcustomer"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/active-users/viewcustomer/:id"
            element={<CustomersView />}
          />
          <Route path="dashboard/pending-users" element={<PendingUsers />} />
          <Route
            path="dashboard/pending-users/viewcustomer"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/pending-users/viewcustomer/:id"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/approved-pending-subscription"
            element={<ApprovedPendingSub />}
          />
          <Route
            path="dashboard/approved-pending-subscription/viewcustomer"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/approved-pending-subscription/viewcustomer/:id"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/subscription-renewal"
            element={<SubscriptionRenewal />}
          />
          <Route
            path="dashboard/subscription-renewal/viewcustomer"
            element={<CustomersView />}
          />
          <Route
            path="dashboard/subscription-renewal/viewcustomer/:id"
            element={<CustomersView />}
          />
          <Route path="dashboard/" element={<Dashboard />}>
            <Route path="active-users" element={<ActiveUser />} />
            <Route path="pending-users" element={<PendingUsers />} />
            <Route
              path="approved-pending-subscription"
              element={<ApprovedPendingSub />}
            />
            <Route
              path="subscription-renewal"
              element={<SubscriptionRenewal />}
            />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="admin/subscription" element={<Subscription />} />
          <Route
            path="subscription/creating-plans"
            element={<CreatingSubscriptionPlans />}
          />
          <Route
            path="subscription/updating-plans/:id"
            element={<UpdateSubscriptionplans />}
          />
          <Route path="coupons" element={<Coupon />} />
          <Route path="coupons/create-coupons" element={<Createcoupons />} />
          <Route path="creating-plans" element={<CreatingPlans />} />
        </Routes>
      </Sidebar>
    </div>
  );
}

export default Admin;
