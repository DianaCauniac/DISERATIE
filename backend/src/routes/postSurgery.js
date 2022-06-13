const express = require("express");
const {
  createPostSurgery,
  updatePostSurgery,
  getAllPostSurgerys,
  deletePostSurgery,
  deleteTikedPostSurgerys,
} = require("../controllers/postSurgery");
const { requireSignin } = require("../middlewares");
const router = express.Router();

router.post("/create", requireSignin, createPostSurgery);
router.post("/update", requireSignin, updatePostSurgery);
router.get("/:doctor/:patient", getAllPostSurgerys);
router.post("/delete-tiked-surgerys", requireSignin, deleteTikedPostSurgerys);
router.delete("/:_id", requireSignin, deletePostSurgery);

module.exports = router;
