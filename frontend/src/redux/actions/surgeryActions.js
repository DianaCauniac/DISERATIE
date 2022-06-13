import api from "../../utils/api";
import { surgeryConstants, snackBarConstants } from "../constants";
const {
  // ADD
  ADD_SURGERY_REQ,
  ADD_SURGERY_ERR,
  ADD_SURGERY,
  SURGERY_ADDED,
  // GET
  GET_SURGERY_REQ,
  GET_SURGERY_ERR,
  GET_SURGERY,
  // UPDATE
  UPDATE_SURGERY_REQ,
  UPDATE_SURGERY_ERR,
  UPDATE_SURGERY,
  // DELETE
  DELETE_SURGERY_REQ,
  DELETE_SURGERY_ERR,
  DELETE_SURGERY,
} = surgeryConstants;
const { ShowSnack } = snackBarConstants;

export const getSurgeries = (doctor, patient) => async (dispatch) => {
  dispatch({ type: GET_SURGERY_REQ });
  try {
    var res = await api.get(`/surgery/${doctor}/${patient}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data && !res.data.error) {
      dispatch({ type: GET_SURGERY, payload: res.data.surgeries });
    } else {
      dispatch({ type: GET_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: GET_SURGERY_ERR, payload: e.message });
  }
};

export const addNewSurgery = (data) => async (dispatch) => {
  dispatch({ type: ADD_SURGERY_REQ });
  try {
    var res = await api.post("/surgery/create", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.savedSurgery && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Surgery Added successfully",
      });
      dispatch({
        type: ADD_SURGERY,
        payload: [res.data.savedSurgery],
      });
      dispatch({
        type: SURGERY_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: ADD_SURGERY_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: ADD_SURGERY_ERR, payload: e.message });
  }
};

export const updateSurgery = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_SURGERY_REQ });
  try {
    var res = await api.post("/surgery/update", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.updatedSurgery && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Surgery Updated successfully",
      });
      dispatch({
        type: UPDATE_SURGERY,
        payload: res.data.updatedSurgery,
      });
      dispatch({
        type: SURGERY_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: UPDATE_SURGERY_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: UPDATE_SURGERY_ERR, payload: e.message });
  }
};

export const deleteSurgery = (data) => async (dispatch) => {
  dispatch({ type: DELETE_SURGERY_REQ });
  try {
    var res = await api.delete(`/surgery/${data._id}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({ type: ShowSnack, payload: "Surgery deleted successfully" });
      dispatch({ type: DELETE_SURGERY, payload: data });
    } else {
      dispatch({ type: DELETE_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_SURGERY_ERR, payload: e.message });
  }
};

export const deleteTikedSurgeries = (data) => async (dispatch) => {
  dispatch({ type: DELETE_SURGERY_REQ });
  try {
    var res = await api.post("/surgery/delete-tiked-levels", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Tiked Surgeries deleted successfully",
      });
      dispatch({ type: GET_SURGERY, payload: res.data.patients });
    } else {
      dispatch({ type: DELETE_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_SURGERY_ERR, payload: e.message });
  }
};
