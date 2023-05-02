const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const User = require('../model/userSchema');

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());



module.exports = router;
