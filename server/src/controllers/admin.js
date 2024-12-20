const jwt = require("jsonwebtoken");
const dbPool = require("../database/db"); // Replace with your actual database pool module

const mytest = (req, res) => {
  console.log(req.body);

  const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";

  // Get a connection from the pool
  dbPool.getConnection((err, connection) => {
    if (err) {
      return res.json({ loginStatus: false, error: "Database connection error" });
    }

    // Use the connection for the query
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
      // Release the connection back to the pool
      connection.release();

      if (err) {
        return res.json({ loginStatus: false, error: "Query error" });
      }

      if (result.length > 0) {
        const email = result[0].email; // Corrected "resutl" to "result"
        const token = jwt.sign(
          { role: "admin", email: email },
          "jwt_secret_key", // Store the secret key securely in environment variables
          { expiresIn: "1d" } // Corrected "expiresnIn" to "expiresIn"
          
        );
        res.cookie("token",token)
        return res.json({ loginStatus: true, token: token });
      } else {
        return res.json({ loginStatus: false, error: "Invalid credentials" });
      }
    });
  });
};

const addCategory = (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO category (`name`) VALUES (?)";
  
  dbPool.query(sql, [req.body.category], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ status: false, error: "Query error" });
    }
    return res.json({ status: true, message: "Category added successfully!" });
  });
};


module.exports = {mytest,addCategory};
