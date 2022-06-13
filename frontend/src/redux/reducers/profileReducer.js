import {
  userConstants,
  snackBarConstants,
  navBarConstants,
} from "../constants";
const {
  CU_Req,
  CUErr,
  CUSuc,
  URErr,
  ULErr,
  UProfile,
  UList,
  UListUpt,
  UListDel,
  UData,
  ALL_USERS_REQ,
  ALL_USERS_ERR,
  ALL_USERS,
  PASSWORD_CHANGE_REQ,
  PASSWORD_CHANGE_ERR,
  PASSWORD_CHANGE,
  ALL_DOCTORS,
  ALL_NURSES,
  SELECTED_DOCTOR,
} = userConstants;

const { SETCount } = navBarConstants;
const { ShowSnack, HideSnack } = snackBarConstants;
const initialState = {
  Auth: false,
  isError: false,
  isProfile: false,
  isLoading: false,
  allUsersLoading: false,
  allUsersErr: false,
  passwordChangeReq: false,
  passwordChangeErr: false,
  passwordChangeErrText: "",
  passwordChange: false,
  allUsersErrText: "",
  allUsers: [],
  allDoctors: [],
  allNurses: [],
  selectedDoctor: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // password change start
    case PASSWORD_CHANGE_REQ:
      return {
        ...state,
        passwordChangeReq: true,
      };
    case PASSWORD_CHANGE_ERR:
      return {
        ...state,
        passwordChangeReq: false,
        passwordChangeErr: true,
        passwordChangeErrText: action.payload,
      };
    case PASSWORD_CHANGE:
      return {
        ...state,
        passwordChangeReq: false,
        passwordChangeErr: false,
        passwordChangeErrText: "",
        passwordChange: action.payload,
      };
    // password change end
    case ALL_USERS_REQ:
      return {
        ...state,
        allUsersLoading: true,
      };
    case ALL_USERS_ERR:
      return {
        ...state,
        allUsersLoading: false,
        allUsersErr: true,
        allUsersErrText: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        allUsersLoading: false,
        allUsersErr: false,
        allUsersErrText: "",
        allUsers: action.payload,
      };
    case ALL_DOCTORS:
      return {
        ...state,
        allDoctors: action.payload,
      };
    case ALL_NURSES:
      return {
        ...state,
        allNurses: action.payload,
      };
    case SELECTED_DOCTOR:
      return {
        ...state,
        selectedDoctor: action.payload,
      };
    case CU_Req:
      return {
        ...state,
        isLoading: true,
      };
    case CUErr:
      return {
        ...state,
        Auth: false,
        isLoading: false,
        isProfile: false,
      };
    case CUSuc:
      return {
        ...state,
        Auth: true,
        isLoginError: false,
        isRegError: false,
      };
    case ULErr:
      return {
        ...state,
        isLoginError: true,
        errorText: action.payload,
      };
    case URErr:
      return {
        ...state,
        isRegError: true,
        errorText: action.payload,
      };
    case UProfile:
      return {
        ...state,
        isProfile: true,
        profile: action.payload,
        isLoading: false,
      };
    case UList:
      return {
        ...state,
        list: action.payload,
      };
    case UListDel:
      return {
        ...state,
        list:
          state.list && state.list.length > 0
            ? state.list.filter((item) => item._id !== action.payload)
            : [],
      };
    case UData:
      return {
        ...state,
        details: action.payload,
      };
    case UListUpt:
      return {
        ...state,
        list:
          state.list && state.list.length > 0
            ? state.list.map((item) => {
                if (item._id === action.payload._id) item = action.payload;
                return item;
              })
            : [],
      };
    default:
      return state;
  }
};

export const snackbarReducer = (state = { isShow: false }, action) => {
  switch (action.type) {
    case ShowSnack:
      return {
        ...state,
        isShow: true,
        successText: action.payload,
      };
    case HideSnack:
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export const navbarReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case SETCount:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};
