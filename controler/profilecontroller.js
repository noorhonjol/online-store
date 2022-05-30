const db=require('../models/db')

const geteditfirst = (req,res)=>{res.render('edit-firstname')}

const geteditlast = (req,res)=>{res.render('edit-lastname')}

const geteditemail = (req,res)=>{res.render('edit-email')}

const getedituname = (req,res)=>{res.render('edit-username')}

const geteditpass=(req,res)=>{res.render('edit-passward')}

const getadmin = (req,res)=>{res.render('admin-page')}

const editFname=async(req,res)=>{
    const name=req.body.firstname
    if (name===req.user.firstname){
        return
    }
    else{
        await db.query(`UPDATE custamer SET firstName='${name}' WHERE id=${req.user.id}`)
        res.send("zabaaattt")
    }
    
}
const editLname=async(req,res)=>{
    const name=req.body.lastname
    if (name===req.user.lastname){
        return
    }
    else{
        await db.query(`UPDATE custamer SET lastName='${name}' WHERE id=${req.user.id}`)
        res.send("zabaaattt")
    }
}

const editpassword=async(req,res)=>{
    const {passward,confermpassward}= req.body
    if(passward===confermpassward){
        db.query(`UPDATE custamer SET password='${passward}' WHERE id =${req.user.id}`)
    }
    res.redirect('/profile');
}
const editemail=(req,res)=>{

    const email=req.body.email
    
    if(email){
        db.query(`UPDATE custamer SET email='${email}' WHERE id=${req.user.id}`)
    }
    res.redirect('/profile');
}

const editUname=(req,res)=>{
    const username=req.body.username
    if(username){
        db.query(`UPDATE custamer SET userName='${username}' WHERE id=${req.user.id}`)
    }
    res.redirect('/profile');
}

module.exports ={geteditfirst, geteditlast ,geteditemail,getedituname,geteditpass,getadmin,editLname,editFname,editpassword,editemail,editUname}