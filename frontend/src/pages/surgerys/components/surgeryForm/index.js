/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  addNewSurgery,
  updateSurgery,
} from "../../../../redux/actions/surgeryActions";
import { useDispatch, useSelector } from "react-redux";
import "./surgeryForm.css";
import { surgeryConstants } from "../../../../redux/constants";
import { useParams } from "react-router-dom";
const {
  // ADD
  SURGERY_ADDED,
} = surgeryConstants;

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

const SurgeryForm = ({
  setSurgeryFormOpen,
  setEditing,
  editing,
  editingSurgery,
}) => {
  let { doctor, patient } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const _surgery = useSelector((state) => state.surgery);
  const [surgery, setSurgery] = useState({
    doctor: doctor,
    patient: patient,
    nameOfSurgery: "",
    dificulty: "Low",
    noOfSteps: "",
    infoBesidesSteps: "",
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
    setSurgery({ ...surgery, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (_surgery.surgeryAdded) {
      setSurgeryFormOpen(false);
      setEditing(false);
      dispatch({
        type: SURGERY_ADDED,
        payload: false,
      });
    }
  }, [_surgery.surgeryAdded]);

  useEffect(() => {
    if (editing) {
      console.log("editingSurgery", editingSurgery);
      setSurgery(editingSurgery);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("surgery", surgery);
    if (editing) {
      dispatch(updateSurgery(surgery));
    } else {
      dispatch(addNewSurgery(surgery));
    }
  };

  const handleBackPress = () => {
    setEditing(false);
    setSurgeryFormOpen(false);
  };
  return (
    <div className="patients-wrapper">
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => handleBackPress()}
        ></i>
        &nbsp; {editing ? "Editeaza operatie" : "Adauga operatie"}
      </h1>
      <form className="my-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
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
              label="Denumire operatie"
              name="nameOfSurgery"
              value={surgery.nameOfSurgery}
              onChange={handleField}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl
              variant="outlined"
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
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Dificultate
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                name="dificulty"
                onChange={handleField}
                value={surgery.dificulty}
                label="Dificultate"
              >
                <MenuItem value="Low">Usor</MenuItem>
                <MenuItem value="Medium">Mediu</MenuItem>
                <MenuItem value="High">Complicat</MenuItem>
              </Select>
            </FormControl>
            {/* <TextField
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
              name="dificulty"
              value={surgery.dificulty}
              onChange={handleField}
              label="Dificulty"
            /> */}
          </Grid>
          <Grid item xs={12} sm={12}>
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
              name="noOfSteps"
              value={surgery.noOfSteps}
              onChange={handleField}
              type="number"
              label="Nr. pasi"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
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
              name="infoBesidesSteps"
              value={surgery.infoBesidesSteps}
              onChange={handleField}
              type="text"
              label="Informatii"
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
          Salveaza
        </Button>
      </form>
    </div>
  );
};

export default SurgeryForm;
