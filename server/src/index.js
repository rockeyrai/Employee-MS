const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.BACKEND_PORT || 3000;
const cors = require("cors");
const AdminRouter = require("./routers/admin")
const EmployeeRouter = require("./routers/employee")
require("./database/db"); // Ensure the database connects when the server starts

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Enable cookies or other credentials
}));
app.use(AdminRouter)
app.use(EmployeeRouter)

app.listen(PORT,()=>{
  console.log(`server is running at port ${PORT}`)
})