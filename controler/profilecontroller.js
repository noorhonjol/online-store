const db=require('../models/db')

const geteditfirst = (req,res)=>{res.render('edit-firstname')}

const geteditlast = (req,res)=>{res.render('edit-lastname')}

const geteditemail = (req,res)=>{res.render('edit-email')}

const getedituname = (req,res)=>{res.render('edit-username')}

const geteditpass=(req,res)=>{res.render('edit-passward')}

const getadmin = async(req,res)=>{
    const [users]=await db.query('select * from custamer')
    const [prod]=await db.query('select * from product')
    const [cat]=await db.query('select * from catogire')
    console.log(users,prod,cat)
    res.render('admin-page',{users:users,cat:cat,prod:prod})

}

const editFname=async(req,res)=>{
    try {
        const name=req.body.firstname
        if (name===req.user.firstname){
            return
        }
        else{
            await db.query(`UPDATE custamer SET firstName='${name}' WHERE id=${req.user.id}`)
            res.send("zabaaattt")
        }
        
    } catch (error) {
        console.log("error")
    }
}
const editLname=async(req,res)=>{
    
    try {
        const name=req.body.lastname
        if (name===req.user.lastname){
            return
        }
        else{
            await db.query(`UPDATE custamer SET lastName='${name}' WHERE id=${req.user.id}`)
            res.send("zabaaattt")
        }
    } catch (error) {
        console.log("error")
    }

}

const editpassword=async(req,res)=>{
    try {
        const {passward,confermpassward}= req.body
        if(passward===confermpassward){
            db.query(`UPDATE custamer SET password='${passward}' WHERE id =${req.user.id}`)
        }
        res.redirect('/profile');
    } catch (error) {
        console.log("error")
    }
}
const editemail=async(req,res)=>{
    try {
        const email=req.body.email
    
        if(email){
            db.query(`UPDATE custamer SET email='${email}' WHERE id=${req.user.id}`)
        }
        res.redirect('/profile');
    } catch (error) {
        console.log("error")
    }

}

const editUname=async(req,res)=>{

    try {
        const username=req.body.username
        if(username){
            db.query(`UPDATE custamer SET userName='${username}' WHERE id=${req.user.id}`)
        }
        res.redirect('/profile');
    } catch (error) {
        console.log("error")
    }
    
}
const deluser=async(req,res)=>{
    const {id}=req.params;
    
    await db.query(`DELETE FROM custamer WHERE id=${id} ;`)

    res.status(200).send();
}

module.exports ={geteditfirst, geteditlast ,geteditemail,getedituname,geteditpass,getadmin,editLname,editFname,editpassword,editemail,editUname,deluser}