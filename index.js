const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const { initializeFirebase } = require('./config/firebase.config');
// const { database } = require('./controller/mongodb.controller');
const errorHandler = require('./middleware/error.middleware');
// const auth = require('./middleware/auth.middleware');
const loggerMiddleware = require('./middleware/logger.middleware');
const debug = require('debug')('app:server');
const compression = require('compression');
const httpToHttps = require('./middleware/httpsToHttps');
const helmet = require('helmet');
const otherRoutes = require('./routes/other.routes');
// const productRoutes = require('./routes/product.routes');
// const userRoutes = require('./routes/user.routes');
// const orderRoutes = require('./routes/order.routes');
// const reviewRoutes = require('./routes/review.routes');
// const paymentRoutes = require('./routes/payment.routes');
const { initializeServer } = require('./controller/server.controllers');
const { limiter } = require('./middleware/limiter.middleware');

// Initialization
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// initializeFirebase(); // Firebase initialization.

// Middlewares
app.use(helmet());
app.use(httpToHttps);
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(errorHandler);
app.use(loggerMiddleware);
app.use(compression());
app.use(limiter); // Rate limiter

// Security Middlewares
app.disable('x-powered-by');

// Static File Route
app.use('/static', express.static('public'));

// Routing Middlewares
app.use('/api/v1', otherRoutes);
// app.use('/api/v1/product', productRoutes);
// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/order', orderRoutes);
// app.use('/api/v1/review', reviewRoutes);
// app.use('/api/v1/payment', paymentRoutes);

// Server
initializeServer(app, port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    debug('HTTP server closed');
  });
});
