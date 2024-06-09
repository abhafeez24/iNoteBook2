const express = require('express')
const User = require('../models/User')
const { query, validationResult } = require('express-validator');
const router = express.Router();

//create user using: POST "/api/auth/". Does't require auth
router.post('/', [
    query('name','Enter a valid Name').isLength({min : 4}),
    query('email', 'Enter a valid email').isEmail(),
    query('password','Password length must me greater than 5').isLength({min:5})
],(req, res)=> {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return res.send({error: errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

      }).then(user => res.json(user))
      .catch(err=> {console.log(err)
        res.json({error: 'please enter unique value for email'})});
  
})

module.exports = router