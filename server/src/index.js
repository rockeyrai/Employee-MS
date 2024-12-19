const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.BACKEND_PORT || 3000;
const cors = require("cors");
const AdminRouter = require("./routers/admin")
require("./database/db"); // Ensure the database connects when the server starts

app.use(express.json());
app.use(cors());
app.use(AdminRouter)

app.listen(PORT,()=>{
  console.log(`server is running at port ${PORT}`)
})