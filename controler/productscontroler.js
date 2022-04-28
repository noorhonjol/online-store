const products=require('../router/products')
const db=require('../models/db');

module.exports =giveAllProducts=async (req, res) => {
    const [rows]=await db.pool.query(`SELECT * from product ;`);
    res.render('shop',{products:rows})
}
