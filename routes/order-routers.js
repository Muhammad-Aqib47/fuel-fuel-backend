const express = require('express')
const router = express.Router()
const { getBuyerOrder, createOrder, cancelYourOrder } = require('../controllers/order-controllers')


router.get("/getBuyerOrderStatus", getBuyerOrder)

router.post('/', createOrder)

router.delete('/:id', cancelYourOrder)



module.exports = router