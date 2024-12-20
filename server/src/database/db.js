const mysql = require('mysql2');

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
  waitForConnections: true, // Queue requests when no connection is available
  connectionLimit: 10,      // Maximum number of connections in the pool
  queueLimit: 0             // Unlimited queueing of requests
});

dbPool.getConnection((error, connection) => {
  if (error) {
    console.error(`Database connection error: ${error.message}`);
  } else {
    console.log("Database pool connected successfully.");
    connection.release(); // Return the connection to the pool
  }
});

module.exports = dbPool;
