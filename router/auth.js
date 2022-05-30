const express = require('express');
const passport=require('passport');
const db=require('../models/db');
const router=express.Router();
const authcontroller = require('../controler/authcontroller');
const isAuth= require('./isAuth').isAuth
const isLogin=require('./isAuth').isLogined;


router.get('/login',isLogin,authcontroller.getlogin);
router.get('/forget',isLogin,authcontroller.getfpage);
router.get('/signup',isLogin,authcontroller.getRpage);
router.get('/profile', isAuth,authcontroller.getPpage);
router.get('/logout',authcontroller.distroy);
router.get('/manageprofile', authcontroller.getMPpage);
router.get('/dash-edit',authcontroller.getEdpage);

router.get('/rest',isLogin,(req,res)=>{
    res.render('resetpass');
});

router.get('/confirm',isLogin,authcontroller.is_founded_toconfirm,(req,res)=>{

    res.render('confirm')
});


router.post('/forget',isLogin,authcontroller.forget);
router.post('/signup',authcontroller.signup);
router.post('/login',  passport.authenticate('local', { failureRedirect: '/login', successRedirect: '/profile' }));

router.post('/confirm',authcontroller.distroy,authcontroller.confirm);

router.post('/rest',authcontroller.distroy,authcontroller.reset);

module.exports=router;
