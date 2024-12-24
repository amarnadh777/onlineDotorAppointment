const express =require('express')
const { createCategory } = require('../Controllers/categoryControlles')
const router = express.Router()
router.post("/create",createCategory)
module.exports = router