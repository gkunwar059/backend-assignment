const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Adds a new product to the database
 *     parameters:
 *       - in: body
 *         name: product
 *         description: Product object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *             description:
 *               type: string
 *             user_id:
 *               type: number
 *     responses:
 *       201:
 *         description: Product added successfully
 *       500:
 *         description: Failed to add product
 */
router.post("/add", addProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves all products from the database
 *     responses:
 *       201:
 *         description: Products fetched successfully
 *       500:
 *         description: Failed to get product info
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieves a product by its ID from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Product fetched successfully
 *       500:
 *         description: Failed to get product info
 */
router.get("/:id", getProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product
 *     description: Updates a product in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: product
 *         description: Product object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Product updated successfully
 *       500:
 *         description: Failed to update product
 */
router.patch("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       500:
 *         description: Failed to delete product
 */
router.delete("/:id", deleteProduct);

module.exports = router;
