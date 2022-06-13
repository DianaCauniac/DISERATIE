import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SurgeryTable from "./components/surgeryTable";
import SurgeryForm from "./components/surgeryForm";
import "./surgerys.css";
import SurgeryDetail from "./components/surgeryDetail";
import { useSelector } from "react-redux";

const Surgerys = () => {
  const navigate = useNavigate();
  const _User = useSelector((state) => state.User);
  const [surgeryFormOpen, setSurgeryFormOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [editingSurgery, setEditingSurgery] = useState(null);
  const [detailViewSurgery, setDetailViewSurgery] = useState(null);
  const handleAddNewSurgery = () => {
    setSurgeryFormOpen(true);
  };
  const handleEditSurgery = (surgery) => {
    setEditing(true);
    setEditingSurgery(surgery);
  };
  const handleDetailView = (surgery) => {
    setEditing(false);
    setSurgeryFormOpen(false);
    setDetailView(true);
    setDetailViewSurgery(surgery);
  };
  return (
    <>
      {detailView ? (
        <SurgeryDetail
          detailViewSurgery={detailViewSurgery}
          setDetailView={setDetailView}
        />
      ) : (
        <>
          {surgeryFormOpen || editing ? (
            <SurgeryForm
              editing={editing}
              setEditing={setEditing}
              setSurgeryFormOpen={setSurgeryFormOpen}
              editingSurgery={editingSurgery}
            />
          ) : (
            <div className="patients-wrapper">
              <h1 className="patients-title">
                <i
                  className="fal fa-long-arrow-left cup"
                  onClick={() => navigate("/patients")}
                ></i>
                &nbsp; Operatii
              </h1>
              {_User.profile.role !== "nurse" ? (
                <div className="add-new-Btn-wrapper">
                  <button onClick={() => handleAddNewSurgery()}>Adauga</button>
                </div>
              ) : null}
              <br />
              <br />
              <SurgeryTable
                handleEditSurgery={handleEditSurgery}
                handleDetailView={handleDetailView}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Surgerys;
