/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  addNewPostSurgery,
  updatePostSurgery,
} from "../../../../redux/actions/postSurgeryActions";
import { useDispatch, useSelector } from "react-redux";
import "./surgeryForm.css";
import { postSurgeryConstants } from "../../../../redux/constants";
import { useParams } from "react-router-dom";
const {
  // ADD
  POST_SURGERY_ADDED,
} = postSurgeryConstants;

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

const PostSurgeryForm = ({
  setPostSurgeryFormOpen,
  setEditing,
  editing,
  editingPostSurgery,
}) => {
  let { doctor, patient } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const _postSurgery = useSelector((state) => state.postSurgery);
  const [postSurgery, setPostSurgery] = useState({
    doctor: doctor,
    patient: patient,
    noOfDaysToRecover: "",
    medicines: "",
    specialTreatment: editing ? editingPostSurgery.specialTreatment : "",
  });
  //======  Surgery ======= postSurgery
  // nameOfSurgery
  // dificulty
  // noOfSteps
  // infoBesidesSteps
  // ===== Post Surgery ==== postSurgery
  // noOfDaysToRecover
  // medicines
  // specialTreatment

  const handleField = (e) => {
    setPostSurgery({ ...postSurgery, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (_postSurgery.postSurgeryAdded) {
      setPostSurgeryFormOpen(false);
      setEditing(false);
      dispatch({
        type: POST_SURGERY_ADDED,
        payload: false,
      });
    }
  }, [_postSurgery.postSurgeryAdded]);

  useEffect(() => {
    if (editing) {
      console.log("editingSurgery", editingPostSurgery);
      setPostSurgery(editingPostSurgery);
    }
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("postSurgery", postSurgery);
    if (editing) {
      dispatch(updatePostSurgery(postSurgery));
    } else {
      dispatch(addNewPostSurgery(postSurgery));
    }
  };

  const handleBackPress = () => {
    setEditing(false);
    setPostSurgeryFormOpen(false);
  };
  return (
    <div className="patients-wrapper">
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => handleBackPress()}
        ></i>
        &nbsp; {editing ? "Editeaza tratament post-operator" : "Adauga tratament post-operator"}
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
              label="Nr. zile de recuperare"
              name="noOfDaysToRecover"
              value={postSurgery.noOfDaysToRecover}
              onChange={handleField}
              type="number"
              autoFocus
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
              name="medicines"
              value={postSurgery.medicines}
              onChange={handleField}
              type="text"
              label="Medicamente"
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
              name="specialTreatment"
              value={postSurgery.specialTreatment}
              onChange={handleField}
              type="text"
              label="Tratament special"
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

export default PostSurgeryForm;
