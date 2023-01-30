const { buyerOrderTableQueries } = require('../utils/order-queries')
const { pool } = require('../connections/postgre')

const { getBuyerOrderStatus, deliveredYourOrder } = buyerOrderTableQueries

// Create order from buyer
const createOrder = async (req, res) => {
    const { name, selectCity, selectSeller, selectFueltype, fuelPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod } = req.body;

    try {
        const result = await pool.query(deliveredYourOrder, [name, selectCity, selectSeller, selectFueltype, fuelPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod]);
        res.status(200).json({ message: "Your Order has been successfully done" });
    } catch (error) {
        res.json({ message: error });
    }
};

// get Buyer order status
const getBuyerOrder = async (req, res) => {
    try {
        const result = await pool.query(getBuyerOrderStatus);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log("REQ HERE", error);
        res.status(200).json({ message: error });
    }
};


module.exports = { getBuyerOrder, createOrder };
