const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { initializeFirebase } = require("./config/firebase.config");
const { database } = require("./controller/mongodb.controller");
const errorMiddleware = require("./middleware/error.middleware");
const auth = require("./middleware/auth.middleware");

// Routes
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");
const paymentRoutes = require("./routes/payment.routes");

// Initialization
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
initializeFirebase(); // Firebase initialization.

// Middlewares
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

// Routing Middlewares
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/payment", paymentRoutes);

// Routes
/**
 *Route: /
 */
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/views/api.html"));
});

// Get Payments
app.get("/payments", auth, async (req, res) => {
  const { limit, skip, ...filter } = req.query;

  const options = {
    db: "theautomobiles",
    table: "payments",
    method: "find",
    data: {
      find: { ...filter },
      limit: parseInt(limit),
      skip: parseInt(skip),
    },
  };
  const data = await database(options);
  res.status(200).send(data);
});

/**
 * Insert Payments
 */
app.put("/payments", auth, async (req, res) => {
  const data = req.body;

  const options = {
    db: "theautomobiles",
    table: "payments",
    method: "insertOne",
    data: data,
  };
  const result = await database(options);
  res.send(result);
});

// Server
app.listen(port, () => {
  console.log(`API server started at ${port}`);
  console.log(`http://localhost:${port}`);
});
