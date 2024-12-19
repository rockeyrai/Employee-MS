const mysqul = require('mysql2')

const dbConnect = mysqul.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"employee"
})

dbConnect.connect((error)=>{
if(error){
  console.log(`databse connecetion error `)
}else{
  console.log(`database connected`)
}
})

module.exports = dbConnect