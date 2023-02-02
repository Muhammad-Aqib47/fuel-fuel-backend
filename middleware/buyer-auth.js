const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../connections/postgre");
const { buyersTableQueries } = require("../utils/buyers-queries");
const { getBuyerDetails } = buyersTableQueries;
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { AUTHORIZATION_FAILED_CODE } = API_STATUS_CODES;

const { AUTHORIZATION_FAILED } = RESPONSE_MESSAGES;

const buyerAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let payLoad = jwt.verify(token, process.env.SECRET_KEY);
      const buyerData = await pool.query(getBuyerDetails, [payLoad.buyer_id]);
      console.log(buyerData.rows[0].buyer_name);
    } else {
      res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
  }
};

module.exports = buyerAuth;
