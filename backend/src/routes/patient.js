const express = require("express");
const {
  createPatient,
  updatePatient,
  getAllPatients,
  deletePatient,
  deleteTikedPatients,
} = require("../controllers/patient");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createPatient);
router.post("/update", requireSignin, updatePatient);
router.get("/:doctor", getAllPatients);
router.post("/delete-tiked-levels", requireSignin, deleteTikedPatients);
router.delete("/:_id", requireSignin, deletePatient);

module.exports = router;
