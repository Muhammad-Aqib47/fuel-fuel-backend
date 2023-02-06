const buyerTableQueries = {

  // Filter Cities from sellers that where sellers are Available
  getCitiesData: "SELECT seller_city FROM sellers",


  // Filter Available Fuel Station OR Sellers According to city
  getSellersStations: "SELECT available_fuel_station FROM sellers WHERE seller_city = $1",


  //Filter fuel type according to Sellers
  getFuelTypeFromSellers: "SELECT products.product_name FROM sellers INNER JOIN products ON products.seller_id = sellers.seller_id where sellers.available_fuel_station = $1 ",


  //Filter Fuel price according fuel type
  getFuelPriceFromSellers: "SELECT products.fuel_price FROM sellers INNER JOIN products ON products.seller_id = sellers.seller_id where products.product_name = $1 ",





};

module.exports = { buyerTableQueries };

