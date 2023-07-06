const express = require("express");
const router = express.Router();
const { salesReport } = require("../controllers/reportController"); // Update the path accordingly

/**
 * @swagger
 * /api/sales/report:
 *   get:
 *     summary: Generate sales report
 *     description: Retrieves the total sales by day, week, and month
 *     responses:
 *       200:
 *         description: Sales report generated
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             report:
 *               type: object
 *               properties:
 *                 topSelling:
 *                   type: string
 *                 salesOfDay:
 *                   type: number
 *                 salesOfWeek:
 *                   type: number
 *                 salesOfMonth:
 *                   type: number
 *       500:
 *         description: Failed to generate sales report
 */
router.get("/sales-report", salesReport);

module.exports = router;
