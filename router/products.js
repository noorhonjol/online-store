const express = require('express');
const db=require('../models/db');
const mysql= require('mysql2');
const router = express.Router();

router.get('/shop',(req, res) => {
    
//const product=db.pool.query(`SELECT * FROM product`)
    
    res.render('shop')
})


module.exports =router;