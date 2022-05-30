const db=require('../models/db');

const addtocart=async(req,res)=>{

    try {
        const {id}=req.body;
        if(req.user===undefined){
            res.send('/login')
        }else{
            
            const [rows]=await db.query(`SELECT * FROM cart WHERE id=${req.user.id} AND proID=${id}`);
            if(!rows.length){
                await db.query(`INSERT INTO cart VALUES (${req.user.id},${id},1,1,1,1);`);
                
            }else{
                await db.query(`UPDATE cart SET count =count+1 WHERE id = ${req.user.id} AND proID = ${id} `)
                
            }
            return res.status(204).send();
        }
    
    } catch (error) {
        console.log("thereiserror");
    }

}

const addTofav=async(req,res)=>{
    try {
        const {id}=req.body;

        if(req.user===undefined){
            res.send('/login')
        }else{
            
            const [rows]=await db.query(`SELECT * FROM fav WHERE id=${req.user.id} AND proID=${id}`);
    
            if(!rows.length){
                await db.query(`INSERT INTO fav VALUES (${req.user.id},${id});`);
                
            }
    
            return res.status(202).send();
        }
    } catch (error) {
        console.log("thereiserror");
    }
}
const getCart=async(req,res)=>{

    try {
        if(req.user==undefined){
            res.redirect('/homepage')
        }else{
            const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,c_name,count,tax FROM product,cart WHERE cart.proID=product.proID AND id =${req.user.id};`);
            const [tax] = await db.query(`SELECT sum(tax) as tax FROM product,cart WHERE cart.proID=product.proID AND id =${req.user.id} `)
            const [subtotal] = await db.query(`SELECT sum(count*price) as subtotal FROM product,cart WHERE cart.proID=product.proID AND id =${req.user.id} `)
            console.log(subtotal);
    
            res.render('cart',{products:rows,tax:parseInt(tax[0].tax),subtotal:parseInt(subtotal[0].subtotal)})
        }
    } catch (error) {
        console.log("thereiserror");
    }
}

const getfav=async(req,res)=>{
    try {
        if(req.user==undefined){
            res.redirect('/login')
        }else{
            const [rows] = await db.query(`SELECT pName,pPrice,image,product.proID,c_name FROM product ,fav WHERE fav.proID=product.proID AND id ='${req.user.id}';`);
            res.render('wishlist',{products:rows})
        }
    } catch (error) {
        console.log("thereiserror");
    }
}
const deleteCart=async(req,res)=>{
    try {
        if(req.user===undefined){
            return res.redirect('/login')
        }else{
            await db.query(`DELETE FROM cart WHERE id=${req.user.id} AND proID=${req.params.id}`)
            return res.status(204).send();
        }
    } catch (error) {
        console.log("thereiserror");
    }

}

const deletefev=async(req,res)=>{
    try {
        if(req.user===undefined){
            return res.redirect('/login')
        }else{
            await db.query(`DELETE FROM fav WHERE id=${req.user.id} AND proID=${req.params.id}`)
            return res.status(204).send();
        }
    } catch (error) {
        console.log("thereiserror");
    }

}
module.exports={addtocart,addTofav,getCart,getfav,deleteCart,deletefev}