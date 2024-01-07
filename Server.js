const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userrouter =require('./Apis/Routes/Userroute')
const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const carbrandroute = require('./Apis/Routes/Carbrandroute');
const app=express();
dotenv.config();
mongoose.connect(process.env.MONGO_DB_URL)
mongoose.connection.on('connected',()=>{
    console.log("Connected to Mongo")
})
mongoose.connection.on('error',()=>{
    console.log("Connection error")
})

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())
app.use('/v1/auth',userrouter)
app.use('/car-brands',carbrandroute)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Authorization,Accept');
    if(res.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
        res.status(200).json({})
    }
    next()
})

app.use((req, res, next) => {
    res.status(400).json({
        status:400,
        Error:"Bad Request"
    })
})


module.exports=app;