const express = require("express");
const {
  createSector,
  updateSector,
  getAllSectors,
  deleteSector,
  deleteTikedSectors,
} = require("../controllers/sector");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createSector);
router.post("/update", requireSignin, updateSector);
router.get("/", getAllSectors);
router.post("/delete-tiked-sectors", requireSignin, deleteTikedSectors);
router.delete("/:_id", requireSignin, deleteSector);

module.exports = router;
