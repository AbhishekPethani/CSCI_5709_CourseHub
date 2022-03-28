/*=======================================================
 Author: [Ridampreet Singh Jaggi] [rd285404@dal.ca]
========================================================= */
import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Paper,
  Avatar
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Appbar from "../AppBar/AppBar";
import App from "../../App";

/**
 * @Ridampreet
 * @Signup
 **/

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",

    paddingTop: 100
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1400px",
    display: "auto"
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
  signUp: {
    margin: "20px 0px 20px 0px"
  }
}));

export default function Signup() {
  // let users = JSON.parse(localStorage.getItem("users")) ?? [];

  const [passError, setpassError] = useState(false);
  const [fnameError, setfnameError] = useState(false);
  const [lnameError, setlnameError] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputEmail = data.get("email");
    const inputPassword = data.get("password");
    const inputName = data.get("firstName");
    const inputLName = data.get("lastName");
    const inputCPassword = data.get("cpassword");
    const inputAnswer = data.get("answer");

    const currentUser = {
      username: inputEmail,
      password: inputPassword,
      answer: inputAnswer
    };

    if (
      !/[^a-zA-Z]/.test(inputName) &&
      !/[^a-zA-Z]/.test(inputLName) &&
      inputPassword.length >= 8 &&
      inputCPassword.length >= 8 &&
      inputCPassword === inputPassword &&
      inputEmail.includes("@")
    ) {
      // users = [...users, currentUser];
      // localStorage.setItem("users", JSON.stringify(users));
      // logic to send the valid details to the registration API.
      const creds = {
        inputEmail,
        inputName,
        inputLName,
        inputPassword,
        inputAnswer
      };
      getResultant(creds);
      navigate("/login");
    } else {
      if (
        inputPassword !== inputCPassword ||
        inputPassword.length < 8 ||
        inputCPassword.length < 8
      ) {
        alert("Error with the password");
        setpassError(true);
      }
      if (/[^a-zA-Z]/.test(inputName)) {
        alert("Error with the First name");
        setfnameError(true);
      }
      if (/[^a-zA-Z]/.test(inputLName)) {
        alert("Error with the Last name");
        setlnameError(true);
      }
    }
  };

  function getResultant(creds) {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(creds)
      }
    )
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
  const styleForPaper = {
    padding: 20,
    height: "90vh",
    width: 500,
    margin: "20px auto"
  };

  return (
    <div
      className={classes.background}
      style={{ display: "auto", flexGrow: 1 }}
    >
      <div>{/* <Appbar></Appbar> */}</div>

      <div className={classes.container}>
        <Paper elevation={24} style={styleForPaper}>
          <Box className={classes.box}>
            <Typography variant="h5">New User</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className={classes.smallerBox}
            >
              <div className={classes.form}>
                <TextField
                  label="First Name"
                  fullWidth
                  required
                  autoFocus
                  name="firstName"
                  error={fnameError}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  required
                  name="lastName"
                  error={lnameError}
                />
                <TextField
                  label="Email Address"
                  fullWidth
                  required
                  name="email"
                />
                <TextField
                  label="Password"
                  fullWidth
                  required
                  type="password"
                  name="password"
                  error={passError}
                />
                <TextField
                  label="Confirm Password"
                  fullWidth
                  required
                  type="password"
                  name="cpassword"
                  error={passError}
                />
                <br />
                <Typography variant="h5">Security Questions</Typography>
                <br />
                <Typography>What is your place of birth ?</Typography>
                <TextField
                  label="Security answer"
                  fullWidth
                  required
                  type="text"
                  name="answer"
                />
              </div>
              <div className={classes.signUp}>
                <Button type="submit" fullWidth variant="contained">
                  Register
                </Button>
              </div>
              <div>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => {
                    navigate("/authenticate/login");
                  }}
                >
                  Sign in
                </Link>
              </div>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
}
