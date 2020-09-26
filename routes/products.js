const express = require('express');
const db = require('../db');
const mysql = require('mysql');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const router=express.Router();

const pool = mysql.createConnection({
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: 'root',
    database: 'projectdb',
    host: 'localhost',
    port: '3306',
    insecureAuth : true,
    multipleStatements: true

});


const poolForUpdateQuery = mysql.createConnection({
    connectionLimit: 10,
    password: process.env.DB_PASSWORD,
    user: 'root',
    database: 'projectdb',
    host: 'localhost',
    port: '3306',
    insecureAuth : true,
    multipleStatements: true

});
//GET ROUTES

router.post('/viewProduct/:PID' ,async (req,res) =>{

    newPID=req.params.PID;
    //console.log(newPID);
    pool.query('SELECT * FROM product WHERE PID=?', newPID, function(error,results, fields){
        if(results[0] == undefined){
            res.status(404).send("No product found!")
        }
        else{
            res.send(results);
        }
    })
});

router.post('/viewProduct', async (req,res)=>{

    pool.query('SELECT * FROM product', function (error, results, fields){

        if(error){
            res.status(404).send(error);            
        } 
        else {
            res.send(results);
        }
    })

});

//POST ROUTES

router.post('/addProduct' , async (req, res) =>{

    pid = randomGenerator(); 
    pname = req.body.Pname;
    image = req.body.image;
    SP_per_unit = req.body.SP_per_unit;
    avail_quantity = req.body.avail_quantity;
    category = req.body.category;

    pool.query('SELECT * FROM product WHERE PID=?' , pid, function( error, results, fields){
        if(error){
            //console.log(pid);
            var sqlPost = "INSERT INTO product (PID, Pname, image, SP_per_unit, avail_quantity, category) VALUES ?";
            var  postData   = [[pid, pname, image, SP_per_unit, avail_quantity, category ]];
            pool.query(sqlPost, {postData}, function(error, results, field) {
                 if(error){
                    throw error;
                }
                res.send(JSON.stringify(results));
    })

        }
        else{
            
            newPID = randomGenerator();
            //console.log(newPID);
            var sqlPost = "INSERT INTO product (PID, Pname, image, SP_per_unit, avail_quantity, category) VALUES ?";
            var newPostData = [[newPID, pname, image, SP_per_unit, avail_quantity, category]];

            pool.query(sqlPost, [newPostData], function(error, results, field) {
                if(error){
                   throw error;
               }
               res.send(JSON.stringify(results));
            }) 
        }
    })

});

//POST ROUTE FOR UPDATING THE PRODUCT INFORMATION

router.post('/updateProduct/:PID', async (req,res)=>{

    newPID=req.params.PID;
    newSP= req.body.SP_per_unit;
    newQuantity= req.body.avail_quantity;

    poolForUpdateQuery.query('UPDATE product SET SP_per_unit = :SP_per_unit, avail_quantity= :avail_quantity WHERE PID= :PID ', {SP_per_unit: newSP, avail_quantity: newQuantity, PID: newPID}, function(error, results, fields){

        if(error){
            throw error;
        }
        else{
            res.send(results)
        }
            
    } )
})

//DELETE ROUTE FOR DELETING A PRODUCT.

router.delete('/deleteProduct/:PID', async (req,res) =>{

    deletePID=req.params.PID
    pool.query('DELETE FROM product WHERE PID=?' ,[deletePID], function(error,results, fields){
        if(results.affectedRows==0){
            res.send("The entered Product ID is not Present")
        }
        else{
            res.status(200).send("Product Successfully Deleted!")
        }   console.log("Number of rows affected" + ""+ results.affectedRows)
    })
})


//Including Custom Format

poolForUpdateQuery.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };

//Random ID GENERATOR FOR PRODUCT

function randomGenerator() {
     return Math.floor((Math.random() * 1000) + 1);
  }

module.exports=router;