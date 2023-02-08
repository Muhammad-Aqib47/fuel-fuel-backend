const usersTableQueries = {
  createUserQueries: "INSERT INTO userqueries (user_name, user_email, user_query) VALUES ($1, $2, $3)",
};


module.exports = { usersTableQueries };
