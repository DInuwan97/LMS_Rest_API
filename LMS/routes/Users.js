const express = require('express');
const users = express.Router(); //for application endpoints
const cors = require('cors'); //to share resources

const jwt = require('jsonwebtoken'); //to secure comunication
const bcrypt = require('bcrypt'); //hash passwords
//var app = express();
const User = require('../models/User');
users.use(cors());

process.env.SECRET_KEY = 'secret';
var port = process.env.PORT || 5000;
//creating routes
//create register route (post)

users.post('/register',(req,res) =>{
    
    const today = new Date();

    //literal object
    const userData = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }


    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                userData.password = hash
                User.create(userData)
                .then(user =>{
                    res.json({status:user.email + "registered"})
                })
                .catch(err =>{
                    res.send("error" +err);
                })
            })
        }else{
            res.json({error:"User already registered"})
        }
    })
    .catch(err =>{
        res.send("error" +err)
    })
});



users.post('/login',(req,res) =>{
    User.findOne({
        email:req.body.email
    })
    .then(user =>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload={
                    _id:user._id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send(token)
            }else{
                res.json({error:"User does not exsist in the system"})
            }
        }else{
            res.json({error:"User does not exsist in the system"})
        }
    })
    .catch(err =>{
        res.send("error" +err);
    })
});


users.get('/profile',(req,res) =>{
    var decoded = jwt.verify(req.headers['authorization'],process.env.SECRET_KEY)
    User.findOne({
        _id:decoded._id
    })
    .then(user =>{
        if(user){
            res.json(user)
        }else{
            res.send("User does not exsist");
        }
    })
    .catch(err =>{
        res.send("Error" +err);
    })
})


module.exports = users;