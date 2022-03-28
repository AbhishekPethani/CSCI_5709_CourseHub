import React, { useEffect, useState } from 'react'
import axios from "axios";
import '../../assets/css/wishlist.css'
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import 'bootstrap/dist/css/bootstrap.css'
import './WishlistIcon';
import WishlistIcon from './WishlistIcon';

const wishlistEndpoint = 'https://csci-5709-course-hub-backend.herokuapp.com/wishlist/'

export default function Wishlist(props) {
    const {userId} = useParams();
    const [courseToUpdate, setCourseToUpdate] = useState(null);
    const [courses, setCourses] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [courseId, setCourseId] = useState(null);
    const [isLoading, setLoading] = useState(true);
    
    async function removeCourse(courseId) {
        let filteredWishlist = wishlist.filter((course) => {
            return (course.courseId != courseId);
        });
        let removeFromWishlistUrl = wishlistEndpoint + userId + "/" + courseId;
        axios.delete(removeFromWishlistUrl).then((res) => {
            if(res.data.success) {
                setWishlist(filteredWishlist);
            }
        });
    }

    async function fetchWishlist() {
        let fetchWishlistUrl = wishlistEndpoint + userId;
        try {
            axios.get(fetchWishlistUrl).then(async (res) => {
                setWishlist(res.data.wishlist);
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchCourses() {
        setCourses([]);
        for(let i=0; i<wishlist.length; i++) {
            let fetchCourseUrl = wishlistEndpoint + "course/" + wishlist[i].courseId;
            axios.get(fetchCourseUrl).then(async (result) => {
                let c = result.data.course;
                c.colorCode = await getColorCode(userId, c._id);
                setCourseToUpdate(c);
            });
        }
    }

    async function addCourse() {
        if(courseToUpdate != null) {
            setCourses([...courses, courseToUpdate]);
        }
    }

    // executed when the first time component loaded
    useEffect(async ()=>{
        await fetchWishlist();
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [wishlist]);

    useEffect(() => {
        
    }, [courses]);

    useEffect(() => {
        addCourse();
        // console.log(courseToUpdate);
    }, [courseToUpdate]);

    // useEffect hook which will be executed every time courseId changes
    // whenever user clicks on a "remove from wishlist" option of any course
    // the courseId will be assigned with that course's id
    // every time course id changes, this hook will be invoked
    useEffect(() => {
        if(courseId != null) {
            try {
                let deleteFromWishlistUrl = wishlistEndpoint + userId + "/" + courseId;
                axios.delete(deleteFromWishlistUrl).then((res) => {
                    if(res.data.success) {
                        removeCourse(courseId);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [courseId]);

    async function getColorCode(userId, courseId) {
        try {
            let checkCourseWishlistedUrl = wishlistEndpoint + "check/" + userId + "/" + courseId;
            axios.get(checkCourseWishlistedUrl).then((res) => {
                if(res.data.isWishlisted == true) {
                    return "#0096FF"; // blue color
                } else {
                    return "#C0C0C0"; // silver color
                }
            });
        } catch (error) {
            console.log(error);
        }
        return "#0096FF";
    }

    if(isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className='wishlist-root'>
            <h1>Wishlist</h1>
            <hr/>
            <div className='course-root'>
            {courses.map((course) => (
                <div className='course'>
                    <div className='course-img'><img src= {course.courseImage} alt={course.courseName}/></div>
                    <div className='course-detail'>
                        <div><h4>{course.courseName}</h4></div>
                        <div className='course-desc'>{course.courseDescription}</div>
                        <table className='tbl'>
                            <tr className='tbl-rw'>
                                <td className='tbl-cell1'><h5>${course.coursePrice}</h5></td>
                                <td className='tbl-cell2'>
                                    <div className='wishlist-btn' onClick={() => {setCourseId(course._id)}}>
                                        <WishlistIcon userId={userId} courseId={course._id}/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
};