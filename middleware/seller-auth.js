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

const sellerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const payLoad = jwt.verify(token, process.env.SECRET_KEY);
      const getAuthSellerId = payLoad.seller_id;
      req.seller = getAuthSellerId;
      next();
    } else {
      return res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
    }
  } catch (error) {
    return res.status(AUTHORIZATION_FAILED_CODE).json(AUTHORIZATION_FAILED);
  }
};

module.exports = sellerAuth;
