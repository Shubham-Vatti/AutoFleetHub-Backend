const jwt=require('jsonwebtoken');


const requireauth=(req,res,next)=>{
    try
    {
        const Auth_Token=req.headers.authorization.split(' ')[1];
        const decode=jwt.verify(Auth_Token,process.env.JWT_SECRET_KEY)
        req.UserData=decode;
        // console.log('--decoded---',decode)
        next();
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            status:500,
            msg:"Authentication Error"
        })
    }
}

module.exports=requireauth;