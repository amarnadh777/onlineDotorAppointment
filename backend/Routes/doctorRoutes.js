const express =require('express')
const {signUp,signIn,addTimeslots} = require("../Controllers/doctorControlers")
const router = express.Router()
router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/timeslots",addTimeslots)

module.exports = router
