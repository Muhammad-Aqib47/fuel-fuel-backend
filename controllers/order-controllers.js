const { buyerTableQueries } = require('../utils/order-queries')
const { pool } = require('../connections/postgre')

const { getBuyerOrderStatus, placeOrder, cancelOrder } = buyerTableQueries

const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constants");

const { SUCCESS } = API_STATUS_CODES;
const { ORDER_SUCCESS, INCORRECT_API_PATH, ORDER_CANCEL } = RESPONSE_MESSAGES

// Create order from buyer
const createOrder = async (req, res) => {
    const { name, selectCity, selectSeller, selectFueltype, fuelPrice, totalPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod } = req.body;
    try {
        const result = await pool.query(placeOrder, [name, selectCity, selectSeller, selectFueltype, fuelPrice, totalPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod]);
        res.status(SUCCESS).json(ORDER_SUCCESS);
    } catch (error) {
        res.json(INCORRECT_API_PATH);
    }
};

// get Buyer order status
const getBuyerOrder = async (req, res) => {
    try {
        const result = await pool.query(getBuyerOrderStatus);
        res.status(SUCCESS).json(result.rows);
    } catch (error) {
        res.status(SUCCESS).json(INCORRECT_API_PATH);
    }
};


//Cancel order
const cancelYourOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(cancelOrder, [id]);
        res.status(SUCCESS).json(result);
    } catch (error) {
        res.status(SUCCESS).json(ORDER_CANCEL)
    }
}



module.exports = { getBuyerOrder, createOrder, cancelYourOrder };
