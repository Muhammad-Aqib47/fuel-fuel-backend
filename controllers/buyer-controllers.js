const pool = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { buyersTableQueries } = require("../utils/buyers-queries");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } =
  API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED, INCORRECT_CREDENTIALS, LOGGED_IN } =
  RESPONSE_MESSAGES;

const {checkExistingEmailQuery, createAccountQuery } =
  buyersTableQueries;

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
const validateBuyer =async (req,res) => {

  try {
    const buyer = req.buyer;
    console.log(buyer);
    res.json(buyer)

  } catch (error) {
    console.log(error.message)
  }

}
module.exports = {signUp, login, validateBuyer };
