import React from "react";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import ReviewSection from "../components/CourseReview/ReviewSection";
import '../assets/css/course-home-page.css'
import { Button } from "@mui/material";

// Course Home Page Component
const CourseHomePage = ({course}) => {
    // state to check which button is clicked
    const [whichButtonClicked, setWhichButtonClicked] = useState();

    return (
    <div>
      <Container>
        <Card size="lg" className="custom-card">
          <Card.Img variant="top" src={course.imgSource} />
          <Card.Body>
            <Card.Title className="display-3">{course.name}</Card.Title>
            <Card.Text className="lead">
              {course.desc}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex mt-2 mb-2 justify-content-around">
              <Button varient="contained" onClick={() => setWhichButtonClicked("about-course")} >About Course</Button>
              <Button varient="contained" onClick={() => setWhichButtonClicked("course-content")} >Course Content</Button>
              <Button varient="contained" onClick={() => setWhichButtonClicked("review")} >Reviews</Button>
              <Button varient="contained" onClick={() => setWhichButtonClicked("forum")} >Forum</Button>
              <Button varient="contained" onClick={() => setWhichButtonClicked("f&q")} >F&amp;Q</Button>
            </div>
          </Card.Footer>
        </Card>
        
        {// Display component based on button clicked}
        }
        <div>
          {whichButtonClicked === "about-course" && <p> Under Developement</p>}
          {whichButtonClicked === "course-content" && <p> Under Developement</p>}
          {whichButtonClicked === "review" && <ReviewSection  courseName = {course.name} />}
          {whichButtonClicked === "forum" && <p> Under Developement</p>}
          {whichButtonClicked === "f&q" && <p> Under Developement</p>}
        </div>
      </Container>
    </div>
  );
};

export default CourseHomePage;
