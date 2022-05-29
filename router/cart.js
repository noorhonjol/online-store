const express = require('express');
const cartcontroller= require('../controler/cartcontroller')
const router = express.Router();


router.post('/addtocart',cartcontroller.addtocart)

router.post('/addtofav',cartcontroller.addTofav)


router.get('/cart',cartcontroller.getCart)

router.get('/wishlist',cartcontroller.getfav)

router.delete('/deletecart/:id',cartcontroller.deleteCart);

router.delete('/deletefev/:id',cartcontroller.deletefev);

module.exports=router