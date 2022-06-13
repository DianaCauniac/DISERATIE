import { patientConstants } from "../constants";
const {
  // ADD
  ADD_PATIENT_REQ,
  ADD_PATIENT_ERR,
  ADD_PATIENT,
  PATIENT_ADDED,
  // get
  GET_PATIENT_REQ,
  GET_PATIENT_ERR,
  GET_PATIENT,
  // update
  UPDATE_PATIENT_REQ,
  UPDATE_PATIENT_ERR,
  UPDATE_PATIENT,
  // delete
  DELETE_PATIENT_REQ,
  DELETE_PATIENT_ERR,
  DELETE_PATIENT,
} = patientConstants;
const initialState = {
  // add
  addPatientLoading: false,
  addPatientErr: false,
  addPatientErrText: "",
  patientAdded: false,
  // get
  getPatientLoading: false,
  getPatientErr: false,
  getPatientErrText: "",
  // update
  updatePatientLoading: false,
  updatePatientErr: false,
  updatePatientErrText: "",
  // delete
  deletePatientLoading: false,
  deletePatientErr: false,
  deletePatientErrText: "",

  patients: [],
};

export const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add
    case ADD_PATIENT_REQ:
      return {
        ...state,
        addPatientLoading: true,
      };
    case ADD_PATIENT_ERR:
      return {
        ...state,
        addPatientLoading: false,
        addPatientErr: true,
        addPatientErrText: action.payload,
      };
    case ADD_PATIENT:
      return {
        ...state,
        addPatientLoading: false,
        addPatientErr: false,
        addPatientErrText: "",
        patients: action.payload.concat(state.patients),
      };
    case PATIENT_ADDED:
      return {
        ...state,
        patientAdded: action.payload,
      };
    // get
    case GET_PATIENT_REQ:
      return {
        ...state,
        getPatientLoading: true,
      };
    case GET_PATIENT_ERR:
      return {
        ...state,
        getPatientLoading: false,
        getPatientErr: true,
        getPatientErrText: action.payload,
      };
    case GET_PATIENT:
      return {
        ...state,
        getPatientLoading: false,
        getPatientErr: false,
        getPatientErrText: "",
        patients: action.payload,
      };
    // update
    case UPDATE_PATIENT_REQ:
      return {
        ...state,
        updatePatientLoading: true,
      };
    case UPDATE_PATIENT_ERR:
      return {
        ...state,
        updatePatientLoading: false,
        updatePatientErr: true,
        updatePatientErrText: action.payload,
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        updatePatientLoading: false,
        updatePatientErr: true,
        updatePatientErrText: "",
        patients: state.patients.map((item) => {
          if (item._id === action.payload._id) item = action.payload;
          return item;
        }),
      };
    // delete
    case DELETE_PATIENT_REQ:
      return {
        ...state,
        deletePatientLoading: true,
      };
    case DELETE_PATIENT_ERR:
      return {
        ...state,
        deletePatientLoading: false,
        deletePatientErr: true,
        deletePatientErrText: action.payload,
      };
    case DELETE_PATIENT:
      return {
        ...state,
        deletePatientLoading: false,
        deletePatientErr: true,
        deletePatientErrText: "",
        patients: state.patients.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
