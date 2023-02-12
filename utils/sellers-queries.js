const sellersTableQueries = {
  getAllSellers: "SELECT * FROM sellers",
  checkExistingEmailQuery: "SELECT * FROM sellers WHERE seller_email = $1",
  createAccountQuery: "INSERT INTO sellers(seller_name, seller_email, seller_phone, seller_password )VALUES($1, $2, $3, $4)",
  getSellerDetails: "SELECT * FROM sellers WHERE seller_id = $1",


  //get buyer orders data
  getBuyerOrdersData: "SELECT order_id, order_status, b_name, city, fuel_station, fuel_type, fuel_price,total_price, fuel_quantity, fuel_delivery_address , b_phone_number, payment_mode FROM orders",

  //update status of buyer for confirmation
  updateBuyerOrder: "UPDATE orders SET order_status = $1 WHERE order_id = $2",

  //Add Fuel type and price in products table
  createFuelType: "INSERT INTO products (seller_id, product_name, fuel_price) VALUES ($1, $2, $3)"
};

module.exports = { sellersTableQueries };
