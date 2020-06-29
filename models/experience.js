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
    }]
},
{
    timesstamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})



// schema.pre("save", async function(next){

//     let arr=[...this.tags] // array of strings

//     let foo= arr.map( async e=> await Tag.findOne({tag: e.toLowerCase().trim()}))

//     let result = Promise.all(foo)
//     this.tags = result
//     next()
// })

module.exports = mongoose.model("Exp", schema)