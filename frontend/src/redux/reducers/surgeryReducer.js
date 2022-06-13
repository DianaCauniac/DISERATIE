import { surgeryConstants } from "../constants";
const {
  // ADD
  ADD_SURGERY_REQ,
  ADD_SURGERY_ERR,
  ADD_SURGERY,
  SURGERY_ADDED,
  // get
  GET_SURGERY_REQ,
  GET_SURGERY_ERR,
  GET_SURGERY,
  // update
  UPDATE_SURGERY_REQ,
  UPDATE_SURGERY_ERR,
  UPDATE_SURGERY,
  // delete
  DELETE_SURGERY_REQ,
  DELETE_SURGERY_ERR,
  DELETE_SURGERY,
} = surgeryConstants;
const initialState = {
  // add
  addSurgeryLoading: false,
  addSurgeryErr: false,
  addSurgeryErrText: "",
  surgeryAdded: false,
  // get
  getSurgeryLoading: false,
  getSurgeryErr: false,
  getSurgeryErrText: "",
  // update
  updateSurgeryLoading: false,
  updateSurgeryErr: false,
  updateSurgeryErrText: "",
  // delete
  deleteSurgeryLoading: false,
  deleteSurgeryErr: false,
  deleteSurgeryErrText: "",

  surgeries: [],
};

export const surgeryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add
    case ADD_SURGERY_REQ:
      return {
        ...state,
        addSurgeryLoading: true,
      };
    case ADD_SURGERY_ERR:
      return {
        ...state,
        addSurgeryLoading: false,
        addSurgeryErr: true,
        addSurgeryErrText: action.payload,
      };
    case ADD_SURGERY:
      return {
        ...state,
        addSurgeryLoading: false,
        addSurgeryErr: false,
        addSurgeryErrText: "",
        surgeries: action.payload.concat(state.surgeries),
      };
    case SURGERY_ADDED:
      return {
        ...state,
        surgeryAdded: action.payload,
      };
    // get
    case GET_SURGERY_REQ:
      return {
        ...state,
        getSurgeryLoading: true,
      };
    case GET_SURGERY_ERR:
      return {
        ...state,
        getSurgeryLoading: false,
        getSurgeryErr: true,
        getSurgeryErrText: action.payload,
      };
    case GET_SURGERY:
      return {
        ...state,
        getSurgeryLoading: false,
        getSurgeryErr: false,
        getSurgeryErrText: "",
        surgeries: action.payload,
      };
    // update
    case UPDATE_SURGERY_REQ:
      return {
        ...state,
        updateSurgeryLoading: true,
      };
    case UPDATE_SURGERY_ERR:
      return {
        ...state,
        updateSurgeryLoading: false,
        updateSurgeryErr: true,
        updateSurgeryErrText: action.payload,
      };
    case UPDATE_SURGERY:
      return {
        ...state,
        updateSurgeryLoading: false,
        updateSurgeryErr: true,
        updateSurgeryErrText: "",
        surgeries: state.surgeries.map((item) => {
          if (item._id === action.payload._id) item = action.payload;
          return item;
        }),
      };
    // delete
    case DELETE_SURGERY_REQ:
      return {
        ...state,
        deleteSurgeryLoading: true,
      };
    case DELETE_SURGERY_ERR:
      return {
        ...state,
        deleteSurgeryLoading: false,
        deleteSurgeryErr: true,
        deleteSurgeryErrText: action.payload,
      };
    case DELETE_SURGERY:
      return {
        ...state,
        deleteSurgeryLoading: false,
        deleteSurgeryErr: true,
        deleteSurgeryErrText: "",
        surgeries: state.surgeries.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
