const express = require('express')
const { addEmployee, fetchEmployee, deleteEmployee } = require('../controllers/employee')
const router = express.Router()

router.post('/employee',addEmployee)
router.get('/employee',fetchEmployee)
router.delete('/employee/:id',deleteEmployee)

module.exports = router