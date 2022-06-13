import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorsNurses from "../pages/doctorsNurses";
import Home from "../pages/home";
import Patients from "../pages/patients";
import PostSurgerys from "../pages/postSurgerys";
import Surgerys from "../pages/surgerys";
import UserManagement from "../pages/userManagement";

const Private = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/doctor-nurses" element={<DoctorsNurses />} />
      <Route path="/doctor-nurses" element={<DoctorsNurses />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/surgries/:doctor/:patient" element={<Surgerys />} />
      <Route
        path="/post-surgries/:doctor/:patient"
        element={<PostSurgerys />}
      />
    </Routes>
  );
};

export default Private;
