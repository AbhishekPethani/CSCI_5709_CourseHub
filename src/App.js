import NavbarComp from './components/CourseReview/NavbarComp';
import { useState } from "react";
import Header from "./components/Admin/AdminHeader";
import User from "./pages/AdminUser";
import Tabs from "./components/Admin/AdminTabs";
import Course from "./pages/AdminCourse";
import "./App.css";

function App() {
  const [selectedTab, setSelectedTab] = useState("1");
  return (
    <span>
      <div className="App">
        <NavbarComp />
      </div>

      {/* <div className="admin-app">
        <Header />
        <Tabs
          selectedTab={selectedTab}
          handleTabChange={(tabIndex) => setSelectedTab(tabIndex)}
        />
        {selectedTab === "1" && <User />}
        {selectedTab === "2" && <Course />}
      </div> */}
    </span>

  );
}

export default App;
