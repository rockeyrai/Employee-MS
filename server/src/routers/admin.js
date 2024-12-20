const express = require('express')
const { addCategory, mytest, fetchCategory } = require('../controllers/admin')
const router = express.Router()

router.post('/login',mytest)
router.post('/category',addCategory)
router.get('/category',fetchCategory)


module.exports = router