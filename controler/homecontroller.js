const db= require('../models/db');

const giveabout=(req, res)=>{
    res.render('about');
}
const givedatanv=async(req, res)=>{
    try {
        const [catogires]=await db.query(`SELECT * FROM catogire`);
        let usercart;
        if(req.user===undefined){
            usercart=0;
        }
        else{
            usercart=await db.query(`SELECT pName,pPrice,image,product.proID,c_name,count FROM product ,cart WHERE cart.proID=product.proID AND id =${req.user.id};`);
        }
        res.json({catogires:catogires,usercart:usercart});
    } catch (error) {
        console.log("errorhere");
    }

}

const givehome=(req, res) => {
    res.render('index')
}



module.exports ={giveabout,givedatanv,givehome}