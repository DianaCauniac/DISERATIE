import React from "react";
import UserTable from "./components/userTable";
import { useNavigate } from "react-router-dom";
import "./userManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();
  return (
    <div className="user-Management-wrapper">
      <h1 className="user-management-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => navigate("/")}
        ></i>
        &nbsp; Gestionare utilizatori
      </h1>
      <UserTable />
    </div>
  );
};

export default UserManagement;
