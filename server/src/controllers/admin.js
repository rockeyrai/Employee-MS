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
          process.env.JWT_SECRET_KEY , // Store the secret key securely in environment variables
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

const fetchDepartment = (req, res) => {
  const sql = "SELECT * FROM department";
  
  dbPool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    // Instead of sending `req.body`, send the `result` from the query
    return res.json({ Status: true, data: result });
  });
};


const addDepartment = (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO department (`name`) VALUES (?)";
  
  dbPool.query(sql, [req.body.department], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ status: false, error: "Query error" });
    }
    return res.json({ status: true, message: `Department ${req.body.department} added successfully!` });
  });
};


const deleteDepartment = (req, res) => {
  // Extract the departmentId from the URL parameter
  const departmentId = req.params.id;

  // Log the departmentId to see what is being passed
  console.log('department ID:', departmentId);

  // SQL query to delete department by id
  const sql = "DELETE FROM department WHERE id = ?";

  // Execute the SQL query
  dbPool.query(sql, [departmentId], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ status: false, message: 'Error deleting department' });
    }

    // Check if the department exists
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: 'Department not found' });
    }

    // Successfully deleted department
    return res.status(200).json({ status: true, message: 'Department deleted successfully' });
  });
};




module.exports = {mytest,addDepartment,fetchDepartment,deleteDepartment};
