const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../connections/postgre");
const { sellersTableQueries } = require("../utils/sellers-queries");
const { getSellerDetails } = sellersTableQueries;
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { AUTHORIZATION_FAILED_CODE } = API_STATUS_CODES;

const { AUTHORIZATION_FAILED } = RESPONSE_MESSAGES;

const sellerAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let payLoad = jwt.verify(token, process.env.SECRET_KEY);
      const sellerData = await pool.query(getSellerDetails, [payLoad.seller_id]);
      console.log(sellerData.rows[0].seller_name);
    } else {
      res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
  }
};

module.exports = sellerAuth;
