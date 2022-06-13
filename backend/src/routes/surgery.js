const express = require("express");
const {
  createSurgery,
  updateSurgery,
  getAllSurgerys,
  deleteSurgery,
  deleteTikedSurgerys,
} = require("../controllers/surgery");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createSurgery);
router.post("/update", requireSignin, updateSurgery);
router.get("/:doctor/:patient", getAllSurgerys);
router.post("/delete-tiked-surgerys", requireSignin, deleteTikedSurgerys);
router.delete("/:_id", requireSignin, deleteSurgery);

module.exports = router;
