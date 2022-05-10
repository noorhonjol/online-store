const express = require('express');
const app = express();
const config = require('config')
const db=require('./models/db');
app.use(express.json())
app.use(express.urlencoded({extended:true}));


const home = require('./router/home');
const cart = require('./router/cart');
const auth = require('./router/auth');
const products = require('./router/products');


const path = require('path');
const ejs = require('ejs');


app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/products/category',express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');




//app.use('/',fav);
app.use('/',auth);
app.use('/',cart);
app.use('/',home);
app.use('/products/category',products);

const port = process.env.port ||3200;


// app.delete('/d/:id',async(req, res)=>{
//     await db.pool.query(`DELETE FROM fav WHERE proID=${req.params.id}`)
//     res.status(200).send()
// })
// app.get('/all',async(req,res)=>{
//     const[rows]=await db.pool.query('SELECT * FROM product');
//     res.send(rows)
// })
app.listen(port,()=>{
    console.log(`the server is listening on ${port}`)}
);