const express = require("express")
const router = express.Router()
const { createquery } = require("../controllers/user-controllers");



router.post("/", createquery);

module.exports = router;
