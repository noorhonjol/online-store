const express = require('express');
const router = express.Router();
const db=require('../models/db');
router.get('/homepage', async (req, res) => {
    const [rows]=await db.pool.query(`SELECT * FROM catogire`);
    res.render('homepage',{categories:rows})
})

module.exports =router;