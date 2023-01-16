'use strict';

const express = require('express');
const router = express.Router();
const connection = require('../db_client');
const { Sequelize } = require('sequelize');
const axios = require('axios');
require('dotenv').config();



const env = process.env;
const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const config = {
    headers: {'X-API-KEY' : env.RESAS_API_KEY}
};

// const sequelize = new Sequelize(
//     env.MYSQL_DATABASE, 
//     env.MYSQL_USER, 
//     env.MYSQL_ROOT_PASSWORD, 
//     {
//         host: 'db', 
//         dialect: 'mysql',
//     }
// );

async function setPrefArr(data){
    var pref_arr = [];
    data.forEach(pref => {
        pref_arr.push(pref.prefName);
    });
    return pref_arr;
}

router.get('/', async function(req,res){
    res.setHeader('Access-Control-Allow-Headers','Content-Type',);
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
    res.setHeader('Access-Control-Allow-Credentials', true);
    connection.query("insert into usr set ?",{user_id: 2,user_name:'Tanaka',password:'12345',email:'tanaka@gmail.com'},function(error,results,fields){
        if (error) throw error;
        console.log(results);
    });
    // connection.query('select * from usr', function(err, usr){
    //     if (err) throw err;
    //     console.log(usr); // queryの結果が返ってくる
    // });
    // try{
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    // }catch(error){
    //     console.error('Unable to connect to the database:', error);
    // }
})

router.get('/prefectures', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers','Content-Type',);
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
    res.setHeader('Access-Control-Allow-Credentials', true);
    axios.get(url, config)
    .then((response) => {
        setPrefArr(response.data.result).then(pref_arr => {
            console.log(pref_arr);
            res.json({"prefectures": pref_arr});
            res.end();
        });
    })
    .catch(() => {
        console.log("connect failed");
    });
});
router.options('/prefectures',function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send("OPTIONS OK");
  res.end();
})

router.options('/register', function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send("OPTIONS OK");
  res.end();
})

router.post('/register', function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
})

module.exports = router;