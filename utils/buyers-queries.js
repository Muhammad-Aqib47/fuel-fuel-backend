const buyersTableQueries = {
  getAllBuyers: "SELECT * FROM buyers",
  checkExistingEmailQuery :"SELECT * FROM buyers WHERE email = $1",
  createAccountQuery :"INSERT INTO buyers(name, email, phone,passward )VALUES($1, $2, $3, $4) RETURNING *",

};

module.exports = { buyersTableQueries };



