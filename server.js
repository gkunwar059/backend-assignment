const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const orderRoutes = require("./routes/orderRoute");
const reportRoutes = require("./routes/reportRoute");
// database connection
const connection = require("./config/database");

// Middleware to parse request bodies as JSON
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce API",
      version: "v2",
    },
    servers: [
      {
        url: "http://localhost:" + process.env.PORT + "/api",
      },
    ],

    apis: ["./src/**/*.route*.ts"],
  },
};

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reports", reportRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
