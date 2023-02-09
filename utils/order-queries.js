const buyerTableQueries = {

    //make order from buyer
    placeOrder: "INSERT INTO orders (b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address, b_phone_number, payment_mode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",

    //get Order status
    getBuyerOrderStatus: "SELECT order_id, order_status, b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address , b_phone_number, payment_mode FROM orders ",

    //Cancel Order 
    cancelOrder: `DELETE FROM orders WHERE order_id  = $1`,


    //get buyer orders data for sellers
    getBuyerOrdersData: "SELECT order_id, order_status, b_name, city, fuel_station, fuel_type, fuel_price, fuel_quantity, fuel_delivery_address , b_phone_number, payment_mode FROM orders",

    //update status of buyer for confirmation
    updateBuyerOrder: "UPDATE orders SET order_status = $1 WHERE order_id = $2"
};

module.exports = { buyerTableQueries };
