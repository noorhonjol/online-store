const mysql= require('mysql');
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database:"amazon2"
});

module.exports =pool;