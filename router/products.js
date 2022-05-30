const express = require('express');

const productscontroler=require('../controler/productscontroler');

const router = express.Router();


router.get('/shop',productscontroler.giveAllProducts);


router.get('/detals',productscontroler.givedetails)

router.post('/detals',productscontroler.putreview)

module.exports =router;