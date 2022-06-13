/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  addNewPatient,
  updatePatient,
} from "../../../../redux/actions/patientActions";
import { useDispatch, useSelector } from "react-redux";
import "./patientForm.css";
import { patientConstants } from "../../../../redux/constants";
const {
  // ADD
  PATIENT_ADDED,
} = patientConstants;

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

const PatientForm = ({
  setPatientFormOpen,
  setEditing,
  editing,
  editingPatient,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const _User = useSelector((state) => state.User);
  const _patient = useSelector((state) => state.patient);
  const [patient, setPatient] = useState({
    doctor: _User.profile._id,
    name: "",
    age: "",
    bloodGroup: "",
    height: "",
    weight: "",
    heartBeat: "",
    systolicBloodPressure: "",
    diastolicBloodPressure: "",
    hemoGlobin: "",
    sugarLevel: "",
  });
  //======  Surgery ======= surgery
  // nameOfSurgery
  // dificulty
  // noOfSteps
  // infoBesidesSteps
  // ===== Post Surgery ==== postSurgery
  // noOfDaysToRecover
  // medicines
  // specialTreatment

  const handleField = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (_patient.patientAdded) {
      setPatientFormOpen(false);
      setEditing(false);
      dispatch({
        type: PATIENT_ADDED,
        payload: false,
      });
    }
  }, [_patient.patientAdded]);

  useEffect(() => {
    if (editing) {
      console.log("editingPatient", editingPatient);
      setPatient(editingPatient);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("patient", patient);
    if (editing) {
      dispatch(updatePatient(patient));
    } else {
      dispatch(addNewPatient(patient));
    }
  };

  const handleBackPress = () => {
    setEditing(false);
    setPatientFormOpen(false);
  };
  return (
    <div className="patients-wrapper">
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => handleBackPress()}
        ></i>
        &nbsp; {editing ? "Editeaza pacient" : "Adauga pacient"}
      </h1>
      <form className="my-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
              label="Nume pacient"
              name="name"
              value={patient.name}
              onChange={handleField}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="age"
              value={patient.age}
              onChange={handleField}
              label="Varsta"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="bloodGroup"
              value={patient.bloodGroup}
              onChange={handleField}
              label="Grupa sanguina"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
              type="number"
              label="Inaltime (cm)"
              name="height"
              value={patient.height}
              onChange={handleField}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="weight"
              value={patient.weight}
              onChange={handleField}
              label="Greutate (kg)"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="heartBeat"
              value={patient.heartBeat}
              onChange={handleField}
              label="Ritm cardiac (bpm)"
              type="number"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
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
              label="Tensiune arteriala sistolica (mmHg)"
              name="systolicBloodPressure"
              value={patient.systolicBloodPressure}
              onChange={handleField}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="diastolicBloodPressure"
              value={patient.diastolicBloodPressure}
              onChange={handleField}
              label="Tensiune arteriala distolica (mmHg)"
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
              name="hemoGlobin"
              value={patient.hemoGlobin}
              onChange={handleField}
              label="Hemoglobina (g/dL)"
              type="number"
            />
          </Grid>
        </Grid>
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
              name="sugarLevel"
              value={patient.sugarLevel}
              label="Nivel zahar (mg/dL)"
              onChange={handleField}
              type="number"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ background: "#1890FF", color: "#fff" }}
          className={classes.submit}
        >
          Adauga
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item>
            {/* <p className="color-white" style={{ color: "#F9FAFB" }}>
                  <Link to="/forget-password" style={{ color: "#1CCAFF" }}>
                    Forget Password
                  </Link>
                </p> */}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PatientForm;
