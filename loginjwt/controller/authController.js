const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

///regsiter User
router.post('/register',(req,res) => {
    //encrypt password
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
    },(err,data) => {
        if(err) res.status(500).send('Error While Register')
        res.status(200).send('Registration Successful')
    })
})

//login User
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) res.send({auth:false,token:'Error while login'})
        if(!user) res.send({auth:false,token:'No User Found Register First'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) res.send({auth:false,token:'Invalid Password'})
            // in case bot are correct generate token
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400}) //24hr
            res.send({auth:true,token:token})
        }
    })
})

//userInfo
router.get('/userInfo',(req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token'})
        User.findById(user.id,(err,result) => {
            res.send(result)
        })
    })
})


module.exports = router;
