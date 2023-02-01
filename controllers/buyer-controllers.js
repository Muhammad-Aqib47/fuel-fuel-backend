const pool = require("../connections/postgre");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { SECRET_KEY} = process.env;



const { API_STATUS_CODES, RESPONSE_MESSAGES,} = require("../constants/constants");
const { buyersTableQueries } = require("../utils/buyers-queries");

const { SUCCESS, DUPLICATE_ENTRY_CODE, AUTHORIZATION_FAILED } = API_STATUS_CODES;

const { DUPLICATE_ENTRY, ACCOUNT_CREATED ,INCORRECT_CREDENTIALS,LOGGED_IN} = RESPONSE_MESSAGES;

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
    console.log("controller>>>>>>>>>>>>>>>>>>", req.body);
    const { name, email, phone, password } = req.body;
    const checkExistingEmail = await pool.query(checkExistingEmailQuery, [email]);
    if (checkExistingEmail.rows.length != 0) {
      res.status(DUPLICATE_ENTRY_CODE).json(DUPLICATE_ENTRY);
    } else {
      console.log("inside else", password)
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashpassword:>>>>>>>>>>>>>", hashedPassword);
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
      res.json({message:INCORRECT_CREDENTIALS});
    }
    const hashedPassword = await bcrypt.compare(
      password, userFind.rows[0].buyer_password
    );
    if (hashedPassword === false) {
      res.json({message:INCORRECT_CREDENTIALS});
    } else {
      console.log(userFind.rows[0])
      const foundName = userFind.rows[0].buyer_name;
      const foundId = userFind.rows[0].buyer_id;
      const foundphone = userFind.rows[0].buyer_phone
      const foundemail = userFind.rows[0].buyer_email

      const token = jsonwebtoken.sign(
        {},
        // id : foundId,name : foundName
        SECRET_KEY,
        { expiresIn: 60 * 60 }
      );
      // console.log(id,name)
      // return res.status(SUCCESS).json({token :token}); 
    
     
      
      res.status(SUCCESS).json({message : LOGGED_IN, token:token , id :foundId,name : foundName, email:foundemail, phone:foundphone})
      // res.json(LOGGED_IN);
    }
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = { getBuyers, signUp, login };
