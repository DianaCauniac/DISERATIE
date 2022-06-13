const express = require("express");
const {
  createProgramtype,
  updateProgramtype,
  getAllProgramtypes,
  deleteProgramtype,
  deleteTikedProgramtypes,
} = require("../controllers/programtype");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createProgramtype);
router.post("/update", requireSignin, updateProgramtype);
router.get("/", getAllProgramtypes);
router.post(
  "/delete-tiked-programtypes",
  requireSignin,
  deleteTikedProgramtypes
);
router.delete("/:_id", requireSignin, deleteProgramtype);

module.exports = router;
