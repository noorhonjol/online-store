const express = require('express');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const cartcontroller= require('../controler/cartcontroller')
const router = express.Router();
const db=require('../models/db');


router.post('/addtocart',cartcontroller.addtocart)

router.post('/addtofav',cartcontroller.addTofav)


router.get('/cart',cartcontroller.getCart)

router.get('/wishlist',cartcontroller.getfav)

router.delete('/deletecart/:id',cartcontroller.deleteCart);

router.delete('/deletefev/:id',cartcontroller.deletefev);




module.exports=router