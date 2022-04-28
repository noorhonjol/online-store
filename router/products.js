const express = require('express');

const productscontroler=require('../controler/productscontroler');

const router = express.Router();


router.get('/shop',giveAllProducts)


module.exports =router;