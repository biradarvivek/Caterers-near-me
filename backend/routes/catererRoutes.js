const express = require("express");

const router = express.Router();

const {
  getAllCaterers,
  getCatererById,
  createCaterer,
} = require("../controllers/catererController");

router.get("/", getAllCaterers);

router.get("/:id", getCatererById);

router.post("/", createCaterer);

module.exports = router;
