const { buyerTableQueries } = require('../utils/order-queries')
const { pool } = require('../connections/postgre')

const { getBuyerOrderStatus, placeOrder, cancelOrder, getBuyerOrdersData, updateBuyerOrder } = buyerTableQueries

// Create order from buyer
const createOrder = async (req, res) => {
    const { name, selectCity, selectSeller, selectFueltype, fuelPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod } = req.body;

    try {
        const result = await pool.query(placeOrder, [name, selectCity, selectSeller, selectFueltype, fuelPrice, fuelQuantity, fuelDeliveryAddress, phoneNumber, selectPaymentMethod]);
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
        res.status(200).json({ message: error });
    }
};


//Cancel order
const cancelYourOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(cancelOrder, [id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(200).json({ message: error })
    }
}

//get orders from buyers for sellers
const getBuyerOrders = async (req, res) => {
    try {
        const result = await pool.query(getBuyerOrdersData);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(200).json({ message: 'failed' });
    }
};

//update the order from buyer
const updateOrder = async (req, res) => {
    const id = req.params.id;
    const { order_status } = req.body;
    console.log(order_status)
    try {
        const result = await pool.query(updateBuyerOrder, [order_status, id])
        res.status(200).json(result)
    } catch (error) {
        res.status(200).json({ message: error })

    }
}

module.exports = { getBuyerOrder, createOrder, cancelYourOrder, getBuyerOrders, updateOrder };
