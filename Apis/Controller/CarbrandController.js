
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dkndusofs',
    api_key: '571435926988956',
    api_secret: '78WJUWWDC2BRTglO_PYU3XPOrjQ'
});
const carbrandmodel=require('../Model/carbrandmodel');

module.exports.uploadCarbranddata=async(req,res)=>{
    try
    {
        const files = req.files.logo;
        cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
            if (err) {
                res.status(500).json({
                    status: 500,
                    msg: "Error while Uploading user Photo",
                    error: err.message
                })

            }
            else if(result){
                const carbranddata=new carbrandmodel({
                  car_brand_name:req.body.name,
                  Logo:result.secure_url  
                });
                carbranddata.save()
                .then((res)=>{
                    res.status(200).json({
                        status: 200,
                        msg: "User successfully registered",
                        userdata: result
                    })
                })
                .catch((erro)=>{
                    res.status(500).json({
                        status: 500,
                        msg: "Error while Uploading Car brand details",
                        error: erro
                    })
                })
            }
        })
    }
    catch(errr){
        res.status(500).json({
            status: 500,
            msg: "Error while Uploading Car brand data",
            error: errr
        })}
}