import api from "../../utils/api";
import { postSurgeryConstants, snackBarConstants } from "../constants";
const {
  // ADD
  ADD_POST_SURGERY_REQ,
  ADD_POST_SURGERY_ERR,
  ADD_POST_SURGERY,
  POST_SURGERY_ADDED,
  // GET
  GET_POST_SURGERY_REQ,
  GET_POST_SURGERY_ERR,
  GET_POST_SURGERY,
  // UPDATE
  UPDATE_POST_SURGERY_REQ,
  UPDATE_POST_SURGERY_ERR,
  UPDATE_POST_SURGERY,
  // DELETE
  DELETE_POST_SURGERY_REQ,
  DELETE_POST_SURGERY_ERR,
  DELETE_POST_SURGERY,
} = postSurgeryConstants;
const { ShowSnack } = snackBarConstants;

export const getPostSurgeries = (doctor, patient) => async (dispatch) => {
  dispatch({ type: GET_POST_SURGERY_REQ });
  try {
    var res = await api.get(`/postSurgery/${doctor}/${patient}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data && !res.data.error) {
      dispatch({ type: GET_POST_SURGERY, payload: res.data.postSurgeries });
    } else {
      dispatch({ type: GET_POST_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: GET_POST_SURGERY_ERR, payload: e.message });
  }
};

export const addNewPostSurgery = (data) => async (dispatch) => {
  dispatch({ type: ADD_POST_SURGERY_REQ });
  try {
    var res = await api.post("/postSurgery/create", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.savedPostSurgery && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Post Surgery Added successfully",
      });
      dispatch({
        type: ADD_POST_SURGERY,
        payload: [res.data.savedPostSurgery],
      });
      dispatch({
        type: POST_SURGERY_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: ADD_POST_SURGERY_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: ADD_POST_SURGERY_ERR, payload: e.message });
  }
};

export const updatePostSurgery = (data) => async (dispatch) => {
  dispatch({ type: UPDATE_POST_SURGERY_REQ });
  try {
    var res = await api.post("/postSurgery/update", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (res.data.updatedPostSurgery && !res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Post Surgery Updated successfully",
      });
      dispatch({
        type: UPDATE_POST_SURGERY,
        payload: res.data.updatedPostSurgery,
      });
      dispatch({
        type: POST_SURGERY_ADDED,
        payload: true,
      });
    } else {
      dispatch({
        type: UPDATE_POST_SURGERY_ERR,
        payload: res.data.error,
      });
    }
  } catch (e) {
    dispatch({ type: UPDATE_POST_SURGERY_ERR, payload: e.message });
  }
};

export const deletePostSurgery = (data) => async (dispatch) => {
  dispatch({ type: DELETE_POST_SURGERY_REQ });
  try {
    var res = await api.delete(`/postSurgery/${data._id}`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Post Surgery deleted successfully",
      });
      dispatch({ type: DELETE_POST_SURGERY, payload: data });
    } else {
      dispatch({ type: DELETE_POST_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_POST_SURGERY_ERR, payload: e.message });
  }
};

export const deleteTikedPostSurgeries = (data) => async (dispatch) => {
  dispatch({ type: DELETE_POST_SURGERY_REQ });
  try {
    var res = await api.post("/postSurgery/delete-tiked-levels", data, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    });
    if (!res.data.error) {
      dispatch({
        type: ShowSnack,
        payload: "Tiked Surgeries deleted successfully",
      });
      dispatch({ type: GET_POST_SURGERY, payload: res.data.patients });
    } else {
      dispatch({ type: DELETE_POST_SURGERY_ERR, payload: res.data.error });
    }
  } catch (e) {
    dispatch({ type: DELETE_POST_SURGERY_ERR, payload: e.message });
  }
};
