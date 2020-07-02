const mongoose = require("mongoose")
const Tag = require("./tag")


const schema = new mongoose.Schema({
    title:{
        type: String,
        trim:true,
        minLength: 5,
        maxLength: 100,
        required: true
    },
    description:{
        type: String,
        trim:true,
        minLength: 5,
        maxLength: 1000,
        required: true
    },
    host:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: true
    }],
    averageRating:{
        type:Number,
        default:0,
        min:0,
        max:5
    },
    nRating:{
        type:Number,
        default:0
      
    }
},
{
    timesstamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})



//middleware for post (save)



module.exports = mongoose.model("Exp", schema)