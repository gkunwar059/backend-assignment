const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} = require("../controllers/orderController");
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create an order
 *     description: Creates a new order
 *     parameters:
 *       - in: body
 *         name: order
 *         description: Order object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: number
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *             totalAmount:
 *               type: number
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Failed to create order
 */
router.post("/", createOrder);
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves all orders
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       500:
 *         description: Failed to get orders
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a specific order
 *     description: Retrieves a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Failed to get order
 */
router.get("/:id", getOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Update an order
 *     description: Updates an existing order
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: order
 *         description: Order object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: number
 *             products:
 *               type: array
 *               items:
 *                 type: object
 *             total_amount:
 *               type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       500:
 *         description: Failed to update order
 */
router.patch("/:id", updateOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes an order from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Order ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       500:
 *         description: Failed to delete order
 */
router.delete("/:id", deleteOrder);

module.exports = router;
