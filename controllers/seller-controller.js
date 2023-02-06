const pool = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { sellersTableQueries } = require("../utils/sellers-queries");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } =
  API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED, INCORRECT_CREDENTIALS, LOGGED_IN } =
  RESPONSE_MESSAGES;

const { getAllSellers, checkExistingEmailQuery, createAccountQuery } =
  sellersTableQueries;

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
      res.json(INCORRECT_CREDENTIALS);
    }
    const hashedPassword = await bcrypt.compare(
      password,
      userFind.rows[0].seller_password
    );
    if (hashedPassword === false) {
      res.json(INCORRECT_CREDENTIALS);
    } else {
      console.log(userFind.rows[0]);
      const foundName = userFind.rows[0].seller_name;
      const foundId = userFind.rows[0].seller_id;
      const foundphone = userFind.rows[0].seller_phone;
      const foundemail = userFind.rows[0].seller_email;

      const token = jsonwebtoken.sign({ seller_id: foundId }, SECRET_KEY, {
        expiresIn: 60 * 60,
      });

      res.status(SUCCESS).json({
        message: LOGGED_IN,
        token: token,
        id: foundId,
        name: foundName,
        email: foundemail,
        phone: foundphone,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getsellers, signUp, login };
