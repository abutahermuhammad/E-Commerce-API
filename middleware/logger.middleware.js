const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database connection
const db = new sqlite3.Database('db/logs.db');

// Create the logs table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT,
  method TEXT,
  url TEXT,
  requestBody TEXT,
  responseBody TEXT
)`);

const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const { method, url, body } = req;

  // Log the request information
  console.log(`[${timestamp}] ${method} ${url}`);

  // Log the response information and store in the database
  const oldSend = res.send;
  res.send = function (data) {
    // Log the response body
    console.log('Response Body:', data);

    // Store the logged data in the SQLite database
    const requestBody = JSON.stringify(body);
    const responseBody = JSON.stringify(data);

    db.run(
      `INSERT INTO logs (timestamp, method, url, requestBody, responseBody)
            VALUES (?, ?, ?, ?, ?)`,
      [timestamp, method, url, requestBody, responseBody],
      (error) => {
        if (error) {
          console.error('Error inserting log:', error);
        }
      }
    );

    // Call the original send method
    oldSend.apply(res, arguments);
  };

  // Call the next middleware or route handler
  next();
};

// Close the SQLite database connection when the process exits
process.on('exit', () => {
  db.close();
});

module.exports = loggerMiddleware;
