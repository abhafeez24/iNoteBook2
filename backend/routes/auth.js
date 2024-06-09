const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { query, validationResult } = require('express-validator');

const JWT_SECRET_KEY = "abdulh@afeez"

const router = express.Router();

//create user using: POST "/api/auth/". Does't require auth
router.post('/createuser', [
    query('name','Enter a valid Name').isLength({min : 4}),
    query('email', 'Enter a valid email').isEmail(),
    query('password','Password length must me greater than 5').isLength({min:5})
],async (req, res)=> {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.send({error: errors.array()});
    }
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,

    })
    const data = {
        user:{
            id: user._id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET_KEY)

    res.json({authtoken})
})

module.exports = router