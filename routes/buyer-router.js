const express = require('express');
const { getCities, getSellers, getFuelType, getFuelPrice } = require('../controllers/buyer-controllers');

const router = express.Router()

router.get("/getCities", getCities)

router.get("/getSellers/:cityName", getSellers)

router.get("/getFuelType/:fuelType", getFuelType)

router.get("/getFuelprice/:fuelPrice", getFuelPrice)

module.exports = router;