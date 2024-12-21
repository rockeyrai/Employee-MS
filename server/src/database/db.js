const mysql = require('mysql2');
require('dotenv').config();


const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", 
  database: "employee",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


dbPool.getConnection((error, connection) => {
  if (error) {
      console.error(`Database connection error: ${error.code}`);
      console.error(`Error message: ${error.message}`);
      if (error.fatal) {
          console.error('Fatal error encountered. Exiting.');
      }
  } else {
      console.log("Database pool connected successfully.");
      connection.release(); // Return the connection to the pool
  }
});


module.exports = dbPool;
