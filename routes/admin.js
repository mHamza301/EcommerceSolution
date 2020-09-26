const express = require('express');
const router=express.Router();
const verify = require('./tokenVerification');

router.post('/', verify, (req, res) =>{

    res.send(req.user);

})




module.exports=router;