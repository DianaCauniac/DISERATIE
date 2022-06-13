import React from "react";
import heartbeat from "../../../../assets/heartbeat1.png";
import bloodpressure from "../../../../assets/bloodpressure.jpg";
import hemoglobin from "../../../../assets/hemoglobin2.png";
import sugar from "../../../../assets/sugar.png";
import PatientDetailCard from "./components/patientDetailCard";
import "./patientDetail.css";

const PatientDetail = ({ setDetailView, detailViewPatient }) => {
  const handleBackPress = () => {
    setDetailView(false);
  };
  console.log("detailViewPatient", detailViewPatient);
  return (
    <div>
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => handleBackPress()}
        ></i>
        &nbsp; Informatii pacient
      </h1>
      {/* Tahir Start */}
      <div className="patientDetail-main-wrapper">
        <div className="patientDetail-left">
          <div className="leftSide-main-wrapper">
            <div className="profileInfo">
              <h1 className="avtar-wrapper">
                {detailViewPatient.name.charAt(0).toUpperCase()}
              </h1>
              <div className="name-wrapper">
                <h1>{detailViewPatient.name}</h1>
                <p>{detailViewPatient.age} ani</p>
              </div>
            </div>
            <hr />
            <br />
            <div className="healthDetail">
              <span>
                <p>GR SGANGUINA</p>
                <h2>{detailViewPatient.bloodGroup}</h2>
              </span>
              <span>
                <p>INALTIME</p>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>{detailViewPatient.height}</h2>&nbsp;
                  <span>cm</span>
                </span>
              </span>
              <span>
                <p>GREUTATE</p>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>{detailViewPatient.weight} </h2>
                  &nbsp;
                  <span>kg</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="patientDetail-right">
          <div className="patientCards-wrapper">
            <PatientDetailCard
              value={detailViewPatient.heartBeat}
              unit={"bpm"}
              name={"Heartbeat"}
              image={heartbeat}
            />
            <PatientDetailCard
              value={detailViewPatient.systolicBloodPressure}
              unit={`${detailViewPatient.diastolicBloodPressure} mmHg`}
              name={"Blood Pressure"}
              image={bloodpressure}
            />
            <PatientDetailCard
              value={detailViewPatient.hemoGlobin}
              unit={"gd/L"}
              name={"Hemoglobin"}
              image={hemoglobin}
            />
            <PatientDetailCard
              value={detailViewPatient.sugarLevel}
              unit={"mg/dL"}
              name={"Sugar Level"}
              image={sugar}
            />
          </div>
          <div className="surgres-postsurgres-btn-wrapper">
            <button>Operatii</button>
            <button>Post-operator</button>
          </div>
        </div>
      </div>
      {/* Tahir End */}
    </div>
  );
};

export default PatientDetail;
