const connection = require("../config/database");

// Create an order
const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount } = req.body;

    connection.query(
      "INSERT INTO orders (user_id, products, total_amount) VALUES (?, ?, ?)",
      [userId, JSON.stringify(products), totalAmount],
      function (err, result, fields) {
        if (err) {
          console.log(err);
          throw err;
        }

        res.status(201).json({
          message: "Order created successfully",
          orderId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Retrieve all orders
const getOrders = async (req, res) => {
  try {
    connection.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) {
        throw err;
      }
      result.forEach((order) => {
        order.products = JSON.parse(order.products);
      });
      res
        .status(200)
        .json({ message: "Orders fetched successfully", orders: result });
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// Retrieve a specific order by ID
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    connection.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId],
      function (err, result, fields) {
        if (err) {
          throw err;
        }

        if (result.length === 0) {
          res.status(404).json({
            message: "Order not found",
          });
        } else {
          const order = result[0];
          order.products = JSON.parse(order.products);

          res.status(200).json({
            message: "Order fetched successfully",
            order: order,
          });
        }
      }
    );
  } catch (error) {
    console.error("Error getting order:", error);
    res.status(500).json({ message: "Failed to get order" });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { userId, products, total_amount } = req.body;

    connection.query(
      "UPDATE orders SET user_id = ?, products = ?, total_amount = ? WHERE id = ?",
      [userId, JSON.stringify(products), total_amount, orderId],
      function (err, result, fields) {
        if (err) {
          throw err;
        }

        res.status(200).json({
          message: "Order updated successfully",
          orderId: orderId,
        });
      }
    );
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    connection.query(
      "DELETE FROM orders WHERE id = ?",
      [orderId],
      function (err, result, fields) {
        if (err) {
          throw err;
        }

        res.status(200).json({ message: "Order deleted successfully" });
      }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
