const express = require('express');

const productscontroler=require('../controler/productscontroler');

const router = express.Router();


router.get('/shop',productscontroler.giveAllProducts);

router.get('/',productscontroler.givcatproducts)

module.exports =router;