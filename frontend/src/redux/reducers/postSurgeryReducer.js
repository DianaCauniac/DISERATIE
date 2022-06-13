import { postSurgeryConstants } from "../constants";
const {
  // ADD
  ADD_POST_SURGERY_REQ,
  ADD_POST_SURGERY_ERR,
  ADD_POST_SURGERY,
  POST_SURGERY_ADDED,
  // get
  GET_POST_SURGERY_REQ,
  GET_POST_SURGERY_ERR,
  GET_POST_SURGERY,
  // update
  UPDATE_POST_SURGERY_REQ,
  UPDATE_POST_SURGERY_ERR,
  UPDATE_POST_SURGERY,
  // delete
  DELETE_POST_SURGERY_REQ,
  DELETE_POST_SURGERY_ERR,
  DELETE_POST_SURGERY,
} = postSurgeryConstants;
const initialState = {
  // add
  addPostSurgeryLoading: false,
  addPostSurgeryErr: false,
  addPostSurgeryErrText: "",
  postSurgeryAdded: false,
  // get
  getPostSurgeryLoading: false,
  getPostSurgeryErr: false,
  getPostSurgeryErrText: "",
  // update
  updatePostSurgeryLoading: false,
  updatePostSurgeryErr: false,
  updatePostSurgeryErrText: "",
  // delete
  deletePostSurgeryLoading: false,
  deletePostSurgeryErr: false,
  deletePostSurgeryErrText: "",

  postSurgeries: [],
};

export const postSurgeryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add
    case ADD_POST_SURGERY_REQ:
      return {
        ...state,
        addPostSurgeryLoading: true,
      };
    case ADD_POST_SURGERY_ERR:
      return {
        ...state,
        addPostSurgeryLoading: false,
        addPostSurgeryErr: true,
        addPostSurgeryErrText: action.payload,
      };
    case ADD_POST_SURGERY:
      return {
        ...state,
        addPostSurgeryLoading: false,
        addPostSurgeryErr: false,
        addPostSurgeryErrText: "",
        postSurgeries: action.payload.concat(state.postSurgeries),
      };
    case POST_SURGERY_ADDED:
      return {
        ...state,
        postSurgeryAdded: action.payload,
      };
    // get
    case GET_POST_SURGERY_REQ:
      return {
        ...state,
        getPostSurgeryLoading: true,
      };
    case GET_POST_SURGERY_ERR:
      return {
        ...state,
        getPostSurgeryLoading: false,
        getPostSurgeryErr: true,
        getPostSurgeryErrText: action.payload,
      };
    case GET_POST_SURGERY:
      return {
        ...state,
        getPostSurgeryLoading: false,
        getPostSurgeryErr: false,
        getPostSurgeryErrText: "",
        postSurgeries: action.payload,
      };
    // update
    case UPDATE_POST_SURGERY_REQ:
      return {
        ...state,
        updatePostSurgeryLoading: true,
      };
    case UPDATE_POST_SURGERY_ERR:
      return {
        ...state,
        updatePostSurgeryLoading: false,
        updatePostSurgeryErr: true,
        updatePostSurgeryErrText: action.payload,
      };
    case UPDATE_POST_SURGERY:
      return {
        ...state,
        updatePostSurgeryLoading: false,
        updatePostSurgeryErr: true,
        updatePostSurgeryErrText: "",
        postSurgeries: state.postSurgeries.map((item) => {
          if (item._id === action.payload._id) item = action.payload;
          return item;
        }),
      };
    // delete
    case DELETE_POST_SURGERY_REQ:
      return {
        ...state,
        deletePostSurgeryLoading: true,
      };
    case DELETE_POST_SURGERY_ERR:
      return {
        ...state,
        deletePostSurgeryLoading: false,
        deletePostSurgeryErr: true,
        deletePostSurgeryErrText: action.payload,
      };
    case DELETE_POST_SURGERY:
      return {
        ...state,
        deletePostSurgeryLoading: false,
        deletePostSurgeryErr: true,
        deletePostSurgeryErrText: "",
        postSurgeries: state.postSurgeries.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
