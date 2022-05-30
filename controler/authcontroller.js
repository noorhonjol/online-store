
const db=require('../models/db');
const{hash,compare}=require('bcrypt');
const sendEmail = require('../ults/sendemail');

const getfpage=(req, res)=>{
    res.render('forget')
}
const getlogin=(req, res) => {
    res.render('login')
}
const getRpage=(req, res)=>{
    res.render('signup')
}
const getPpage=(req, res, next) => {
    res.render('dash-my-profile',{profile:req.user});
}

const getEdpage=(req,res)=>{
    res.render('dash-edit-profile',{profile:req.user})
}
const signup =async(req, res)=>{
    const {password,email,phonenumber,birthdate,firstname,lastname,gender} = req.body;
    const username=`${firstname}_${lastname}`
    
    try {
        if(gender&&password&&email&&phonenumber&&birthdate&&firstname&&lastname){
            const [rows]=await db.query(`SELECT * from custamer where email='${email}' or userName='${username}';`);
            if(!rows.length){
                const hash_password=await hash (password,10);
                db.query(`INSERT INTO custamer (firstName , lastName , email , username , password , phoneNumber , birthday, gender) VALUES
                ('${firstname}','${lastname}','${email}', '${username}', '${hash_password}','${phonenumber}','${birthdate}','${gender}');`);
                res.redirect('/login')
            }
            else{
                res.send('the account is already registered');
            }
        }
    }
    catch (err) {
        console.log("err");
    }
}

const forget =  async(req, res)=>{
    const {email} = req.body; 
        try {
            const [rows]=await db.query(`SELECT * FROM custamer WHERE email = "${email}" ;`);
            if(rows.length){
                const random=Math.floor(Math.random()*100000);
                const hashh= await hash(random.toString(),10);
                
                console.log(random);
                //sendEmail({to:rows[0].email,subject:`recover code`,text:`this your recovery code ${random} and this link => http://localhost:3200/rest`})
                req.session.found=true;
                req.session.save();
                res.status(200).redirect(`/confirm?u_id=${rows[0].id}&hash=${hashh}`)
                
            }
            else{
                res.redirect('/forget');
            }
        } catch (error) {
            res.json({
                "error":"there was an error"
            })
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
const distroy =(req, res, next)=> {
    req.logout(()=>{
        res.redirect(`login`)
    });

}

module.exports={
    distroy,signup,forget,confirm,reset,is_founded_toconfirm,isconfirmed,getfpage,getlogin,getRpage,getPpage,getEdpage
}