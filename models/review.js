const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    body:{
        type:String,
        trim:true,
        default:""
    },
    ratting:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    experience:{
        type:mongoose.Types.ObjectId,
        ref:"Exp",
        required:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});