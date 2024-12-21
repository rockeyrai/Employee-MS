const jwt = require("jsonwebtoken");
const dbPool = require("../database/db"); // Replace with your actual database pool module

// Fetch all employees
const fetchEmployee = (req, res) => {
  const sql = "SELECT * FROM team"; // Assuming 'team' table holds the employee records

  dbPool.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });

    return res.json({ Status: true, data: result });
  });
};

// Add a new employee
const addEmployee = (req, res) => {
  console.log(req.body);
  
  const { name, email, location, hire_date, department, phone } = req.body;

  const sql = "INSERT INTO team (name, email, location, hire_date, department, phone) VALUES (?, ?, ?, ?, ?, ?)";

  dbPool.query(
    sql,
    [name, email, location, hire_date, department, phone],
    (err, result) => {
      if (err) {
        console.error("Query Error:", err);
        return res.json({ status: false, error: "Query error" });
      }
      return res.json({
        status: true,
        message: `Employee ${name} added successfully!`,
      });
    }
  );
};

// Delete an employee
const deleteEmployee = (req, res) => {
  const employeeId = req.params.id;

  // Log the employeeId to see what is being passed
  console.log("Employee ID:", employeeId);

  const sql = "DELETE FROM team WHERE id = ?";

  dbPool.query(sql, [employeeId], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).json({ status: false, message: "Error deleting employee" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    return res.status(200).json({ status: true, message: "Employee deleted successfully" });
  });
};

module.exports = { addEmployee, fetchEmployee, deleteEmployee };
