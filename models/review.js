const mongoose = require("mongoose")
const Exp = require("./experience")


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

schema.post("save",async function(){
    await this.constructor.calculateAverage(this.experience) 
})


schema.pre(/^findOneAnd/, async function(){

    // this.findOne()
   this.doc = await this.findOne()
    if(!this.doc){
       return  next(new AppError(404,"Doc not found"))
    }
    return next()

})


schema.post(/^findOneAnd/, async function(){
    await this.doc.constructor.calculateAverage(this.doc.experience)
})


schema.statics.calculateAverage = async function(eid){
    //this refers to the model
    const stats = await this.aggregate([
        {
            $match: {experience: eid}
        },
        {
            $group: {
                _id: "$experience",
                nRating: { $sum:1},
                avgRating:{ $avg: "$rating"}
            }
        }
    ])


    await Exp.findByIdAndUpdate(eid,{
        nRating: stats.length >0 ? stats[0].nRating : 0 ,
        averageRating: stats.length >0 ? stats[0].avgRating :0
    })
    console.log("This is my stas",stats)
}


module.exports = mongoose.model("Review",schema)