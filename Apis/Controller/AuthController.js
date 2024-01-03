const user = require('../Model/usermodel');
const validator = require('validator')
const bycryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dkndusofs',
    api_key: '571435926988956',
    api_secret: '78WJUWWDC2BRTglO_PYU3XPOrjQ'
});

const GenerateToken = async (userdata) => {
    return jwt.sign({ userdata }, process.env.JWT_SECRET_KEY)

}

module.exports.sampletest = (req, res) => {
    const { Email } = req.body;
    console.log('--data--', Email)
    res.status(200).json({
        msg: "Sample",
        data: Email
    })
}


module.exports.userregistartion = async (req, res) => {
    try {
        const { Email, Password, Name, Phone, Location } = req.body;
        const files = req.files.Pic;
        // console.log(await req.body,'-aa-',files,'asasas')
        user.find({ Email: Email }).then(async (result) => {
            if (result.length > 0) {
                res.status(500).send({
                    status: 500,
                    msg: "Already registered",
                })
            }
            else {

                const val = validator.isEmail(Email);
                if (val) {
                    if (Password.length >= 8) {
                        const salt = await bycryptjs.genSalt(10);
                        const hashpass = await bycryptjs.hash(Password, salt);
                        cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
                            if (err) {
                                res.status(500).json({
                                    status: 500,
                                    msg: "Error while Uploading user Photo",
                                    error: err.message
                                })

                            }
                            else if (result) {
                                const userdata = new user({
                                    Email: Email,
                                    Password: hashpass,
                                    Name: Name,
                                    Phone: Phone,
                                    Location: Location,
                                    Photo: result.secure_url
                                });
                                userdata.save()
                                    .then((result) => {
                                        res.status(200).json({
                                            status: 200,
                                            msg: "User successfully registered",
                                            userdata: result
                                        })
                                    })
                                    .catch((error) => {
                                        res.status(500).json({
                                            status: 500,
                                            msg: "Error while regestring user",
                                            error: error
                                        })
                                    })
                            }
                            else {
                                res.status(500).json({
                                    status: 500,
                                    msg: "Error while Uploading user Photo",
                                    // error: err.message
                                })
                            }
                        })
                    }
                    else {
                        res.status(500).json({
                            status: 500,
                            msg: "Password is too short please enter atleast 8 characters , number"
                        })
                    }
                }
                else {
                    res.status(500).json({
                        status: 500,
                        msg: "Please Enter Valid Email",
                    })
                }

            }
        })
    }
    catch (errr) {
        res.status(500).json({
            status: 500,
            msg: "Error while registring user",
            error: errr
        })

    }
}



module.exports.userlogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        await user.find({ Email: Email })
            .then(async (result) => {
                if (result.length > 0) {
                    const isPasswordcorrect = await bycryptjs.compare(Password, result[0].Password)
                    // console.log(isPasswordcorrect)

                    if (isPasswordcorrect) {
                        const details = {
                            id: result[0]._id,
                            name: result[0].Name,
                            Email: result[0].Email,
                            Role: result[0].Role
                        }
                        // console.log('--ddddd--',details)
                        const Token = await GenerateToken(details)
                        res.status(200).json({
                            status: 200,
                            msg: "Logged in Successfully!",
                            user: result[0],
                            AuthToken: Token
                        });
                    }
                    else {
                        res.status(500).json({
                            status: 500,
                            msg: "Invalid Email and Password , Please Enter correct Email and Password!",
                        });
                    }
                }
                else {
                    res.status(500).json({
                        status: 500,
                        msg: "User Not Found! Please Enter Valid Email Address.",
                        // error:err
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    msg: "Invalid Email and Password , Please Enter correct Email and Password!",
                    // error:err.message
                })
            })
    }
    catch (errr) {
        res.status(500).json({
            status: 500,
            msg: "Error while Login user",
            error: errr.message
        })
    }
}



module.exports.GetAllUserList = async (req, res) => {
    try {
        await user.find().select('-Password')
            .then((result) => {
                res.status(200).json({
                    status: 200,
                    count: result.length,
                    msg: "Sucessfully get user list",
                    data: result
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 500,
                    msg: "Error while Login user",
                    error: err.message
                })
            })
    }
    catch (errr) {
        res.status(500).json({
            status: 500,
            msg: "Error while Login user",
            error: errr.message
        })
    }
}


module.exports.UpdateUserProfile = async (req, res) => {
try{
    const id=req.params.id;
    const updateduser=await user.findByIdAndUpdate(id,{$set:req.body},{new:true});
    res.status(200).json({
        status: 200,
        msg:"Successfully updated user profile",
        user:updateduser
    })
}
catch (errr) {
    res.status(500).json({
        status: 500,
        msg: "Error while Updating user",
        error: errr.message
    })
}

}


module.exports.DeleteUserProfile=async(req,res)=>{
    try
    {
        const id=req.params.id;
        const deleteddata=await user.findByIdAndDelete(id)
        if(deleteddata!=null)
        {
            res.status(200).json({
                status: 200,
                msg:"Successfully Deleted user profile",
                deleted_user:deleteddata
            })
        }
        else{
            res.status(200).json({
                status: 200,
                msg:"user profile already deleted"
                // deleted_user:deleteddata
            })
        }
    }
    catch(errr)
    {
        res.status(500).json({
            status: 500,
            msg: "Error while Deleting user",
            error: errr.message
        })
    }
}

module.exports.GetUserProfile=async(req,res)=>{
    try{
        const data = req.UserData.userdata;
        console.log('--dede--',req.UserData.userdata)
        const userprodata=await user.findById(data.id)
        // console.log(userprodata)
        if(userprodata)
        {
                res.status(200).json({
                    status: 200,
                    msg: "Sucessfully get user data!",
                    data: userprodata
                })
        }
        else{
                res.status(200).json({
                    status: 200,
                    msg: "Error while Getting result",
                })
        }
    }
    catch(errr)
    {
        res.status(500).json({
            status: 500,
            msg: "Error while getting user profile",
            error: errr.message
        })
    }
}