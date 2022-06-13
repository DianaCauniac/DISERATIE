import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostSurgeryTable from "./components/postSurgeryTable";
import PostSurgeryForm from "./components/postSurgeryForm";
import "./surgerys.css";
import PostSurgeryDetail from "./components/postSurgeryDetail";
import { useSelector } from "react-redux";

const PostSurgerys = () => {
  const navigate = useNavigate();
  const _User = useSelector((state) => state.User);
  const [postSurgeryFormOpen, setPostSurgeryFormOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const [editingPostSurgery, setEditingPostSurgery] = useState(null);
  const [detailViewPostSurgery, setDetailViewPostSurgery] = useState(null);
  const handleAddNewPostSurgery = () => {
    setPostSurgeryFormOpen(true);
  };
  const handleEditPostSurgery = (surgery) => {
    setEditing(true);
    setEditingPostSurgery(surgery);
  };
  const handleDetailView = (postSurgery) => {
    setEditing(false);
    setPostSurgeryFormOpen(false);
    setDetailView(true);
    setDetailViewPostSurgery(postSurgery);
  };
  return (
    <>
      {detailView ? (
        <PostSurgeryDetail
          detailViewPostSurgery={detailViewPostSurgery}
          setDetailView={setDetailView}
        />
      ) : (
        <>
          {postSurgeryFormOpen || editing ? (
            <PostSurgeryForm
              editing={editing}
              setEditing={setEditing}
              setPostSurgeryFormOpen={setPostSurgeryFormOpen}
              editingPostSurgery={editingPostSurgery}
            />
          ) : (
            <div className="patients-wrapper">
              <h1 className="patients-title">
                <i
                  className="fal fa-long-arrow-left cup"
                  onClick={() => navigate("/patients")}
                ></i>
                &nbsp; Post-operator
              </h1>
              {_User.profile.role !== "nurse" ? (
                <div className="add-new-Btn-wrapper">
                  <button onClick={() => handleAddNewPostSurgery()}>
                    Adauga
                  </button>
                </div>
              ) : null}
              <br />
              <br />
              <PostSurgeryTable
                handleEditPostSurgery={handleEditPostSurgery}
                handleDetailView={handleDetailView}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostSurgerys;
