const express = require('express');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const cartcontroller= require('../controler/cartcontroller')
const router = express.Router();
const db=require('../models/db');


router.post('/addtocart',cartcontroller.addtocart)

router.post('/addtofav',cartcontroller.addTofav)


router.get('/cart',cartcontroller.getCart)

router.get('/wishlist',cartcontroller.getfav)

router.delete('/deletecart/:id',cartcontroller.deleteCart);

router.delete('/deletefev/:id',cartcontroller.deletefev);





router.get('/edit-firstname',(req,res)=>{res.render('edit-firstname')})
router.get('/edit-lastname',(req,res)=>{res.render('edit-lastname')})
router.get('/edit-passward',(req,res)=>{res.render('edit-passward')})
router.get('/edit-email',(req,res)=>{res.render('edit-email')})
router.get('/edit-username',(req,res)=>{res.render('edit-username')})
router.get('/admin-page',(req,res)=>{res.render('admin-page')})

router.post('/edit-firstname',async(req,res)=>{
const name=req.body.firstname
if (name===req.user.firstname){
    return
}
else{
    await db.query(`UPDATE custamer SET firstName='${name}' WHERE id=${req.user.id}`)
    res.send("zabaaattt")
}

    
})

router.post('/edit-lastname',async(req,res)=>{
    const name=req.body.lastname
    if (name===req.user.lastname){
        return
    }
    else{
        await db.query(`UPDATE custamer SET lastName='${name}' WHERE id=${req.user.id}`)
        res.send("zabaaattt")
    }
    
        
    })
    router.post('/edit-passward',async(req,res)=>{
        const {passward,confermpassward}= req.body
            if(passward===confermpassward){
                db.query(`UPDATE custamer SET password='${passward}' WHERE id =${req.user.id}`)
            }
    })
    router.post('/edit-email',(req,res)=>{
        const email=req.body.email
        if(email){
        db.query(`UPDATE custamer SET email='${email}' WHERE id=${req.user.id}`)
        res.send('وحشششش')
        }
    })
    router.post('/edit-username',(req,res)=>{
        const username=req.body.username
        if(username){
        db.query(`UPDATE custamer SET userName='${username}' WHERE id=${req.user.id}`)
        res.send('وحشششش')
        }
    })

module.exports=router