const express = require('express');
const userrouter = express.Router();
const AuthController=require('../Controller/AuthController');
const requireauth = require('../Middleware/Auth-Middleware');
userrouter.post('/Register',AuthController.userregistartion )
userrouter.post('/aa',AuthController.sampletest)
userrouter.post('/Login',AuthController.userlogin)
userrouter.get('/get-all-users',AuthController.GetAllUserList)
userrouter.put('/update-user/:id',AuthController.UpdateUserProfile)
userrouter.delete('/delete-user/:id',AuthController.DeleteUserProfile)
userrouter.get('/get-user',requireauth,AuthController.GetUserProfile)
module.exports = userrouter;