/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { loginUser } from "../../redux/actions/userActions";
// import Alert from "@material-ui/lab/Alert";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#000 !important",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  floatingLabelFocusStyle: {
    color: "#000 !important",
  },
  multilineColor: {
    color: "#000",
  },
}));

const Signin = () => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _Snackbar = useSelector((state) => state.Snackbar);
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email.length === 0) {
      setError("* Please, enter email address.");
    } else if (!validateEmail(user.email)) {
      setError("* Please, enter a valid email address.");
    } else if (user.password.length === 0) {
      setError("* Please enter your Password");
    } else {
      setLoading(true);
      dispatch(loginUser(user));
    }
  };

  useEffect(() => {
    if (
      _Snackbar.successText === "Logged in successfully" ||
      _Snackbar.successText === "Account registration successfully"
    ) {
      navigate("/");
    }
  }, [_Snackbar.successText]);

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="signin-wrapper">
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography
            style={{ color: "#000", display: "flex", alignItems: "center" }}
            variant="h4"
            gutterBottom
          >
            <i
              className="backarrow fal fa-long-arrow-left"
              onClick={() => backToHome()}
            ></i>
            &nbsp;Autentificare
          </Typography>
          {_User.errorText || error ? (
            <>
              <Alert
                style={{ width: "100%", marginTop: "10px" }}
                severity="error"
              >
                {error}
                {_User.errorText}
              </Alert>
            </>
          ) : null}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                    className: classes.multilineColor,
                  }}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  label="Email"
                  name="email"
                  onChange={handleField}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                    },
                    className: classes.multilineColor,
                  }}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  name="password"
                  onChange={handleField}
                  label="Parola"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ background: "#1890FF", color: "#fff" }}
              className={classes.submit}
              disabled={loading}
            >
              Autentificare
            </Button>
            <Grid container justifyContent="space-between">
              <Grid item>
                {/* <p className="color-white" style={{ color: "#F9FAFB" }}>
                  <Link to="/forget-password" style={{ color: "#1CCAFF" }}>
                    Forget Password
                  </Link>
                </p> */}
              </Grid>
              <Grid item>
                <p className="color-white" style={{ color: "#000" }}>
                  Ai nevoie de un cont nou?&nbsp;&nbsp;
                  <Link to="/signup" style={{ color: "#1CCAFF" }}>
                    Inregistrare
                  </Link>
                </p>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Signin;
