import React, { useState } from "react";
import Header from './AdminHeader';
import Tabs from './AdminTabs';
import User from '../../pages/AdminUser';
import Course from '../../pages/AdminCourse';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("1");

  return (
    <div className="admin-app">
      <Header />
      <Tabs
        selectedTab={selectedTab}
        handleTabChange={(tabIndex) => setSelectedTab(tabIndex)}
      />
      {selectedTab === "1" && <User />}
      {selectedTab === "2" && <Course />}
    </div>
  );
}

export default AdminDashboard;
