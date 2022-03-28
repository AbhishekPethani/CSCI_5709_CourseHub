import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Link, TextField, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Appbar from "../AppBar/AppBar";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    height: "1000px",
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
  signIn: {
    margin: "20px 0px 20px 0px"
  },
  forgotPassword: {
    display: "grid",
    placeContent: "space-between",
    gridAutoFlow: "column",
    background: "lightgrey",
    alignItems: "center"
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1400px"
  }
}));

export default function ForgotPassword() {
  var creds = "";
  var currentUser = "";
  const navigate = useNavigate();
  var answer = "";
  const classes = useStyles();

  // const user = localStorage.getItem("currentUser");
  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // var users = JSON.parse(localStorage.getItem("users"));
    currentUser = data.get("email");
    console.log("The current user is ", currentUser);
    checkForgotPasswordrequirments();
    answer = data.get("answer");

    const username = data.get("email");
    const password = data.get("password");
    const c_password = data.get("cpassword");
    var changed = false;

    if (password.length < 8 || password != c_password) {
      alert("Password not appropriate");
    } else {
      creds = { currentUser, password };
      read();

      navigate("/login");
    }
  };
  async function read() {
    const ch = await checkForgotPasswordrequirments();
    console.log("answer is", ch);
    if (ch == true) {
      updateNewPassord();
    } else {
      alert("login details do not match");
    }
  }
  function checkForgotPasswordrequirments() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com//authenticate/" +
        currentUser,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (answer === data.users[0].answer) {
          console.log("******", answer, data.users[0].answer);
          return true;
        } else {
          return false;
        }
      });
  }

  function updateNewPassord() {
    return fetch("https://tutorial5709-3.herokuapp.com/authenticate/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then(response => response.json())
      .then(data => {});
  }
  const styleForPaper = {
    padding: 20,
    height: "50vh",
    width: 400,
    margin: "20px auto",
    marginTop: "100px",
    display: "flex"
  };
  return (
    <div className={classes.background}>
      {/* <Appbar></Appbar> */}
      <div className={classes.container}>
        <Paper elevation={24} style={styleForPaper}>
          <Box className={classes.box}>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className={classes.smallerBox}
            >
              <div className={classes.form}>
                <TextField
                  autoFocus
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                />
                <Typography component="h1" variant="h5">
                  Enter the answer to the Security Question
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="answer"
                  label="What is your place of birth"
                  type="text"
                />
                <TextField
                  label="Password"
                  fullWidth
                  required
                  type="password"
                  name="password"
                />
                <TextField
                  label="Confirm Password"
                  fullWidth
                  required
                  type="password"
                  name="cpassword"
                />
              </div>
              <div className={classes.signIn}>
                <Button type="submit" fullWidth variant="contained">
                  Reset Password
                </Button>
              </div>
              <div className={classes.signIn} fullWidth variant="contained">
                <Button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
