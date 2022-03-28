import axios from 'axios';
import { useState, useEffect } from 'react';

// Backend URL
const backEndURL = 'http://localhost:3000/courses';

// Method to get all the courses
const getCourses = (course) => {
    return axios.get(backEndURL, course);
    // .then((response) => {   
    //     return response.data.courses;
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
}

// Method to get all the courses
const getCourseByName = (courseName) => {
    return axios.get(backEndURL + `/${courseName}`);
    // .then((response) => {   
    //     return response.data.courses;
    // })
    // .catch((error) => {
    //     console.log(error)
    // })
}

export { getCourses, getCourseByName }