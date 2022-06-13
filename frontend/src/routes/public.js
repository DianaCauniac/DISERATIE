import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";

const Public = () => {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Public;
