import React from "react";
// import { connect, useSelector } from "react-redux";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { clearSnack } from "../../redux/actions/userActions";

const SnackBar = ({ clearSnack, isShow, text }) => {
  const handleClose = () => {
    clearSnack();
  };

  return (
    <Snackbar open={isShow} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        {text}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => {
  return {
    isShow: state.Snackbar.isShow,
    text: state.Snackbar.successText,
  };
};

export default connect(mapStateToProps, { clearSnack })(SnackBar);
