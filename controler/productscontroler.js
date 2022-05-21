const products=require('../router/products')
const db=require('../models/db');

exports.giveAllProducts = async (req, res) => {


    const [rows] = await db.query(`SELECT * from product ;`);
    res.render('shop-list-left',{products:rows,session:req.session});
    
}
exports.givcatproducts =async (req, res) =>{
    const [a]=await db.pool.query(`SELECT * FROM catogire`);
    const [rows] = await db.pool.query(`SELECT * from product where catagioresID=${req.query.id};`);
    res.render('shop',{products:rows,categories:a,session:req.session});

}