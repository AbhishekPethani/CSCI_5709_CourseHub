/*=======================================================
 Author: [Abhishek Pareshbhai Pethani] (ab823206@dal.ca)
 Author: [Aditya Bakshi] (aditya.bakshi@dal.ca)
========================================================= */
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CoursePage from "../../pages/CoursePage";
import Courses from "../../pages/Courses";
import Discount from "../../pages/Discount";
import Home from "../../pages/Home";
import MyAccount from "../../pages/MyAccount";
import MyCourses from "../../pages/MyCourses";
import Coupons from "../coupons";
import Login from "../Login";
import Profile from "../Profile";
import Order from "../../pages/Order";
import Logout from "../Sign out";
import Register from "../Signup";
import ForgotPassword from "../ForgotPassword";
import AdminDashboard from "../Admin/AdminDashboard";
import Wishlist from "../Wishlist/Wishlist"

const NavbarComp = () => {
  const [isAdmin, setAdmin] = useState(
    (localStorage.getItem("isAdmin") || "false") === "true"
  );

  return (
    <Router>
      {!isAdmin && (
        <div>
          <Navbar
            style={{ backgroundColor: "#3f51b5" }}
            variant={"dark"}
            ForgotPassword
            expand="lg"
          >
            <Container fluid>
              <Navbar.Brand as={Link} to={"/home"}>
                CourseHub
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/home"}>
                    {" "}
                    Home{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/my-courses"}
                  >
                    {" "}
                    My Courses{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/my-account"}
                  >
                    {" "}
                    My Account{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/discount"}
                  >
                    {" "}
                    Discounts{" "}
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/order"}>
                    {" "}
                    My Orders{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/authenticate/login"}
                  >
                    {" "}
                    Login{" "}
                  </Nav.Link>
                  <Nav.Link style={{ color: "white" }} as={Link} to={"/logout"}>
                    {" "}
                    Logout{" "}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to={"/authenticate/register"}
                  >
                    {" "}
                    Register{" "}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/my-courses" element={<MyCourses />} />
          <Route exact path="/my-account" element={<Profile />} />
          <Route exact path="/discount" element={<Coupons />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/courses/:courseName" element={<CoursePage />} />
          <Route exact path="/authenticate/login" element={<Login />} />
          <Route exact path="/authenticate/register" element={<Register />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route
            exact
            path="/authenticate/forgotPassword"
            element={<ForgotPassword />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default NavbarComp;
