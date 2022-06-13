const express = require("express");
const {
  signup,
  signin,
  profile,
  details,
  update_Password,
  getuserbyid,
  new_password,
  reset_Password,
  updateProfile,
  allUsers,
  handleApprove,
  allDoctors,
  allDoctorsByNurse,
  allNurses,
  handleNurseAssignment,
} = require("../controllers/auth");
const {
  validateSignupRequest,
  isRequestValidated,
} = require("../validators/auth");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", signin);
router.post("/update_user_profile", requireSignin, updateProfile);
router.post("/update_password", requireSignin, update_Password);
router.post("/handleApprove", requireSignin, handleApprove);
router.post("/handleNurseAssignment", requireSignin, handleNurseAssignment);
router.get("/profile", requireSignin, profile);
router.get("/details/:_id", requireSignin, details);
router.get("/all_users", requireSignin, allUsers);
router.get("/allDoctors", requireSignin, allDoctors);
router.get("/allDoctorsByNurse/:nurse", requireSignin, allDoctorsByNurse);
router.get("/allNurses", requireSignin, allNurses);
router.get("/userById/:userId", getuserbyid);

router.post("/reset-password", reset_Password);

router.post("/new-password", new_password);

module.exports = router;
