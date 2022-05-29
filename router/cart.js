const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const db=require('../models/db');


router.post('/addtocart',async(req,res)=>{
    const {id}=req.body;

    if(req.user===undefined){
        console.log(id)
        res.send('/login')
    }else{
        
        const [rows]=await db.query(`SELECT * FROM cart WHERE id=${req.user.id} AND proID=${id}`);

        if(!rows.length){
            await db.query(`INSERT INTO cart VALUES (${req.user.id},${id},1,1,1,1);`);
            
        }else{
            await db.query(`UPDATE cart SET count =count+1 WHERE id = ${req.user.id} AND proID = ${id} `)
            
        }
        return res.status(204).send();
    }

})

router.post('/addtofav',async(req,res)=>{
    const {id}=req.body;

    if(req.user===undefined){
        console.log(id)
        res.send('/login')
    }else{
        
        const [rows]=await db.query(`SELECT * FROM fav WHERE id=${req.user.id} AND proID=${id}`);

        if(!rows.length){
            await db.query(`INSERT INTO fav VALUES (${req.user.id},${id});`);
            
        }

        return res.status(202).send();
    }

})


router.get('/cart',async(req,res)=>{
    if(req.user==undefined){
        res.redirect('/homepage')
    }else{
        const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,c_name FROM product,cart WHERE cart.proID=product.proID AND id =${req.user.id};`);
        console.log(rows);
        const [categories]=await db.query(`SELECT * FROM catogire`);
        res.render('cart',{products:rows,categories:categories,session:req.session})
    }
})
router.get('/wishlist',async(req,res)=>{
    if(req.user==undefined){
        res.redirect('/login')
    }else{
        const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,c_name FROM product ,fav WHERE fav.proID=product.proID AND id ='${req.user.id}';`);
        res.render('wishlist',{products:rows})
    }
})


module.exports=router