const express = require('express')
const { addCategory, mytest, fetchCategory, deleteCategory } = require('../controllers/admin')
const router = express.Router()

router.post('/login',mytest)
router.post('/category',addCategory)
router.get('/category',fetchCategory)
router.delete('/category/:id',deleteCategory)


module.exports = router