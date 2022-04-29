const express = require('express');
const app = express();
const config = require('config')
app.use(express.json())
app.use(express.urlencoded())

const home = require('./router/home');
const cart = require('./router/cart');
const auth = require('./router/auth');
const products = require('./router/products');


const path = require('path');
const ejs = require('ejs');


app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/products/category',express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');



app.use('/',cart);
//app.use('/',fav);
app.use('/',auth);
app.use('/',home);
app.use('/products/category',products);

const port = process.env.port ||3200;

app.listen(port,()=>{
    console.log(`the server is listening on ${port}`)}
);