const express = require('express');

const router = express.Router();

const homecontroller=require('../controler/homecontroller')

router.get('/homepage', homecontroller.givehome)

router.get('/about',homecontroller.giveabout);

router.get('/getdata',homecontroller.givedatanv)



module.exports =router;