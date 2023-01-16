'use strict';

const express = require('express');
const router = express.Router();
const connection = require('../db_client');
const axios = require('axios');
require('dotenv').config();



const env = process.env;
const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
const config = {
    headers: {'X-API-KEY' : env.RESAS_API_KEY}
};

async function setPrefArr(data){
    var pref_arr = [];
    data.forEach(pref => {
        pref_arr.push(pref.prefName);
    });
    return pref_arr;
}


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
  const user_data = req.body;
  console.log(user_data);
  const q = "select count(*) into @userNum from usr;select @userNum + 1; insert into usr values(@userNum + 1,?,?,?);";
  connection.query(
    q,[user_data.name,user_data.password,user_data.email],(error,results) => {
      if (error) throw error;
      console.log(results);
    }
  )
  res.send("OK");
  res.end();
})

module.exports = router;