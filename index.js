const express = require('express');
const app = express();
const config = require('config');
const db=require('./models/db');


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const passport= require('passport');


var sessionStore = new MySQLStore({
	host: 'localhost',
    user:"root",
    database:"amazon2"
});

app.use(session({
	secret: 'session_cookie_secret',
	store:sessionStore,
	resave: false,
	saveUninitialized: false})
);


app.use(express.json())
app.use(express.urlencoded({extended:true}));


const home = require('./router/home');
const cart = require('./router/cart');
const auth = require('./router/auth');
const products = require('./router/products');


const path = require('path');
const ejs = require('ejs');



require('./models/passport');

app.use(passport.initialize());
app.use(passport.session());




app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/products/category',express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



//app.use('/',fav);
app.use('/',auth);
app.use('/',cart);
app.use('/',home);
app.use('/products/category',products);



const port = process.env.port ||3200;

app.get('/getdata',async(req, res)=>{
    const [catogires]=await db.query(`SELECT * FROM catogire`);
    let usercart;
    if(req.user===undefined){
        usercart=0;
    }
    else{
        usercart=await db.query(`SELECT pName,pPrice,image,product.proID,c_name,count FROM product ,cart WHERE cart.proID=product.proID AND id =${req.user.id};`);
    }
    res.json({catogires:catogires,usercart:usercart});
})


app.listen(port,()=>{
    console.log(`the server is listening on ${port}`)}
);