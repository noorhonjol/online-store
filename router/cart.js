const express = require('express');
const { route } = require('express/lib/application');
const { assign } = require('nodemailer/lib/shared');
const router = express.Router();
const db=require('../models/db');

router.post('/products/category/shop',async(req,res)=>{
    const {pID}=req.body

   const [result] = await db.pool.query(`INSERT INTO cart VALUES (1,${pID},1,1,1,1);`)
   res.send(result)



})
module.exports=router