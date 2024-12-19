const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.BACKEND_PORT || 3000;

app.listen(PORT,()=>{
  console.log(`server is running at port ${PORT}`)
})