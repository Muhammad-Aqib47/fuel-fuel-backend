const buyerTableQueries = {
  
  // Filter Cities from sellers that where sellers are Available
  getCitiesData : "select seller_city from sellers",


  // Filter Available Fuel Station OR Sellers According to city
  getSellersStations: "select available_fuel_station,seller_city from sellers where seller_city = $1",
  

  //Filter fuel type according to Sellers
  getFuelTypeFromSellers : "select products.product_name, sellers.seller_name, sellers.seller_id from sellers inner join products on products.seller_id = sellers.seller_id where sellers.available_fuel_station = $1 ",


  //Filter fuel price according fuel type
  getFuelPriceFromSellers : "select products.fuel_price from products where products.product_name = $1 and products.seller_id = $2",

  
  //Delivered order from buyer
  deliveredYourOrder : "insert into orders (b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address, b_phone_number, payment_mode)values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",


  getBuyerOrderStatus : "select order_id, b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address , b_phone_number, payment_mode from orders ",
  

};

module.exports = { buyerTableQueries };

