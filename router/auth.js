const express = require('express');
const session=require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const query = require('express/lib/middleware/query');
const mysql= require('mysql');
const db=require('../models/db');
const router=express.Router();

function checker(str){
    let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let UsernamePattern = /^[a-zA-Z_][a-zA-Z0-9_]*/g
    if(str.match(emailPattern)){
        return "email";
    }
    else if (str.match(UsernamePattern)){
        return "username";
    }
    else{
        return "others"
    }
}

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	database: 'noor'
};

var sessionStore = new MySQLStore(options);

router.use(session({
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));
router.get('/login',(req, res) => {
    res.render('index')
})

const isAuth = (req,res,next) => {
    if(req.session.isAuth&&parseInt(req.params.id)===req.session.Userid){
        next();
    }
    else{
        res.redirect("-1");
    }
}

router.post('/login', (req, res)=>{
    const {emailOrUsername,password} = req.body;
    const ss=checker(emailOrUsername);
    if(ss!="others"){
        db.getConnection((err, connection)=>{
            if(err) throw err;
            connection.query(`SELECT ${ss} , password,id FROM USERS WHERE EMAIL = "${emailOrUsername}";`,(err,rows)=>{
                connection.release();
                if(!err){
                    if(rows.length){
                            if(rows[0].email===emailOrUsername&&rows[0].password===password){
                                req.session.isAuth=true;
                                req.session.Userid=rows[0].id;
                                res.redirect(`home/${rows[0].id}`);
                            
                            }
                            else{
                                res.send(`password or ${ss} is envalid`);
                            }
                    }
                    else{
                        res.send(`password or ${ss} is envalid`)
                    }
                }
                else{
                    console.log(err);
                }
            })
        })
    }
    
})

router.get('/home/:id',isAuth,(req, res)=>{
    res.render('home')
})
router.post('/home/:id',(req, res)=>{
    req.session.destroy((err) => {
        res.redirect('/login');
    })
})


module.exports=router;