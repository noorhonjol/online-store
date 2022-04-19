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

router.get('/forgot',(req, res)=>{
    res.render('forgot')
})

router.post('/forgot',(req, res)=>{
    const {email}=req.body
    const random=Math.floor(Math.random()*100000);
    db.getConnection((err, connection)=>{
        if(err) throw err;
        connection.release();
        connection.query(`UPDATE users SET verfycode= ${random} WHERE email= "${email}";`,(err,rows)=>{  
            if(err){
                console.log("eror")
            }
            else{
                if(rows.affectedRows<1){
                    return res.redirect('forgot')
                }
                else{                    
                    connection.query(`SELECT id from users WHERE email= "${email}"`,(err,rows)=>{
                        if (err) throw err
                        let transporter = nodemailer.createTransport({
                            service: "gmail",
                            port: 587,
                            secure: false,
                            auth: {
                                user: "noorwebh@gmail.com",
                                pass: "12345678@.",
                            }
                        });
                        let mailoption={
                            from:"noorwebh@gmail.com",
                            to:email,
                            subject:"verfiy code",
                            text:`this your verfiy code ${random} and this linlk => http://localhost:3200/rest/${rows[0].id}`
                        }
                        transporter.sendMail(mailoption,(err,data)=>{
                            if(err){
                                console.log('err');
                            }
                            else{
                                return res.redirect(`confirm/${rows[0].id}`);
                            }
                        })
                    })
                }
            }
        })
    })
})

router.get('/confirm/:id',(req,res)=>{

})
router.post('/confirm/:id',(req,res)=>{
    const {verfycode}=req.body;
    db.getConnection((err, connection)=>{
        if(err) throw err;
        connection.release();
        connection.query(`SELECT verfycode from users WHERE id= "${req.params.id}"`,(err,rows)=>{
            if(err) throw err;
            if(rows[0].verfycode==verfycode){
                req.session.Userid=rows[0].id;
                req.session.isAuth=true;
                res.redirect(`rest/${req.params.id}`);
            }
            else{
                res.redirect(`confirm/${id}`);
            }
            
        })
    })

})

router.get('/rest/:id',isAuth ,(req,res)=>{
    res.render('rest')
})
router.post('/rest/:id',(req, res)=>{
    const {newpasswword }= req.body;
    db.getConnection((err, connection)=>{
        connection.release();
        connection.query(`UPDATE users SET password= ${newpasswword} WHERE id= "${req.params.id}";`,(err,rows)=>{  
            if(!err){
                console.log("sucsess");
            }
            else{
                console.log("ccc");
            }
        })
    })
})
module.exports=router;