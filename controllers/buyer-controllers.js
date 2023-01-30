const { pool } = require("../connections/postgre");
const { buyerTableQueries } = require('../utils/buyer-queries')
const { getCitiesData, getSellersStations, getFuelTypeFromSellers, getFuelPriceFromSellers } = buyerTableQueries;


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
    const result = await pool.query(getSellersStations, ['peshawar']);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//Filter Fuel Type According to Sellers
const getFuelType = async (req, res) => {
  try {
    const result = await pool.query(getFuelTypeFromSellers, ['saddar road str.12']);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//get Fuel price according to Fuel type
const getFuelPrice = async (req, res) => {
  try {
    const result = await pool.query(getFuelPriceFromSellers, ['petrol']);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};







module.exports = { getCities, getSellers, getFuelType, getFuelPrice };
