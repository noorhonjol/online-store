const express = require('express');
<<<<<<< Updated upstream

=======
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const cartcontroller= require('../controler/cartcontroller')
>>>>>>> Stashed changes
const router = express.Router();
const db=require('../models/db');


router.get('/edit-firstname',(req,res)=>{

    res.render('edit-firstname')

})


module.exports =router;