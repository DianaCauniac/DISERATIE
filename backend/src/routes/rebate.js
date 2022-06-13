const express = require("express");
const {
  createRebate,
  updateRebate,
  getAllRebates,
  deleteRebate,
  deleteTikedRebates,
  getRebateData,
} = require("../controllers/rebate");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createRebate);
router.post("/update", requireSignin, updateRebate);
router.get("/", getAllRebates);
router.post("/search-data", getRebateData);
router.post("/delete-tiked-rebates", requireSignin, deleteTikedRebates);
router.delete("/:_id", requireSignin, deleteRebate);

module.exports = router;
