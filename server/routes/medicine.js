const express = require("express");
const {createMedicine, getMedicine, deleteMedicine} = require("../controllers/medicine");

const router = express.Router();

router.post("/create", createMedicine);
router.get("/get", getMedicine);
router.delete("/delete/:id", deleteMedicine);


module.exports = router