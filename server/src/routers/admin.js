const express = require('express')
const { addDepartment, mytest, fetchDepartment, deleteDepartment } = require('../controllers/admin')
const router = express.Router()

router.post('/login',mytest)
router.post('/department',addDepartment)
router.get('/department',fetchDepartment)
router.delete('/department/:id',deleteDepartment)


module.exports = router