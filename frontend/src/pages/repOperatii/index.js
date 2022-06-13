import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientTable from "./components/patientTable";
import PatientForm from "./components/patientForm";
import "./patients.css";
import PatientDetail from "./components/patientDetail";
import DoctorsDropdown from "../doctorsNurses/components/doctorsDropdown";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const RepOp = () => {
  const navigate = useNavigate();
  const _User = useSelector((state) => state.User);
  const [patientFormOpen, setPatientFormOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [detailViewPatient, setDetailViewPatient] = useState(null);
  const handleAddNewPatient = () => {
    setPatientFormOpen(true);
  };
  const handleEditPatient = (patient) => {
    setEditing(true);
    setEditingPatient(patient);
  };
  const handleDetailView = (patient) => {
    setEditing(false);
    setPatientFormOpen(false);
    setDetailView(true);
    setDetailViewPatient(patient);
  };
  return (
    <>
      {detailView ? (
        <PatientDetail
          detailViewPatient={detailViewPatient}
          setDetailView={setDetailView}
        />
      ) : (
        <>
          {patientFormOpen || editing ? (
            <PatientForm
              editing={editing}
              setEditing={setEditing}
              setPatientFormOpen={setPatientFormOpen}
              editingPatient={editingPatient}
            />
          ) : (
            <div className="patients-wrapper">
              <h1 className="patients-title">
                <i
                  className="fal fa-long-arrow-left cup"
                  onClick={() => navigate("/")}
                ></i>
                &nbsp; Pacienti
              </h1>
              {_User.profile.role === "nurse" ? (
                <DoctorsDropdown />
              ) : (
                <div className="add-new-Btn-wrapper">
                  <button onClick={() => handleAddNewPatient()}>Adauga operatie</button>
                </div>
              )}
              <br />
              <br />
              <PatientTable
                handleEditPatient={handleEditPatient}
                handleDetailView={handleDetailView}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RepOp;
