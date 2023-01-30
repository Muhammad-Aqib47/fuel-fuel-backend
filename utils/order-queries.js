const buyerOrderTableQueries = {

    //Delivered order from buyer
    deliveredYourOrder: "INSERT INTO orders (b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address, b_phone_number, payment_mode)values ($1, $2, $3, $4, $5, $6, $7, $8, $9)",

    //get Order status
    getBuyerOrderStatus: "SELECT order_id, b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address , b_phone_number, payment_mode FROM orders ",


};

module.exports = { buyerOrderTableQueries };
