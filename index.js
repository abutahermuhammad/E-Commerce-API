const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chalk = require("chalk");
const path = require("path");
const { initializeFirebase } = require("./config/firebase.config");
const { database } = require("./controller/mongodb.controller");
const errorMiddleware = require("./middleware/error.middleware");

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
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(reviewRoutes);
app.use(paymentRoutes);

// Middleware: Authorize
const authorize = async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer ")) {
    const token = req.headers.authorization.split("Bearer ")[1];

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      console.log("user", decodedUser);
      req.aguid = decodedUser.uid; // Authorized user id.
      next();
    } catch {
      res.status(500).json({
        status: 500,
        messge: "Internal Server Error",
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      messge: "User not authorized.",
    });
  }
};

// Routes
/**
 *Route: /
 */
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "/views/api.html"));
});

// Get Payments
app.get("/payments", authorize, async (req, res) => {
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
app.put("/payments", authorize, async (req, res) => {
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
  console.log(chalk.cyanBright(`API server started at ${port}`));
  console.log(chalk.cyanBright(`http://localhost:${port}`));
});
