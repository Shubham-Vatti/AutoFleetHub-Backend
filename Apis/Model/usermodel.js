const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    Name:{type:String,required:true},
    Phone:{required:true,type:String},
    Location:{type:String,required:true},
    Photo:{type:String,required:true},
    Role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    wishlist:[{type:Array,ref:"Car"}],
},
{
    timestamps:true
})


module.exports=mongoose.model("user",userschema)