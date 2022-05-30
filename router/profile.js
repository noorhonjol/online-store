const express = require('express');
const cartcontroller= require('../controler/cartcontroller');
const { route } = require('./cart');
const router = express.Router();



router.get('/edit-firstname',(req,res)=>{

    res.render('edit-firstname')

})
