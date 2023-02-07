const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../connections/postgre");
const { buyerTableQueries } = require("../utils/buyer-queries");
const { getBuyerDetails } = buyerTableQueries;
const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { AUTHORIZATION_FAILED_CODE } = API_STATUS_CODES;

const { AUTHORIZATION_FAILED } = RESPONSE_MESSAGES;

const buyerAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const payLoad = jwt.verify(token, process.env.SECRET_KEY);
      const getAuthBuyerId = payLoad.buyer_id
      req.buyer = getAuthBuyerId
      next();
    } else {
      return res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
    }
  } catch (error) {
    return res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
  }
};

module.exports = buyerAuth;
