const sellersTableQueries = {
  getAllSellers: "SELECT * FROM sellers",
  checkExistingEmailQuery: "SELECT * FROM sellers WHERE email = $1",
  createAccountQuery :"INSERT INTO sellers(name, email, phone,passward )VALUES($1, $2, $3, $4) RETURNING *"

  };
  
  module.exports = { sellersTableQueries };
  