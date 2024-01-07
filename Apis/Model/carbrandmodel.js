const mongoose=require('mongoose');

const carbrandschema=new mongoose.Schema({
    car_brand_name:{type:String,required:true},
    // Password:{type:String,required:true},
    // Name:{type:String,required:true},
    // Phone:{required:true,type:String},
    // Location:{type:String,required:true},
    Logo:{type:String,required:true},
    // Role:{
    //     type:String,
    //     enum:["user", "admin"],
    //     default:"user"
    // },
    // wishlist:[{type:Array,ref:"Car"}],
},
{
    timestamps:true
})


module.exports=mongoose.model("carbrand",carbrandschema)