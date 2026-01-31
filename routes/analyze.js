const express = require("express");
const multer = require("multer");

const router = express.Router();
const analyzeContract=require("../controllers/analyzeController")
// store uploaded files temporarily
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("contract"), analyzeContract);

module.exports = router;
