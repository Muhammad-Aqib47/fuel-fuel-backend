const sellersTableQueries = {
  getAllSellers: "SELECT * FROM sellers",
  checkExistingEmailQuery: "SELECT * FROM sellers WHERE seller_email = $1",
  createAccountQuery :"INSERT INTO sellers(seller_name, seller_email, seller_phone, seller_password )VALUES($1, $2, $3, $4)"

  };
  
  module.exports = { sellersTableQueries };
  