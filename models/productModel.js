const mongoose=require('mongoose')
const Schema=mongoose.Schema

const reviewSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

const productSchema=new Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
name:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true,
},
description:
{
    type:String,
    required:true
},
brand:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true,
    default:0
},
countInStock:{
    type:Number,
    required:true,
    default:0
},
rating:{
    type:Number,
    required:true,
    default:0.0
},
numReviews:{
    type:Number,
    required:true,
    default:0
},
reviews:[reviewSchema],
},{timestamps:true})

const Product=mongoose.model('product',productSchema)
module.exports=Product