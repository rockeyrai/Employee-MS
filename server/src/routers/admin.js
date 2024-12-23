const express = require('express')
const { addDepartment, adminLogin, fetchDepartment, deleteDepartment, adminLogout } = require('../controllers/admin')
const router = express.Router()

router.post('/login',adminLogin)
router.post('/logout',adminLogout)
router.post('/department',addDepartment)
router.get('/department',fetchDepartment)
router.delete('/department/:id',deleteDepartment)


module.exports = router