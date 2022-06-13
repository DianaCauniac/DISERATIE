import api from "../../utils/api";
import { patientConstants, snackBarConstants } from "../constants";
const {
  // ADD
  ADD_PATIENT_REQ,
  ADD_PATIENT_ERR,
  ADD_PATIENT,
  PATIENT_ADDED,
  // GET
  GET_PATIENT_REQ,
  GET_PATIENT_ERR,
  GET_PATIENT,
  // UPDATE
  UPDATE_PATIENT_REQ,
  UPDATE_PATIENT_ERR,
  UPDATE_PATIENT,
  // DELETE
  DELETE_PATIENT_REQ,
  DELETE_PATIENT_ERR,
  DELETE_PATIENT,
} = patientConstants;
const { ShowSnack } = snackBarConstants;

export const getPatients = (doctor) => async (dispatch) => {
  dispatch({ type: GET_PATIENT_REQ });
  try {
    var res = await api.get(`/patient/${doctor}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data && !res.data.error) {
      dispatch({ type: GET_PATIENT, payload: res.data.patients });
    } else {
      dispatch({ type: GET_PATIENT_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: GET_PATIENT_ERR, payload: e.message });
  }
};

export const addNewPatient = (data) => async (dispatch) => {
  dispatch({ type: ADD_PATIENT_REQ });
  try {
    var res = await api.post("/patient/create", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.savedPatient && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Patient Added successfully",
      });
      dispatch({
        type: ADD_PATIENT,
        payload: [res.data.savedPatient],
      });
      dispatch({
        type: PATIENT_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: ADD_PATIENT_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: ADD_PATIENT_ERR, payload: e.message });
  }
};

export const updatePatient = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_PATIENT_REQ });
  try {
    var res = await api.post("/patient/update", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.updatedPatient && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Patient Updated successfully",
      });
      dispatch({
        type: UPDATE_PATIENT,
        payload: res.data.updatedPatient,
      });
      dispatch({
        type: PATIENT_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: UPDATE_PATIENT_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: UPDATE_PATIENT_ERR, payload: e.message });
  }
};

export const deletePatient = (data) => async (dispatch) => {
  dispatch({ type: DELETE_PATIENT_REQ });
  try {
    var res = await api.delete(`/patient/${data._id}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({ type: ShowSnack, payload: "Patient deleted successfully" });
      dispatch({ type: DELETE_PATIENT, payload: data });
    } else {
      dispatch({ type: DELETE_PATIENT_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_PATIENT_ERR, payload: e.message });
  }
};

export const deleteTikedLevels = (data) => async (dispatch) => {
  dispatch({ type: DELETE_PATIENT_REQ });
  try {
    var res = await api.post("/patient/delete-tiked-levels", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Tiked Patients deleted successfully",
      });
      dispatch({ type: GET_PATIENT, payload: res.data.patients });
    } else {
      dispatch({ type: DELETE_PATIENT_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_PATIENT_ERR, payload: e.message });
  }
};
