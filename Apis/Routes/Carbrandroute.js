const express = require('express');
const CarbrandController = require('../Controller/CarbrandController');
const carbrandroute = express.Router();

carbrandroute.post('/upload-data',CarbrandController.uploadCarbranddata );


module.exports=carbrandroute;