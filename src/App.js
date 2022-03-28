import NavbarComp from "./components/CourseReview/NavbarComp";
import { useState } from "react";
import Header from "./components/Admin/AdminHeader";
import User from "./pages/AdminUser";
import Tabs from "./components/Admin/AdminTabs";
import Course from "./pages/AdminCourse";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ForgotPassword from "./components/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appbar from "./components/AppBar/AppBar.js";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState("1");
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || "false"
  );

  const userSection = (
    <div className="App">
      <NavbarComp />

      <BrowserRouter>
        <Routes>
          {/*
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );

  const adminSection = (
    <div className="admin-app">
      <Header />
      <Tabs
        selectedTab={selectedTab}
        handleTabChange={tabIndex => setSelectedTab(tabIndex)}
      />
      {selectedTab === "1" && <User />}
      {selectedTab === "2" && <Course />}
    </div>
  );

  return (
    <span>
      {/* if isAdmin flag is false, display user dashboard */}
      {isAdmin === "false" && userSection}

      {/* if isAdmin flag is true, display admin dashboard */}
      {isAdmin === "true" && adminSection}
    </span>
  );
}

export default App;
