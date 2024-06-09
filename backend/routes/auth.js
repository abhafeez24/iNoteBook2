const express = require('express')
const router = express.Router();

router.get('/', (req, res)=> {
    obj = {
        name: 'Annjdk',
        no: 33
    }
    res.json(obj)
})

module.exports = router