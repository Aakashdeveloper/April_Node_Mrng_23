const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//get all users
router.get('/users',async (req,res) => {
    let output = await User.find({})
    res.send(output)
})

//regitser user
router.post('/regitser',async (req,res) => {
    //encrypt password
    let hashpassword = bcrypt.hashSync(req.body.password,8)
    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
    })
    res.status(200).send('Registration successfull')
})

//login User
router.post('/login', async(req,res) => {
    let user = await User.findOne({email:req.body.email});
    if(!user) res.send({auth:false,token:'No User Found Register First'})
    else{
        const passIsValid = await bcrypt.compareSync(req.body.password,user.password)
        if(!passIsValid) res.send({auth:false,token:'Invalid Password'})
        // in case both match
        let token = await jwt.sign({id:user._id},config.secret,{expiresIn:86400}) //24hr
        res.send({auth:true,token:token})
    }
})

// userinfo
router.get('/userInfo',async (req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'});
    //jwt verify
    await jwt.verify(token,config.secret,async (err,user) => {
        console.log(">>>>>",user)
        if(err) res.send({auth:false,token:'Invalid Token Provided'})
        let output =  await User.findById(user.id)
        res.send(output)
    });
    
})


module.exports = router;
