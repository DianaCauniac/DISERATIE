import React from 'react'
import './patientDetailCard.css'

const PatientDetailCard = ({value, unit, name, image}) => {
  return (
    <div className="patient-detail-card">
            <h4>{value}&nbsp;<span>{unit}</span></h4>
            <img src={image} alt="icon" />
            <h5>{name}</h5>
          </div>
  )
}

export default PatientDetailCard