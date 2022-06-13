import React from "react";
import "./surgeryDetail.css";

const PostSurgeryDetail = ({ detailViewPostSurgery, setDetailView }) => {
  return (
    <div className="surgeryDetail-wrapper">
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => setDetailView(false)}
        ></i>
        &nbsp; Detalii post-operatorii
      </h1>
      <div className="detail-wrapper">
        <h1 className="detail-title">Nr zile de recuperare:</h1>
        <p className="detail-desc">{detailViewPostSurgery.noOfDaysToRecover}</p>
        <h1 className="detail-title">Medicamente:</h1>
        <p className="detail-desc">{detailViewPostSurgery.medicines}</p>
        <h1 className="detail-title">Tratament:</h1>
        <p className="detail-desc">{detailViewPostSurgery.specialTreatment}</p>
      </div>
    </div>
  );
};

export default PostSurgeryDetail;
