const products=require('../router/products')
const db=require('../models/db');

module.exports =giveAllProducts=async (req, res) => {
    const [a]=await db.pool.query(`SELECT * FROM catogire`);
    const [rows] = await db.pool.query(`SELECT * from product ;`);
    res.render('shop',{products:rows,categories:a});
    
}
