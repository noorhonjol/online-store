const express = require('express');

const router = express.Router();



router.get('/edit-firstname',(req,res)=>{

    res.render('edit-firstname')

})


module.exports =router;