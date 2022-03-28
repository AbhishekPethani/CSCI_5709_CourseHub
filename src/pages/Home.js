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