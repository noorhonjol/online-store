const express = require('express');
const db=require('../models/db');
const router=express.Router();
const authcontroller = require('../controler/authcontroller');
var session = require('express-session');
router.use(session({
	secret: 'session_cookie_secret',
	store: db.sessionStore,
	resave: false,
	saveUninitialized: false})
);
router.post('/signup',authcontroller.signup);
router.post('/login',authcontroller.login);
router.get('/home',authcontroller.is_login,(req, res)=>{
    res.render(`home`);
});
router.post('/home',authcontroller.distroy,(req, res)=>{
    res.redirect('/login')
});
router.get('/login',authcontroller.not_login,(req, res) => {
    res.render('index')
});
router.get('/forget',authcontroller.not_login,(req, res)=>{
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
router.post('/confirm',authcontroller.distroy,authcontroller.confirm);
router.get('/rest',authcontroller.not_login,authcontroller.isconfirmed,(req,res)=>{
    res.render('aa');
});
router.post('/rest',authcontroller.distroy,authcontroller.reset);
module.exports=router;