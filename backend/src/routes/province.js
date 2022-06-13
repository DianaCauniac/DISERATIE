const express = require("express");
const {
  createProvince,
  updateProvince,
  getAllProvinces,
  deleteProvince,
  deleteTikedProvinces,
} = require("../controllers/province");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createProvince);
router.post("/update", requireSignin, updateProvince);
router.get("/", getAllProvinces);
router.post("/delete-tiked-provinces", requireSignin, deleteTikedProvinces);
router.delete("/:_id", requireSignin, deleteProvince);

module.exports = router;
