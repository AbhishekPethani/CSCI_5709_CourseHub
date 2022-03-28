import NavbarComp from "./components/CourseReview/NavbarComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavbarComp />

      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/login" element={<Login />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
