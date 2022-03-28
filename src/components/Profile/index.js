import React from "react";
import { Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Link, TextField, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Appbar from "../AppBar/AppBar";
const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100
  },
  box: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  smallerBox: {
    marginTop: 30
  },
  form: {
    display: "grid",
    width: 400,
    gridRowGap: 20
  },
  delete: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column"
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1400px",
    display: "auto"
  }
}));

export default function Profile() {
  const styleForPaper = {
    padding: 20,
    height: "30vh",
    width: 700,
    margin: "20px auto"
  };
  const classes = useStyles();
  const navigate = useNavigate();
  var currentUser = localStorage.getItem("logged_in_user");
  var creds = { currentUser };
  const handleSubmit = event => {
    alert("The account will be deleted");
    // var users = JSON.parse(localStorage.getItem("users"));
    // var curr = localStorage.getItem("currentUser");
    // var final_used = users.filter(function (users) {
    //   return users.username != curr;
    // });
    // localStorage.setItem("users", JSON.stringify(final_used));

    deleteProfile();
    navigate("/");
  };
  function deleteProfile() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com//authenticate/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
  currentUser = localStorage.getItem("logged_in_user");
  return (
    <div className={classes.background}>
      {/* <Appbar></Appbar> */}
      <Paper elevation={24} style={styleForPaper}>
        <div className={classes.container}>
          <Typography variant="h5" component="div">
            WELCOME USER
          </Typography>
          <Typography variant="h5" component="div">
            User Email: {currentUser}
          </Typography>
          <div className={classes.delete}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
            >
              Delete User
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
}
