const express = require('express');
const { getCities, getSellers, getFuelType, getFuelPrice, deliveredOrder, getBuyerOrder } = require('../controllers/buyer-controllers');

const router = express.Router()

router.get("/getCities", getCities)

router.get("/getSellers", getSellers)

router.get("/getFuelType", getFuelType)

router.get("/getFuelprice", getFuelPrice)

module.exports = router;