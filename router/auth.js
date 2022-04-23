const express = require('express');

const db=require('../models/db');
const router=express.Router();
const authcontroller = require('../controler/authcontroller');

// var options = {
// 	host: 'localhost',
// 	port: 3306,
// 	user: 'root',
// 	database: 'amazon2'
// };
// var sessionStore = new MySQLStore(options);
// router.use(session({
// 	secret: 'session_cookie_secret',
// 	store: sessionStore,
// 	resave: false,
// 	saveUninitialized: false
// }));
// router.get('/login',(req, res) => {
//     res.render('index')
// })
// const isAuth = (req,res,next) => {
//     if(req.session.isAuth&&parseInt(req.params.id)===req.session.Userid){
//         next();
//     }
//     else{
//         res.redirect("-1");
//     }
// }
router.post('/signup',authcontroller.signup);
router.post('/login', authcontroller.login);
// router.get('/home/:id',isAuth,(req, res)=>{
//     res.render('home')
// })
// router.post('/home/:id',(req, res)=>{
//     req.session.destroy((err) => {
//         res.redirect('/login');
//     })
// })

router.get('/forget',(req, res)=>{
    res.render('forget')
})


router.post('/forget',authcontroller.forget);

router.get('/confirm',(req,res)=>{
    res.render('confirm');
})

router.post('/confirm',authcontroller.confirm);

// router.get('/rest/:id',isAuth ,(req,res)=>{
//     res.render('aa');
// })
// router.post('/rest/:id',isAuth,(req, res)=>{
//     const {newpasswword }= req.body;
//     db.getConnection((err, connection)=>{
//         connection.release();
//         connection.query(`UPDATE users SET password= ${newpasswword} WHERE id= "${req.params.id}";`,(err,rows)=>{  
//             if(!err){
//                 console.log("sucsess");
//             }
//             else{
//                 console.log("ccc");
//             }
//         })
//     })
// })
module.exports=router;