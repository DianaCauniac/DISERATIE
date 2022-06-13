import React from "react";
import "./surgeryDetail.css";

const SurgeryDetail = ({ detailViewSurgery, setDetailView }) => {
  return (
    <div className="surgeryDetail-wrapper">
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => setDetailView(false)}
        ></i>
        &nbsp; Detalii operatie
      </h1>
      <div className="detail-wrapper">
        <h1 className="detail-title">Denumire operatie:</h1>
        <p className="detail-desc">{detailViewSurgery.nameOfSurgery}</p>
        <h1 className="detail-title">Dificultate:</h1>
        <p className="detail-desc">{detailViewSurgery.dificulty}</p>
        <h1 className="detail-title">Nr. pasi:</h1>
        <p className="detail-desc">{detailViewSurgery.noOfSteps}</p>
        <h1 className="detail-title">Informatii:</h1>
        <p className="detail-desc">{detailViewSurgery.infoBesidesSteps}</p>
      </div>
    </div>
  );
};

export default SurgeryDetail;
