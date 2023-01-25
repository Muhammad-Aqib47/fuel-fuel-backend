const sellersTableQueries = {
  getAllSellers: "SELECT * FROM sellers",
  checkExistingEmailQuery: "SELECT * FROM sellers WHERE email = $1",
  createAccountQuery :"INSERT INTO sellers(name, email, phone, cnic, passward )VALUES($1, $2, $3, $4,$5) RETURNING *"

  };
  
  module.exports = { sellersTableQueries };
  