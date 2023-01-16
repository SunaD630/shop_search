require('dotenv').config();
const mysql = require('mysql2');
const env = process.env


function connectMYSQL(){
    console.log("user = "+env.MYSQL_USER);
    const connection = mysql.createConnection({
        host: 'db',
        user: env.MYSQL_USER,
        password: env.MYSQL_ROOT_PASSWORD,
        database: env.MYSQL_DATABASE,
        multipleStatements: true
    });
    connection.connect((err) => {
    if (err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(connectMYSQL, 2000); //2秒待ってから処理
        }
    }
    }); 
    console.log("succeed to connect");
    module.exports = connection;
}

connectMYSQL();