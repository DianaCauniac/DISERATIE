/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/userActions";
import "./signup.css";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
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
  varify: {
    margin: theme.spacing(0, 0, 0),
  },
  floatingLabelFocusStyle: {
    color: "#000 !important",
  },
  multilineColor: {
    color: "#000",
  },
}));

const Signup = () => {
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _Snackbar = useSelector((state) => state.Snackbar);
  const navigate = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialization: "",
    responsibilities: "",
    dateOfStart: new Date(),
    available: true,
    doctors: [],
    nurses: [],
    role: "doctor",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleField = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      _Snackbar.successText === "Logged in successfully" ||
      _Snackbar.successText === "Account registration successfully"
    ) {
      navigate("/");
    }
  }, [_Snackbar.successText]);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.name.length === 0) {
      setError("* Trebuie sa introduci numele.");
    } else if (user.email.length === 0) {
      setError("* Trebuie sa introduci adresa de email.");
    } else if (!validateEmail(user.email)) {
      setError("* Adresa de email nu e corecta.");
    } else if (user.password.length < 6) {
      setError("* Parola trebuie sa aiba cel putin 6 caractere.");
    } else if (user.password !== user.confirmPassword) {
      setError("Parola nu corespunde.");
    } else if (user.phone.length === 0) {
      setError("* Trebuie sa introduci numarul de telefon.");
    } else if (user.specialization.length === 0) {
      setError("* Trebuie sa introduci specializarea.");
    } else if (user.responsibilities.length === 0) {
      setError("* Trebuie sa introduci responsabilitatile.");
    } else {
      console.log("user", user);
      dispatch(registerUser(user));
    }
    setLoading(false);
  };
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="signup-wrapper">
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
            &nbsp;Inregistrare
          </Typography>
          {error || _User.errorText ? (
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
              <Grid item xs={6}>
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
                  label="Nume"
                  name="name"
                  value={user.name}
                  onChange={handleField}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
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
                  id="email"
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleField}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={6}>
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
                  value={user.password}
                  onChange={handleField}
                  label="Parola"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={6}>
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
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleField}
                  label="Confirmare parola"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
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
                  name="phone"
                  value={user.phone}
                  onChange={handleField}
                  label="Nr. telefon"
                  type="number"
                  autoComplete="current-password"
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
                  name="specialization"
                  value={user.specialization}
                  onChange={handleField}
                  label="Specializare"
                  type="text"
                  autoComplete="current-password"
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
                  name="responsibilities"
                  value={user.responsibilities}
                  onChange={handleField}
                  label="Responsabilitati"
                  type="text"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Rol
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="role"
                    value={user.role}
                    onChange={handleField}
                    label="Rol"
                  >
                    {/* <MenuItem value="">
                      <em>Select Role</em>
                    </MenuItem> */}
                    <MenuItem value="doctor">Doctor</MenuItem>
                    <MenuItem value="nurse">Asistent</MenuItem>
                  </Select>
                </FormControl>
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
              Inregistrare
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p className="color-white" style={{ color: "#000" }}>
                  Ai deja cont?&nbsp;&nbsp;
                  <Link to="/signin" style={{ color: "#1CCAFF" }}>
                    Conectare
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

export default Signup;
