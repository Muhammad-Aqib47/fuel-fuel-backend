const { pool } = require("../connections/postgre");
const { buyerTableQueries } = require('../utils/buyer-queries')
const { getCitiesData, getSellersStations, getFuelTypeFromSellers, getFuelPriceFromSellers, checkExistingEmailQuery, createAccountQuery, getBuyerDetails } = buyerTableQueries;
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

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


const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } =
  API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED, INCORRECT_CREDENTIALS, LOGGED_IN } =
  RESPONSE_MESSAGES;


const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const checkExistingEmail = await pool.query(checkExistingEmailQuery, [
      email,
    ]);
    if (checkExistingEmail.rows.length != 0) {
      res.status(DUPLICATE_ENTRY_CODE).json(DUPLICATE_ENTRY);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(createAccountQuery, [
        name,
        email,
        phone,
        hashedPassword,
      ]);
      return res.status(SUCCESS).json(ACCOUNT_CREATED);
    }
  } catch (error) {
    console.log(error.message);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFind = await pool.query(checkExistingEmailQuery, [email]);
    if (userFind.rows.length == 0) {
      res.json({ message: INCORRECT_CREDENTIALS });
    }
    const hashedPassword = await bcrypt.compare(
      password,
      userFind.rows[0].buyer_password
    );
    if (hashedPassword === false) {
      res.json({ message: INCORRECT_CREDENTIALS });
    } else {
      const foundId = userFind.rows[0].buyer_id;
      const token = jsonwebtoken.sign(
        { buyer_id: foundId },
        SECRET_KEY,
        { expiresIn: 60 * 60 }
      );

      res
        .status(SUCCESS)
        .json({
          message: LOGGED_IN,
          token: token,
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const validateBuyer = async (req, res) => {

  try {
    const authBuyerId = req.buyer;
    const buyerData = await pool.query(getBuyerDetails, [authBuyerId]);
    res.json(buyerData.rows[0])

  } catch (error) {
    console.log(error.message)
  }

}


module.exports = { getCities, getSellers, getFuelType, getFuelPrice, signUp, login, validateBuyer };
