const mysql= require('mysql');
const db=require('../models/db');
const{hashSync,compareSync}=require('bcrypt');
const sendEmail = require('../ults/sendemail');

function checker(str){
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
const signup =(req, res)=>{
    const {password,email,username,phonenumber,birthdate,firstname,lastname} = req.body;
    try {
        db.getConnection((err, connection)=>{
            if(err) throw err;
            connection.release();
            connection.query(`SELECT * from custamer where email='${email}' or userName='${username}';`,(err,rows)=>{
                if(!rows.length){
                    connection.query(`INSERT INTO custamer (firstName , lastName , email , username , password , phoneNumber , birthday) VALUES ('${firstname}','${lastname}','${email}', '${username}', '${password}','${phonenumber}','${birthdate}');`,(err,result)=>{
                        if (err) throw err;
                    })
                }
                else{
                    res.send('the account is already registered');
                }
            });
        })
    } catch (err) {
        console.log("err");
    }
    
};
const login=(req,res) => {
        const {emailOrUsername,password} = req.body;
        const ss=checker(emailOrUsername);
        if(ss!="others"){
            db.getConnection((err, connection)=>{
                if(err) throw err;
                connection.query(`SELECT ${ss} , password,id FROM custamer WHERE EMAIL = "${emailOrUsername}";`,(err,rows)=>{
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
}
const forget =  (req, res)=>{
    const {emailOrUsername} = req.body;
    db.getConnection((err, connection)=>{
        if(err) throw err;
        connection.release();
        connection.query(`SELECT * FROM custamer WHERE ${checker(emailOrUsername)} = '${emailOrUsername}';`,(err,rows)=>{
            if(rows.length){
                const {recoveryCode} = req.body;
                const random=Math.floor(Math.random()*100000);
                const hashh= hashSync(random.toString(),10);
                sendEmail({to:rows[0].email,subject:`recover code`,text:`this your recovery code ${random} and this link => http://localhost:3200/rest`})
                console.log(random);
                res.redirect(`/confirm?u_id=${rows[0].id}&hash=${hashh}`)
            }
            else{
                res.redirect('/forget');
            }
        })
    })
}
const confirm=(req, res) => {
    const{recoveryCode}=req.body;
    validrec=compareSync(recoveryCode,req.query.hash);
    console.log(validrec)
    if(validrec){
        res.send("true")
    }
    else{
        console.log("aa");
    }
}
module.exports={
    login,signup,forget,confirm,
}