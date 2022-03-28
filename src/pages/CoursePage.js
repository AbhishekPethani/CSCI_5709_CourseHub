import React from 'react';
import { getCourseByName } from '../services/courses';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { autocompleteClasses } from '@mui/material';
import ReviewSection from "../components/CourseReview/ReviewSection";


const useStyles = makeStyles((theme) => ({
    root: {
    //   maxWidth: 350,
    //   maxHeight: 1500,
      margin: autocompleteClasses,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function CoursePage() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [course, setCourse] = useState([]);
    const params = useParams();

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    useEffect(() => {
        getCourseByName(params.courseName).then((response) => {
            setCourse(response.data.course)
        });
    }, []);

    let courseName, courseDescription, coursePrice, courseImage, courseAuthor, purchasedBy ;
    if(course !== undefined && course.length > 0){
        courseName = course[0].courseName;
        courseDescription = course[0].courseDescription;
        coursePrice = course[0].coursePrice;
        courseImage = course[0].courseImage;
        courseAuthor = course[0].courseAuthor;
        purchasedBy = course[0].purchasedBy;
    }

    return (
        <Card size="lg" className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="500"
          image={courseImage}
          title={courseName}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            {courseName}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Created By: {courseAuthor}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {courseDescription}
          </Typography>
          <br/>
          <Typography gutterBottom variant="h5" component="h2">
            ${coursePrice}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled="true">
          Add to Wishlist
        </Button>
        <Button size="small" color="primary" disabled="true">
          Add to Cart
        </Button>
      </CardActions>
      <ReviewSection  courseName = {courseName} purchasedBy = {purchasedBy} />
    </Card>
    );
}

export default CoursePage
