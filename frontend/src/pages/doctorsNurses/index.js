import React from "react";
import UserTable from "./components/userTable";
import { useNavigate } from "react-router-dom";
import "./doctorsNurses.css";
import DoctorsDropdown from "./components/doctorsDropdown";

const DoctorsNurses = () => {
  const navigate = useNavigate();
  return (
    <div className="user-Management-wrapper">
      <h1 className="user-management-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => navigate("/")}
        ></i>
        &nbsp; Doctori/Asistenti
      </h1>
      <DoctorsDropdown />
      <br />
      <br />
      <UserTable />
    </div>
  );
};

export default DoctorsNurses;
