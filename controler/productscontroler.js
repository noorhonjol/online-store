const products=require('../router/products')
const db=require('../models/db');

exports.giveAllProducts = async (req, res) => {
    const [a]=await db.pool.query(`SELECT * FROM catogire`);
    const [rows] = await db.pool.query(`SELECT * from product ;`);
    res.render('shop',{products:rows,categories:a,session:req.session});
    
}
exports.givcatproducts =async (req, res) =>{
    const [a]=await db.pool.query(`SELECT * FROM catogire`);
    const [rows] = await db.pool.query(`SELECT * from product where catagioresID=${req.query.id};`);
    res.render('shop',{products:rows,categories:a,session:req.session});

}