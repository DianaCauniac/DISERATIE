import React, { useEffect, useState } from "react";
import heartbeat from "../../../../assets/heartbeat1.png";
import bloodpressure from "../../../../assets/bloodpressure.jpg";
import hemoglobin from "../../../../assets/hemoglobin2.png";
import sugar from "../../../../assets/sugar.png";
import PatientDetailCard from "./components/patientDetailCard";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import "./patientDetail.css";

const PatientDetail = ({ setDetailView, detailViewPatient }) => {
  const navigate = useNavigate();
  const [csvArray, setCsvArray] = useState([]);
  const handleBackPress = () => {
    setDetailView(false);
  };
  const goToSurgries = () => {
    navigate(`/surgries/${detailViewPatient.doctor}/${detailViewPatient._id}`);
  };
  const goToPostSurgries = () => {
    navigate(
      `/post-surgries/${detailViewPatient.doctor}/${detailViewPatient._id}`
    );
  };
  console.log("detailViewPatient", detailViewPatient);
  const headers = [
    { label: "Sala nr", key: "name" },
    { label: "Data", key: "age" },
    { label: "Sala ocupata (ore)", key: "bloodGroup" },
    { label: "Nume doctor", key: "height" },
    { label: "Nume pacient", key: "weight" },
    { label: "Denumire operatie", key: "heartBeat" },
  ];

  const getCsvArray = () => {
    let tempcsvArray = [];
    let sameData = {
      name: detailViewPatient.name,
      age: detailViewPatient.age,
      bloodGroup: detailViewPatient.bloodGroup,
      height: detailViewPatient.height,
      weight: detailViewPatient.weight,
      heartBeat: detailViewPatient.heartBeat,
      systolicBloodPressure: detailViewPatient.systolicBloodPressure,
      diastolicBloodPressure: detailViewPatient.diastolicBloodPressure,
      hemoGlobin: detailViewPatient.hemoGlobin,
      sugarLevel: detailViewPatient.sugarLevel,
    };
    tempcsvArray.push(sameData);
    setCsvArray(tempcsvArray);
  };

  useEffect(() => {
    getCsvArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="patients-title">
        <i
          className="fal fa-long-arrow-left cup"
          onClick={() => handleBackPress()}
        ></i>
        &nbsp; Detalii pacienti
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
                <p>Gr sanguina</p>
                <h2>{detailViewPatient.bloodGroup}</h2>
              </span>
              <span>
                <p>Inaltime</p>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>{detailViewPatient.height}</h2>&nbsp;
                  <span>cm</span>
                </span>
              </span>
              <span>
                <p>Greutate</p>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <h2>{detailViewPatient.weight} </h2>
                  &nbsp;
                  <span>kg</span>
                </span>
              </span>
            </div>
            <div className="download-link">
              <CSVLink data={csvArray} headers={headers} separator={";"}>
                Descarca raport
              </CSVLink>
            </div>
          </div>
        </div>
        <div className="patientDetail-right">
          <div className="patientCards-wrapper">
            <PatientDetailCard
              value={detailViewPatient.heartBeat}
              unit={"bpm"}
              name={"Ritm cardiac"}
              image={heartbeat}
            />
            <PatientDetailCard
              value={detailViewPatient.systolicBloodPressure}
              unit={`${detailViewPatient.diastolicBloodPressure} mmHg`}
              name={"Presiune sange"}
              image={bloodpressure}
            />
            <PatientDetailCard
              value={detailViewPatient.hemoGlobin}
              unit={"gd/L"}
              name={"Hemoglobina"}
              image={hemoglobin}
            />
            <PatientDetailCard
              value={detailViewPatient.sugarLevel}
              unit={"mg/dL"}
              name={"Nivel Zahar"}
              image={sugar}
            />
          </div>
          <div className="surgres-postsurgres-btn-wrapper">
            <button onClick={() => goToSurgries()}>Operatii</button>
            <button onClick={() => goToPostSurgries()}>Post-operator</button>
          </div>
        </div>
      </div>
      {/* Tahir End */}
    </div>
  );
};

export default PatientDetail;
