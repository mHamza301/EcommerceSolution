//IMPORTS
const express = require('express');
const db = require('../db');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const joiSql = require('joi-sql');
//const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const data = require('./data')

dotenv.config();
const router=express.Router();

//Connection with Database
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


//GLOBAL VARIABLES

var CoID = randomGenerator();
//console.log(CoID);


//GET REQUEST
/*router.get('/all' , async  (req, res, next) => {
    try {
    let result = await db.all();
    res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
*/
/*router.get('/:id' , async  (req, res, next) => {
    try {
    let result = await db.one(req.params.id);
    res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
}); */

router.get('/:id', (req,res)=>{
    const productID = req.params.id;
    const prod = data.product.find(x=>x._id === productID);
    if(prod){
        res.send(prod);
    }
    else{
        res.status(404).send({msg : "Product Not Found"});
    }
    
})

router.get('/', (req,res) =>{
    res.send(data.product);
});  

//router.get('/createAdmin', async (req,res) =>{

    //res.send

//})


//POST REQUESTS

/*router.post('/guestCheckout', async (req,res)=>{
    
}) */

router.post('/register', async (req, res) => {
    
    
    fname=req.body.fname;
    password=req.body.password;
    lname=req.body.lname;
    phoneNumber=req.body.phoneNumber;
    address=req.body.address;
    email=req.body.email;
     

    const emailCheck = await isEmailInUse(email);
     if (emailCheck===true){
         res.status(400).send('Email Already Present!');

     }else{

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    var sqlPost = "INSERT INTO User_Details (fname, password, lname, phoneNumber, address, email) VALUES ?";
    var postData  = [[fname, hashedPassword, lname, phoneNumber, address,email]]; 
           
    pool.query(sqlPost, [postData], function (error, results, fields) {
       if (error){
        throw error;
       } 
       res.send(JSON.stringify(results));
       
       var addCoID = "INSERT INTO consumer (CoID) VALUES ?";

       var CoID_Data = [[CoID]]
       pool.query(addCoID, [CoID_Data], function(error, results, fields){
           if(error){
               throw error;
           }
           else{
               res.send(results);
           }
       })

     })};
     
   
 });


router.post('/login', async (req,res) =>{

    var email=req.body.email;
    var password=req.body.password;
    
    var hashedPassword;
    var greetName;
    //Email Validation

    const checkEmail= await isEmailInUse(email);
    if(!checkEmail){
        return res.status(400).send("Email is incorrect");
    }

    //Password retrival and validation by BCRYPTJS
    pool.query('SELECT password,fname FROM User_Details WHERE email=?', [email], function(error, results, fields){
        if(error) {
            throw error;
        }
            else{
                //console.log(results);
                greetName = results[0].fname;
                //console.log(results[0].fname)
                hashedPassword=results[0].password;
                 bcrypt.compare(password, hashedPassword, function(error, result){
                    if(error){
                        throw error;
                    }
                    else{
                        if(result===true){
                            res.send(greetName);
                    
                        }else{
                            res.status(404).redirect('/login');
                        }
                        
                    }
                    
                }  
                );               
                }
    });
 
})


router.post('/registerSeller', async (req, res) => {
    
    sellerID=randomGenerator();
    sellerName=req.body.sellerName;
    sellerEmail=req.body.sellerEmail;
    sellerPassword=req.body.sellerPassword;
    sellerContact=req.body.sellerContact;
    sellerAddress=req.body.sellerAddress;
 
   const emailCheck = await sellerEmailUse(sellerEmail);
        if (emailCheck===true){
        res.status(400).send('Email Already Present!');

        }else{

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(sellerPassword, salt);

   var sqlPost = "INSERT INTO seller (sellerID, sellerName, sellerEmail, sellerPassword, sellerContact, sellerAddress) VALUES ?";
   var postData  = [[sellerID, sellerName, sellerEmail, hashedPassword, sellerContact, sellerAddress]]; 
          
   pool.query(sqlPost, [postData], function (error, results, fields) {
        if (error){
            throw error;
        } 
      res.send(JSON.stringify(results));
      
    })};
    
});

router.post('/loginSeller', async (req,res) =>{

    var email=req.body.sellerEmail;
    var password=req.body.sellerPassword;
    
    var hashedPassword;
    var greetName;
    //Email Validation

    const checkEmail= await sellerEmailUse(email);
    if(!checkEmail){
        return res.status(400).send("Email is incorrect");
    }

    //Password retrival and validation by BCRYPTJS
    pool.query('SELECT sellerPassword,sellerName FROM seller WHERE sellerEmail=?', [email], function(error, results, fields){
        if(error) {
            throw error;
        }
            else{
                greetName = results[0].sellerName;
                hashedPassword=results[0].sellerPassword;
                bcrypt.compare(password, hashedPassword, function(error, result){
                    if(error){
                        throw error;
                    }
                    else{
                        if(result===true){
                            res.send(greetName);
                
                        }else{
                            res.status(404).redirect('/loginSeller');
                        }
                        
                    }
                    
                }  
                );               
                }
    });
 
})





//EMAIL CHECK FUNCTION FOR USER

 function isEmailInUse(email){
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) AS total FROM User_Details WHERE email = ?', [email], function (error, results, fields) {
            if(!error){
                //console.log("EMAIL COUNT : "+results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
}

//EMAIL CHECK FUNCTION FOR SELLER

function sellerEmailUse(email){
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) AS total FROM seller WHERE sellerEmail = ?', [email], function (error, results, fields) {
            if(!error){
                //console.log("EMAIL COUNT : "+results[0].total);
                return resolve(results[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
          }
        );
    });
}

//Radom Number Generator
function randomGenerator() {
    return Math.floor((Math.random() * 1000) + 1);
 }

module.exports= router;
