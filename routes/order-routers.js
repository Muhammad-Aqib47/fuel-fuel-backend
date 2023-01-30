const express = require('express')
const { getBuyerOrder, createOrder } = require('../controllers/order-controllers')

const router = express.Router()

router.get("/getBuyerOrderStatus", getBuyerOrder)

router.post('/', createOrder)

module.exports = router