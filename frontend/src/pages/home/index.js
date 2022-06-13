import React from "react";
import homebg from "../../assets/homebg.jpg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/userActions";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const _User = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logOut());
    navigate("/signin");
    window.location.reload();
  };
  console.log("_User.profile", _User.profile);
  console.log("_User.profile.approve", _User.profile.approve);
  return (
    <div
      styles={{ backgroundImage: `url(${homebg})` }}
      className="home-wrapper"
    >
      <h1 className="home-title">
        {_User.profile.approve ? "Acasa" : "Asteapta aprobarea administratorului..."}
      </h1>
      {_User.profile.approve ? (
        <>
          <div className="home-banner">
            <div className="left-links">
              {_User.profile.role === "admin" ? (
                <button onClick={() => navigate("/user-management")}>
                  Gestionare Utilizatori
                </button>
              ) : null}
              {_User.profile.role !== "admin" ? (
                <button onClick={() => navigate("/patients")}>Pacienti</button>
              ) : null}
              {_User.profile.role == "admin" ? (
                <button onClick={() => navigate("/patients")}>Repartizare operatii</button>
              ) : null}
            </div>
            <div className="right-links">
              {_User.profile.role === "admin" ? (
                <button onClick={() => navigate("/doctor-nurses")}>
                  Doctori/Asistenti
                </button>
              ) : null}
              {_User.profile.role == "admin" ? (
                <button onClick={() => navigate("/patients")}>Raport medici</button>
              ) : null}
              <button className="logout-btn" onClick={() => logoutUser()}>
                Iesire
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="home-banner">
          <div className="left-links"></div>
          <div className="right-links">
            <button className="logout-btn" onClick={() => logoutUser()}>
            Iesire
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
