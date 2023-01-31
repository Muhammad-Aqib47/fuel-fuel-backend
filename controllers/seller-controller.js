const pool = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY} = process.env;

const {
  API_STATUS_CODES,
  RESPONSE_MESSAGES,
} = require("../constants/constants");
const { sellersTableQueries } = require("../utils/sellers-queries");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } =
  API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED } = RESPONSE_MESSAGES;

const { getAllSellers, checkExistingEmailQuery, createAccountQuery } =
  sellersTableQueries;

const getsellers = async (req, res) => {
  try {
    const result = await pool.query(getAllSellers);
    console.log("result here", result);
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
    console.log(">>>>>>>>>>>>>>>>",req.body)

    const userFind = await pool.query(checkExistingEmailQuery, [email]);
    if (userFind.rows.length == 0) {
      res.json(INCORRECT_CREDENTIALS);
    }
    const hashedPassword = await bcrypt.compare(
      password, userFind.rows[0].passward
    );
    if (hashedPassword === false) {
      res.json(INCORRECT_CREDENTIALS);
    } else {
      const foundName = userFind.rows[0].name;
      const foundId = userFind.rows[0].id;
      const token = jsonwebtoken.sign(
        {},
        // id : foundId,name : foundName
        SECRET_KEY,
        { expiresIn: 60 * 60 }
      );
      // console.log(id,name)
      // return res.status(SUCCESS).json(token);

      res.status(200).json({message: "succesfuly logged in", token:token , id : foundId, name:foundName})
      // res.json({ message: "succesfuly logged in" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getsellers, signUp, login };
