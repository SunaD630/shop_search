'use strict';

const express = require('express');
const router = express.Router();
const connection = require('../db_client');
const axios = require('axios');
const util = require('util');
const { send } = require('process');
require('dotenv').config();


router.options('/',function(req,res){
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.send("OPTIONS OK");
})
router.post('/',function(req,res) {
  res.setHeader('Access-Control-Allow-Headers','Content-Type',);
  res.setHeader('Access-Control-Allow-Origin','http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods','OPTIONS,POST,GET');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log("dbの検索開始");
  const user_id = req.body.id;
  const selectArea = () => {
    return new Promise(async (resolve, reject) => {
      const area_q = "select * from area where user_id = ?;";
      connection.query(
        area_q,[user_id],(error,results) => {
          console.log(results);
          if(error){
            console.log("area検索失敗")
            reject(error);
          }else{
            console.log("area検索成功");
            resolve(results);
          }
        }
        )
    })
  }
  const selectShop = async(area_list) => {
    var shop_list = await Promise.all(area_list.map(async(area) => {
      return new Promise((resolve, reject) => {
        var area_id = area.area_id;
        const shop_q = "select * from shop where user_id = ? and area_id = ?;"
        connection.query(shop_q, [user_id, area_id],async(error, results) => {
          if(error){
            throw error;
          }else{
            console.log("result: ",results)
            resolve(results);
          }
        });
      })
    }))
    return shop_list;
    }
  const sendData = async() => {
      console.log("sending data...");
      var area_list = await selectArea();
      var shop_list = await selectShop(area_list);
      res.json({'area_list': area_list, 'shop_list': shop_list});
  }
  sendData();
})
  
module.exports = router;