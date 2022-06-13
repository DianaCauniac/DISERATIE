import { combineReducers } from "redux";
import { patientReducer } from "./patientReducer";
import { surgeryReducer } from "./surgeryReducer";
import { postSurgeryReducer } from "./postSurgeryReducer";
import { userReducer, snackbarReducer, navbarReducer } from "./profileReducer";

const CombinedReducers = combineReducers({
  User: userReducer,
  Snackbar: snackbarReducer,
  Navbar: navbarReducer,
  patient: patientReducer,
  surgery: surgeryReducer,
  postSurgery: postSurgeryReducer,
});

export default CombinedReducers;
