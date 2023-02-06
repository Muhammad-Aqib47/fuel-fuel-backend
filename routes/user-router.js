const express = require("express")
const router = express.Router()
const { createQuery } = require("../controllers/user-controllers");



router.post("/", createQuery);

module.exports = router;
