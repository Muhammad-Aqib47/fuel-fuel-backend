const pool = require("../connections/postgre");
const { API_STATUS_CODES } = require("../constants/constants");
const { usersTableQueries } = require("../utils/queries");

const { SUCCESS, NOT_FOUND, AUTHORIZATION_FAILED } = API_STATUS_CODES;
const { getAllUsersQuery } = usersTableQueries;

const getAllUsers = async (req, res) => {
  console.log("Request arrived in getAllUsers controllers");
  try {
    const result = await pool.query(getAllUsersQuery);
    console.log("result here", result);
    res.status(SUCCESS).json(result.rows);
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllUsers };
