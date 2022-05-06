const express = require('express');
const router = express.Router();
const db=require('../models/db');
router.get('/homepage', async (req, res) => {
    const [rows]=await db.pool.query(`SELECT * FROM catogire`);
    res.render('homepage',{categories:rows,session:req.session})
})
router.get('/contact',async(req, res)=>{
    const [rows]=await db.pool.query(`SELECT * FROM catogire`);
    res.render('contact',{session:req.session,categories:rows})
})
module.exports =router;