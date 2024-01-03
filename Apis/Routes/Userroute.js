const express = require('express');
const userrouter = express.Router();
const AuthController=require('../Controller/AuthController')
userrouter.post('/Register',AuthController.userregistartion )
userrouter.post('/aa',AuthController.sampletest)
userrouter.post('/Login',AuthController.userlogin)
userrouter.get('/get-all-users',AuthController.GetAllUserList)
userrouter.put('/update-user/:id',AuthController.UpdateUserProfile)
module.exports = userrouter;