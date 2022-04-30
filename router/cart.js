const express = require('express');
const router = express.Router();
const db=require('../models/db');


router.post('/products/category/shop',async(req,res)=>{
    const {pID}=req.body
    if(req.session.isLogin){
        
        const [rows]=await db.pool.query(`SELECT * FROM cart WHERE id=${req.session.u_id} AND proID=${pID}`);
        
        if(!rows.length){
            await db.pool.query(`INSERT INTO cart VALUES (${req.session.u_id},${pID},1,1,1,1);`);
        }
        else{
            await db.pool.query(`UPDATE cart SET count =count+1 WHERE id = ${req.session.u_id} AND proID = ${pID} `)
            
        }
    }else{
        res.redirect('/login')
    }

    res.status(204).send();

})
module.exports=router