

import React from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import CourseHomePage from './CourseHomePage'
import '../assets/css/my-courses.css'
import react from '../assets/images/react-course.png'
import java from '../assets/images/java-course.png'
import ml from '../assets/images/ml-course.png'
import node from '../assets/images/node-course.png'
import python from '../assets/images/python-course.png'
import ai from '../assets/images/ai-course.png'
import { useState } from 'react'


const MyCourses = () => {
    const myCourses = [{name: "React JS", imgSource:react, desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sagittis nisl rhoncus mattis rhoncus urna. Ultrices dui sapien eget mi proin."}, 
                       {name: "Node JS", imgSource:node, desc:"Lorem donec massa sapien faucibus. Nulla porttitor massa id neque aliquam. Proin libero nunc consequat interdum varius. Pellentesque habitant morbi tristique senectus et netus et malesuada."}, 
                       {name: "Python", imgSource:python, desc:"In hac habitasse platea dictumst quisque. Massa tincidunt nunc pulvinar sapien. Luctus accumsan tortor posuere ac. Malesuada fames ac turpis egestas. Suspendisse in est ante in nibh mauris."}, 
                       {name: "Java", imgSource:java, desc:"Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Egestas erat imperdiet sed euismod nisi porta lorem. Nunc non blandit massa enim nec dui nunc."}, 
                       {name: "Machine Learning", imgSource:ml, desc:"Urna neque viverra justo nec. Lectus nulla at volutpat diam ut venenatis tellus in. Tristique senectus et netus et malesuada fames ac. Dolor magna eget est lorem ipsum dolor sit amet."}, 
                       {name: "Artificial Intelligence", imgSource:ai, desc:"Amet venenatis urna cursus eget nunc scelerisque viverra. Amet est placerat in egestas erat imperdiet. Tortor at auctor urna nunc id cursus metus. Enim diam vulputate ut pharetra sit amet aliquam. "}];
    
    const [selectedCourse, setSelectedCourse] = useState("blank");
    
    return (
        selectedCourse === "blank" ?
        <>
            <h1 className='header'>My Courses Page </h1>
            <Container>
                <Row xs={1} md={3} className="g-4 justify-content-md-center">
                    {myCourses.map(course => (
                        <Col>
                            <Card onClick={() => setSelectedCourse(course)} style={{ cursor: "pointer" }} >
                                <Card.Img variant="top" src= {course.imgSource} />
                                <Card.Body>
                                    <Card.Title> {course.name} </Card.Title>
                                    <Card.Text> {course.desc} </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
        :    
        <CourseHomePage course = {selectedCourse} />
        )
}

export default MyCourses