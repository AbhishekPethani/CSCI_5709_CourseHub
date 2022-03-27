import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../components/Appbar";
import Card from "../components/CourseCard"
import { useState, useEffect } from 'react';
import { Grid, AppBar, Filter } from "@material-ui/core";
import { getCourses } from '../services/courses';

const useStyles = makeStyles({
  gridcontainer: {
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '50px',
  }
});

const Home = () => {
  const [allcourses, setCourses] = useState([]);
  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response.data.courses) });
}, []);

if(allcourses !== undefined && allcourses.length > 0){
  
}
  let courses = [];
  // courses.push({ courseName: 'React', category: 'webdev', courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', courseImage: webdev1 });
  // courses.push({ courseName: 'Angular', category: 'webdev', courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', courseImage: webdev2 });
  // courses.push({ courseName: 'Java', category: 'backend', courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', courseImage: java });
  // courses.push({ courseName: 'SQL', category: 'database', courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', courseImage: sql });

  const [selectedCourses, setSelectedCourses] = useState(courses);

  const filterCourses = (filterVal) => {
    let filteredCourses = courses.filter(course => course.category === filterVal);
    setSelectedCourses(filteredCourses);
    if (filterVal === 'all') {
      setSelectedCourses(courses);
    }
  }


  const classes = useStyles();


  return (
    <div>
      {/* <Appbar position="static">
        <Appbar />
      </Appbar> */}
      <div>
        {/* <Filters SetFilterValue={filterCourses} /> */}
        <Grid
          container
          spacing={3}
          className={classes.gridcontainer}>
          {allcourses.map((course) => {
            return <Grid item xs={12} sm={6} md={4}>
              <div><Card courseName={course.courseName} courseDescription={course.courseDescription} courseImage={course.courseImage} /></div></Grid>
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Home