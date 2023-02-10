const { pool } = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { sellersTableQueries } = require("../utils/sellers-queries");

const {
  getAllSellers,
  checkExistingEmailQuery,
  createAccountQuery,
  getSellerDetails,
  getBuyerOrdersData,
  updateBuyerOrder
} = sellersTableQueries;

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } =
  API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED, INCORRECT_CREDENTIALS, LOGGED_IN, INCORRECT_API_PATH } =
  RESPONSE_MESSAGES;

const getsellers = async (req, res) => {
  try {
    const result = await pool.query(getAllSellers);
    res.status(SUCCESS).json(result.rows);
  } catch (error) {
    throw error;
  }
};
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
    console.log(">>>>>>>>>>>>>>>>", req.body);

    const userFind = await pool.query(checkExistingEmailQuery, [email]);
    if (userFind.rows.length == 0) {
      res.json({ message: INCORRECT_CREDENTIALS });
    }
    const hashedPassword = await bcrypt.compare(
      password,
      userFind.rows[0].seller_password
    );
    if (hashedPassword === false) {
      res.json({ message: INCORRECT_CREDENTIALS });
    } else {
      console.log(userFind.rows[0]);
      const foundId = userFind.rows[0].seller_id;

      const token = jsonwebtoken.sign({ seller_id: foundId }, SECRET_KEY, {
        expiresIn: 60 * 60,
      });

      res.status(SUCCESS).json({
        message: LOGGED_IN,
        token: token,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const validateSeller = async (req, res) => {

  try {
    const authSellerId = req.seller;
    const sellerData = await pool.query(getSellerDetails, [authSellerId]);
    res.json(sellerData.rows[0])

  } catch (error) {
    console.log(error.message)
  }

}


//get orders from buyers
const getBuyerOrders = async (req, res) => {
  try {
    const result = await pool.query(getBuyerOrdersData);
    res.status(SUCCESS).json(result.rows);
  } catch (error) {
    res.status(SUCCESS).json(INCORRECT_API_PATH);
  }
};

//update the order from buyer
const updateOrder = async (req, res) => {
  const id = req.params.id;
  const { order_status } = req.body;
  console.log(order_status)
  try {
    const result = await pool.query(updateBuyerOrder, [order_status, id])
    res.status(SUCCESS).json(result)
  } catch (error) {
    res.status(SUCCESS).json(INCORRECT_API_PATH)

  }
}

module.exports = { getsellers, signUp, login, validateSeller, getBuyerOrders, updateOrder };
