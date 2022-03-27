import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Courses from '../../pages/Courses';
import Discount from '../../pages/Discount';
import Home from '../../pages/Home';
import MyAccount from '../../pages/MyAccount';
import MyCourses from '../../pages/MyCourses';
import Order from '../../pages/Order';

const NavbarComp = () => {
  return (
    <Router>
    <div>
      <Navbar bg="dark" variant={"dark"} expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/home"}>Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/home"}> Home </Nav.Link>
              <Nav.Link as={Link} to={"/courses"}> Courses </Nav.Link>
              <Nav.Link as={Link} to={"/my-courses"}> My Courses </Nav.Link>
              <Nav.Link as={Link} to={"/my-account"}> My Account </Nav.Link>
              <Nav.Link as={Link} to={"/discount"}> Discount </Nav.Link>
              <Nav.Link as={Link} to={"/order"}> Order </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>}  />
        <Route exact path="/home" element={<Home/>}  />
        <Route exact path="/courses" element={<Courses/>}  />
        <Route exact path="/my-courses" element={<MyCourses/>}  />
        <Route exact path="/my-account" element={<MyAccount/>}  />
        <Route exact path="/discount" element={<Discount/>}  />
        <Route exact path="/order" element={<Order />}  />
      </Routes>
    </div>
  </Router>
  )
}

export default NavbarComp