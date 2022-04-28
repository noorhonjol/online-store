const express = require('express');
const router = express.Router();

router.get('/shop',(req, res) => {
    
const rows=db.pool.query(`SELECT * FROM custamer `)

    res.render('shop')
})


module.exports =router;