const { pool } = require("../connections/postgre");
const { buyerTableQueries } = require('../utils/buyer-queries')
const {  getCitiesData, getSellersStations, getFuelTypeFromSellers, getFuelPriceFromSellers, deliveredYourOrder, getBuyerOrderStatus } = buyerTableQueries;


//get Cities that where sellers are Available
const getCities = async (req, res) => {
  try {
    const result = await pool.query(getCitiesData);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


// Get sellers Station according to cities
const getSellers = async (req, res) => {
  try {
    const result = await pool.query(getSellersStations, ['Lahore']);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//Filter Fuel Type According to Sellers
const getFuelType = async (req, res) => {
  try {
    const result = await pool.query(getFuelTypeFromSellers, ['barki road']);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//get Fuel price according to Fuel type
const getFuelPrice = async (req, res) => {
  try {
  const result = await pool.query(getFuelPriceFromSellers, ['diseal', 6]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};



// Delivered order from buyer
const deliveredOrder = async (req, res) => {
  const {b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address, b_phone_number, payment_mode } = req.body;
   
  try {
    const result = await pool.query(deliveredYourOrder, [b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address, b_phone_number, payment_mode]);
    
    res.status(200).json({ message: "Your Order has been successfully delivered" });
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

module.exports = {  getCities, getSellers, getFuelType, getFuelPrice, deliveredOrder, getBuyerOrder };
