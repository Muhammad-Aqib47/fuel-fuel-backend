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
  const { cityName } = req.params;
  try {
    const result = await pool.query(getSellersStations, [cityName]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//Filter Fuel Type According to Sellers
const getFuelType = async (req, res) => {
  const { fuelType } = req.params;
  try {
    const result = await pool.query(getFuelTypeFromSellers, [fuelType]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};


//get Fuel price according to Fuel type
const getFuelPrice = async (req, res) => {
  const { fuelPrice } = req.params;
  try {
    const result = await pool.query(getFuelPriceFromSellers, [fuelPrice]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(200).json({ message: error });
  }
};







module.exports = { getCities, getSellers, getFuelType, getFuelPrice };
