const { usersTableQueries } = require("../utils/user-queries");
const { pool } = require("../connections/postgre");
const { createUserQueries } = usersTableQueries;
const { API_STATUS_CODES, RESPONSE_MESSAGES } = require("../constants/constants");
const { SUCCESS } = API_STATUS_CODES;
const { CREATE_QUERY } = RESPONSE_MESSAGES

const createQuery = async (req, res) => {
  const { name, email, query } = req.body;

  try {
    const result = await pool.query(createUserQueries, [name, email, query])
    res.status(SUCCESS).json({ message: CREATE_QUERY });

  }
  catch (error) {
    res.json({ message: error });
  }
};

module.exports = { createQuery };
