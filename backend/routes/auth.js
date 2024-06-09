const express = require('express')
const User = require('../models/User')
const router = express.Router();

//create user using: POST "/api/auth/". Does't require auth
router.post('/', (req, res)=> {
    console.log(req.body)
    const user = User(req.body)
    user.save();
    res.send(user)
})

module.exports = router