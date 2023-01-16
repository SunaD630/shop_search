'use strict';

var express = require('express');
var router = express.Router();
const connection = require('../db_client');
const axios = require('axios');
require('dotenv').config();

const env = process.env

const toAreaCode = area_name => { // エリア名から中エリアコードを文字列で返す
  return new Promise((resolve) => {
    const area_url = "http://webservice.recruit.co.jp/hotpepper/middle_area/v1/";
    const area_body = {
      'key': env.HOTPEPPER_API_KEY,
      'keyword': area_name,
      'format': 'json'
    }
    axios.get(area_url,{params:area_body})
    .then(function(response){
      resolve(response.data.results.middle_area[0].code);
    })
    .catch(function(error){
      console.log(error);
    })
  });
}

const createShopList = (shop_data,area_code) => { // 店データAPIを叩く、shop_infoに必要な情報だけ詰めて店のリストを返す
  return new Promise((resolve) => {
    const shop_url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/";
    const shop_body = {
      'key': env.HOTPEPPER_API_KEY,
      'name': shop_data.name,
      'middle_area': area_code,
      'format': 'json'
    }
    axios.get(shop_url,{params:shop_body})
    .then(function(response){
        const shop_list = response.data.results.shop;
        var shop_info = [];
        shop_list.forEach(shop => {
            shop_info.push({
              'name': shop.name,
              'logo_image': shop.logo_image,
              'URL': shop.urls.pc,
              'genre': shop.genre.catch,
              'mid_area_code': shop.middle_area.code,
              'address': shop.address,
              'station': shop.station_name
            });
        })
        resolve(shop_info);
    })
    .catch(function (error) {
        console.log(error);
    })
  })
}

 function showShopList(shop_data){
   return new Promise((resolve) => {
    toAreaCode(shop_data.middle_area).then((area_code) => {
      createShopList(shop_data,area_code).then((shop_info) => {
        resolve(shop_info);
      })
    }).catch((error) => {
      console.log(error);
    })
   })
}


router.options('/register',function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send("OPTIONS OK");
  res.end();
})
router.post('/register',function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log(req.body);
  const q = "select count(*) into @areaNum from Shop; insert into Area values(@areaNum + 1,?,?);select @areaNum + 1; ";
  connection.query(
    q,["0000",req.body.mid_area_code],(error,results) => {
      console.log(results[2]);
      console.log(error);
      console.log("エリア登録済み");
    }
  )
  res.end();
})


router.options('/search',function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send("OPTIONS OK");
  res.end();
})
router.post('/search',function(req,res) {
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("検索データが送信されました");
  const shop_data = req.body;
  showShopList(shop_data).then((shop_info) => {
    console.log("shop_info",shop_info);
    res.send(shop_info);
    res.end();
  });
})

module.exports = router;
