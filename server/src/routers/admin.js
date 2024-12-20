const express = require('express')
const { addCategory, mytest } = require('../controllers/admin')
const router = express.Router()

router.post('/login',mytest)
router.post('/category',addCategory)

module.exports = router