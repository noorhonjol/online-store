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
    if(req.user==undefined){
        res.redirect('/homepage')
    }else{
        const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,catagioresID FROM product ,cart WHERE cart.proID=product.proID AND id =${req.user.id};`);
        console.log(rows);
        const [categories]=await db.query(`SELECT * FROM catogire`);
        res.render('cart',{products:rows,categories:categories,session:req.session})
    }
})
router.get('/wishlist',async(req,res)=>{
    if(req.user==undefined){
        res.redirect('/homepage')
    }else{
        const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,catagioresID FROM product ,fav WHERE fav.proID=product.proID AND id ='${req.user.id}';`);
        res.render('wishlist',{products:rows,session:req.session})
    }
})

router.post('/favorite',async(req,res)=>{
    const{AddProduct,RemoveProduct}=req.body;
    
    if(AddProduct !=undefined){
        const [exist]=await db.pool.query(`SELECT * FROM cart WHERE proID=${AddProduct}`)
        if(!exist.length){
            await db.pool.query(`INSERT INTO cart VALUES (${req.session.u_id},${AddProduct},1,1,1,1);`);
            return res.status(204).send();
        }
    }
    else{
        await db.pool.query(`DELETE FROM fav WHERE proID=${RemoveProduct}`)
        res.redirect('/favorite')
    }
    
})

module.exports=router