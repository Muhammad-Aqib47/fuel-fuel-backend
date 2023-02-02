const buyersTableQueries = {
  getAllBuyers: "SELECT * FROM buyers",
  checkExistingEmailQuery :"SELECT * FROM buyers WHERE buyer_email = $1",
  createAccountQuery :"INSERT INTO buyers(buyer_name, buyer_email, buyer_phone, buyer_password )VALUES($1, $2, $3, $4)",
  getBuyerDetails :"SELECT * FROM buyers WHERE buyer_id = $1"
};

module.exports = { buyersTableQueries };



