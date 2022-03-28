import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Appbar from "../AppBar/AppBar";

/**
 * @Ridampreet
 * @Login
 **/

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 500,
    margin: "auto",
    width: "60%",
    paddingTop: 100,
    height: "1500px"
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
    gridAutoFlow: "column"
  },
  background: {
    background: "linear-gradient(#e66465, #9198e5)",
    height: "1800px"
  }
}));

export default function Login() {
  const styleForPaper = {
    padding: 20,
    height: "50vh",
    width: 500,
    margin: "20px auto",
    marginTop: "100px",
    display: "flex"
  }; //css for the paper cards

  const [userFound, setuserFound] = useState(false);
  let email = "";
  let password = "";
  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    // const users = JSON.parse(localStorage.getItem("users"));
    const data = new FormData(event.currentTarget);
    email = data.get("email");
    password = data.get("password");
    const creds = { email };
    read();
  };

  async function read() {
    const ch = await checkRegistration();
    console.log("reached");
    if (ch == true) navigate("/my-account");
    else {
      alert("login details do not match");
    }
  }

  function checkRegistration() {
    return fetch(
      "https://csci-5709-course-hub-backend.herokuapp.com/authenticate/" +
        email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data.users[0]);
        if (
          email === data.users[0].email &&
          password === data.users[0].password
        ) {
          localStorage.setItem("logged_in_user", email);
          if (email === "sourav@gmail.com") {
            localStorage.setItem("isAdmin", true);
          } else {
            localStorage.setItem("isAdmin", false);
          }
          return true;
        } else {
          return false;
        }
      });
  }

  return (
    <div className={classes.background} style={{ marginTop: "0px" }}>
      {/* <Appbar></Appbar> */}

      <Paper elevation={24} style={styleForPaper}>
        <div className={classes.container}>
          <Box className={classes.box}>
            <Typography component="h1" variant="h5">
              SIGN IN
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
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />
              </div>
              <div className={classes.signIn}>
                <Button type="submit" fullWidth variant="contained">
                  Sign In
                </Button>
              </div>
              <div className={classes.forgotPassword}>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => {
                    navigate("/forgotPassword");
                  }}
                >
                  Forgot password?
                </Link>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {"Sign Up"}
                </Link>
              </div>
              <div>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Register
                </Link>
              </div>
            </Box>
          </Box>
        </div>
      </Paper>
    </div>
  );
}
