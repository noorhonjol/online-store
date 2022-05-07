const express = require('express');
const router = express.Router();
const db=require('../models/db');


router.post('/products/category/shop',async(req,res)=>{
    const {fpID,cpID}=req.body
    if(fpID){
        if(req.session.isLogin){

            const [rows]=await db.pool.query(`SELECT * FROM fav WHERE id=${req.session.u_id} AND proID=${fpID}`);
            
            if(!rows.length){
                await db.pool.query(`INSERT INTO fav VALUES (${req.session.u_id},${fpID});`);
            }
        }else{
            res.redirect('/login')
        }
    }
    else{
        if(req.session.isLogin){
            
            const [rows]=await db.pool.query(`SELECT * FROM cart WHERE id=${req.session.u_id} AND proID=${cpID}`);
            
            if(!rows.length){
                await db.pool.query(`INSERT INTO cart VALUES (${req.session.u_id},${cpID},1,1,1,1);`);
            }
            else{
                await db.pool.query(`UPDATE cart SET count =count+1 WHERE id = ${req.session.u_id} AND proID = ${cpID} `)
                
            }
        }else{
            res.redirect('/login')
        }
    }

        res.status(204).send();
        
})
router.get('/cart',async(req,res)=>{

    const [rows] = await db.pool.query(`SELECT pName,pPrice,image,count FROM product ,cart WHERE cart.proID=product.proID AND id =${req.session.u_id};`);
    res.render('cart',{cart:rows,session:req.session})

})
router.get('/favorite',async(req,res)=>{

    const [rows] = await db.pool.query(`SELECT pName,pPrice,image FROM product ,fav WHERE fav.proID=product.proID AND id =${req.session.u_id};`);
        console.log(rows)
    // res.render('cart',{cart:rows,session:req.session})

})

module.exports=router