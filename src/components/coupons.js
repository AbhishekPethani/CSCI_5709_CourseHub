/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
import { ButtonBase, Card, CardActions, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Button, CardActionArea, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";

import CardMedia from "@mui/material/CardMedia";
import Appbar from "./Appbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NavbarComp from "./NavbarComp";

import { Navigate } from "react-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  background: {
    height: "2000px",
    background: "linear-gradient(#9198e5,#e66465)"
  }
}));
export default function Profile() {
  const [arrOfItems, setarrOffItems] = useState([]);
  const [searchInp, setsearchInp] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setsearchInp(event.target.value);
  }

  useEffect(() => {
    // Update the document title using the browser API
    fetch("https://tutorial5709-3.herokuapp.com/coupons/coupons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setarrOffItems(data.users);
      });
  }, []);
  const handleClick = event => {
    event.preventDefault();
    alert("card clciked");
  };

  const classes = useStyles();
  return (
    <div>
      <NavbarComp />
      <div>
        {/* <Appbar></Appbar> */}

        <div className={classes.root}>
          <Grid container spacing={2}>
            {arrOfItems
              .filter(user => {
                return user;
              })
              .map(user => (
                <Grid item xs={10} sm={6} md={4}>
                  <Card
                    sx={{
                      margin: "30px",
                      background: "#E1E7EB"
                    }}
                    variant="outlined"
                  >
                    <CardMedia
                      component="img"
                      height="365px"
                      image={user.src}
                      alt="IMAGE"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {user.value} % OFF
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Apply this coupon code on your checkout to avail a
                        dicount of {user.value}% on your total order value. T&C
                        apply
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography variant="body2" color="text.primary">
                        Coupon Code: {user.couponCode}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

// image citations:https://www.dreamstime.com/stock-illustration-off-red-rubber-stamp-over-white-background-image88004210
