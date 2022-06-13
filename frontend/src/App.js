import React, { Fragment, Suspense, useEffect, lazy } from "react";
import { getCurrentUser } from "./redux/actions/userActions";
import { connect } from "react-redux";

import SnackBar from "./components/alerts/successMessage";
import { CircularProgress, Container } from "@material-ui/core";
import Private from "./routes/private";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";
// import CircularProgress from "@material-ui/core/CircularProgress";
const Public = lazy(() => import("./routes/public"));
// const Private = lazy(() => import("./routes/private"));

const App = ({ Auth, getCurrentUser, isLoading, profile }) => {
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentUser]);

  return (
    <Suspense fallback={<Fragment />}>
      {!Auth && !isLoading ? (
        <>
          <Public />
        </>
      ) : Auth && profile && !isLoading ? (
        <>
          <Private />
        </>
      ) : (
        <Container
          fluid="true"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" size="6rem" />
        </Container>
      )}
      <SnackBar />
    </Suspense>
  );
};

const mapStateToProps = (state) => {
  return {
    Auth: state.User.Auth,
    isLoading: state.User.isLoading,
    profile: state.User.profile,
  };
};

export default connect(mapStateToProps, { getCurrentUser })(App);
