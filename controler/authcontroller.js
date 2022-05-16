const mysql= require('mysql2');
const db=require('../models/db');
const{hash,compare}=require('bcrypt');
const sendEmail = require('../ults/sendemail');
async function checker(str){
    if(str.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
        return "email";
    }
    else if (str.match( /^[a-zA-Z_][a-zA-Z0-9_]*/g)){
        return "username";
    }
    else{
        return "others"
    }
}
const distroy=(req,res, next) => {
    req.session.destroy((err) => {
        console.log(err);
    });
    next();
}
const signup =async(req, res)=>{
    const {password,email,username,phonenumber,birthdate,firstname,lastname} = req.body;
    try {
        const [rows]=await db.pool.query(`SELECT * from custamer where email='${email}' or userName='${username}';`);
        if(!rows.length){
            try{
                const hash_password=await hash (password,10);
                console.log(hash_password);
                db.pool.query(`INSERT INTO custamer (firstName , lastName , email , username , password , phoneNumber , birthday) VALUES
                ('${firstname}','${lastname}','${email}', '${username}', '${hash_password}','${phonenumber}','${birthdate}');`);
            }catch(err){
                console.log(err);
            }
        }
        else{
            res.send('the account is already registered');
        }
    }
    catch (err) {
        console.log("err");
    }
}
const login=async(req,res) => {
    const {emailOrUsername,password} = req.body;
    const ss=await checker(emailOrUsername);
    if(ss!="others"){
        const[rows]=await db.pool.query(`SELECT ${ss} , password,id FROM custamer WHERE ${ss} = "${emailOrUsername}";`);
        if(rows.length){
            let user;
            if(ss==="email")user=rows[0].email;
            else user=rows[0].userName;
            if(user===emailOrUsername){
                if(await compare(password,rows[0].password)){
                    req.session.isLogin=true;
                    req.session.u_id=rows[0].id;
                    req.session.save();
                    res.redirect('/home')
                }
            }
            else{
                res.send(`password or ${ss} is envalid`);
            }
        }
        else{
            res.send(`password or ${ss} is envalid`)
        }
    }
}
const forget =  async(req, res)=>{
    const {emailOrUsername} = req.body; 
    const ss=await checker(emailOrUsername);
        try {
            [rows]=await db.pool.query(`SELECT * FROM custamer WHERE ${ss} = "${emailOrUsername}" ;`);
            if(rows.length){
                const random=Math.floor(Math.random()*100000);
                const hashh= await hash(random.toString(),10);
                //sendEmail({to:rows[0].email,subject:`recover code`,text:`this your recovery code ${random} and this link => http://localhost:3200/rest`})
                req.session.found=true;
                req.session.save();
                res.status(200).redirect(`/confirm?u_id=${rows[0].id}&hash=${hashh}`)
            }
            else{
                res.redirect('/forget');
            }
        } catch (error) {
            console.log("erorr")
        }
}
const confirm=async(req, res) => {
    const{recoveryCode}=req.body;
    if(recoveryCode){
        if(await compare(recoveryCode,req.query.hash)){
            req.session.isReset=true;
            req.session.c_id=req.query.u_id;
        }
        else{
            console.log("aa");
        }
    }
    else{
        res.send("aav");
    }
}
const reset=async(req, res)=>{
    const {newpasswword}=req.body;
    await db.pool.query(`UPDATE users SET password= ${newpasswword} WHERE id= "${req.query.u_id}`);
}
const is_login =(req, res, next)=> {
    if(req.session.isLogin){
        next();
    }
    else{
        res.redirect(`login`);
    }
}
const not_login =(req, res, next)=> {
    if(!req.session.isLogin){
        next();
    }
    else{
        res.render(`login`);
    }
}
const is_founded_toconfirm =(req, res, next)=> {
    if(req.session.found){
        next();
    }
    else{
        res.redirect('/login');
    }
}
const isconfirmed=(req, res,next)=> {
    if(req.session.found){
        next();
    }
    else{
        res.redirect('/login');
    }
}

module.exports={
    login,signup,forget,confirm,distroy,reset,is_login,not_login,is_founded_toconfirm,isconfirmed
}