const mysql= require('mysql2/promise');
const config= require('config');
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);

var options = {
    connectionLimit : 10,
	host: 'localhost',
    host            : config.get('db-host'),
    user            : config.get('db-user'),
    database:config.get('db-schema'),
};
var sessionStore = new MySQLStore(options);
var pool  =  mysql.createPool(options);


module.exports ={pool,sessionStore};