const products=require('../router/products')
const db=require('../models/db');

exports.giveAllProducts = async (req, res) => {
    
    const [cat]= await db.query(`SELECT * from catogire`);
    
    if(Object.keys(req.query).length){

        const [rows] = await db.query(`SELECT * from product where c_name = '${req.query.c_name}';`);
        return res.render('shop-list-left',{products:rows,cat:cat});

    }else{
        const [rows] = await db.query(`SELECT * from product ;`);
        return res.render('shop-list-left',{products:rows,cat:cat});
    }
}


exports.givedetails = async (req, res) =>{
    const [rows]= await db.query(`SELECT * FROM product where proID = ${req.query.id}`)
    const [revs]= await db.query(`SELECT * FROM reviews where proID = ${req.query.id} `)
    const [sum]=await db.query(`SELECT sum(rating) as sum FROM reviews where proID = ${req.query.id}  `)

    res.render('products',{proitem:rows[0],reviw:revs,sum:sum[0].sum});
} 

exports.putreview=async (req, res) =>{
    const {rating,reviewcom,username,useremail}=req.body;

    
    if(reviewcom.length&&username.length&&useremail.length&&rating){
        const checker =(await db.query(`SELECT * FROM reviews where useremail='${useremail}' or username='${username}'`))[0].length===0;
        if(checker){
            await db.query(`INSERT INTO reviews(useremail, username, revvcomments,rating,proID)
                            VALUES ('${useremail}','${username}', '${reviewcom}',${rating},${req.query.id});`)
        }
    }

    res.status(204).send();
}