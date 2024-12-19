const express = require('express')
const mytest = require('../controllers/admin')
const router = express.Router()

router.post('/login',mytest)

module.exports = router