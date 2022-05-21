
const express = require('express');
const passport=require('passport');
const db=require('../models/db');
const router=express.Router();
const authcontroller = require('../controler/authcontroller');
const isAuth= require('./isAuth').isAuth
const isLogin=require('./isAuth').isLogined;

router.post('/signup',authcontroller.signup);

router.post('/login',  passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' }));


router.get('/login',isLogin,(req, res) => {
    //const [data]=await db.pool.query(`SELECT`)
    res.render('login')
});

router.get('/forget',isLogin,(req, res)=>{
    res.render('forget')
});

router.post('/forget',authcontroller.forget);


router.get('/confirm',authcontroller.not_login,authcontroller.is_founded_toconfirm,(req,res)=>{
    const isEmpty = Object.keys(req.query).length === 0;
    if(!isEmpty){
    res.render('confirm');}
    else{
        res.send("hello")
    }
});

router.get('/signup',(req,res)=>{

    res.render('signup')
})

router.post('/confirm',authcontroller.distroy,authcontroller.confirm);

router.get('/profile', isAuth, (req, res, next) => {
    
    res.render('dash-my-profile');
});


router.get('/rest',authcontroller.not_login,authcontroller.isconfirmed,(req,res)=>{
    res.render('aa');
});

router.get('/logout',authcontroller.distroy ,(req, res, next) => {
    res.redirect('/login');
});

router.post('/rest',authcontroller.distroy,authcontroller.reset);


module.exports=router;