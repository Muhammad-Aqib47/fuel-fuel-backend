const pool = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY} = process.env;


const { API_STATUS_CODES, RESPONSE_MESSAGES,} = require("../constants/constants");
const { buyersTableQueries } = require("../utils/buyers-queries");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } = API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED ,INCORRECT_CREDENTIALS} = RESPONSE_MESSAGES;

const { getAllBuyers, checkExistingEmailQuery, createAccountQuery } = buyersTableQueries;

const getBuyers = async (req, res) => {
  try {
    const result = await pool.query(getAllBuyers);
    res.status(SUCCESS).json(result.rows);
  } catch (error) {
    throw error;
  }
};
const signUp = async (req, res) => {
  try {
    const { name, email, phone, passward } = req.body;
    const checkExistingEmail = await pool.query(checkExistingEmailQuery, [email]);
    if (checkExistingEmail.rows.length != 0) {
      res.status(DUPLICATE_ENTRY_CODE).json(DUPLICATE_ENTRY);
    } else {
      const hashedPassword = await bcrypt.hash(passward, 10);
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
    const { email, passward } = req.body;
    const userFind = await pool.query(checkExistingEmailQuery, [email]);
    if (userFind.rows.length == 0) {
      res.json(INCORRECT_CREDENTIALS);
    }
    const hashedPassword = await bcrypt.compare(
      passward, userFind.rows[0].passward
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
      return res.status(SUCCESS).json(token);

      // res.status(200).json({message: "succesfuly logged in", token:token , id : foundId, name:foundName})
      // res.json({ message: "succesfuly logged in" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getBuyers, signUp, login };
