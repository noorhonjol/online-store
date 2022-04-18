const express = require('express');
const app = express();
//const cart = require('./router/cart');
//const fav = require('./router/fav');
const auth = require('./router/auth');
//const home = require('./router/home');
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//app.use('/',cart);
//app.use('/',fav);
app.use('/',auth);


const port = process.env.port ||3200;

app.listen(port,()=>{
    console.log(`the server is listening on ${port}`)}
    );