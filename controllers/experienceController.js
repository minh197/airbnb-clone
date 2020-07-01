
const Exp = require("../models/experience")
const Tag = require("../models/tag")
const {deleteOne,updateOne} = require("./handlerFactory")
exports.getExperiences = async (req,res,next) =>{

    const exps = await Exp.find()
    .populate("tags")
    .populate("host")



   res.json({status: "ok", data: exps})
}

const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")



exports.createExperience =catchAsync(async(req,res,next) =>{

  
        const {title, description, tags} = req.body

        if(!title || !description || !tags){

            next(new AppError(400,"title, description, tags are required"))
            
        };

        
    const newArr = await Tag.convertToObject(tags)
    console.log(newArr)
        const exp = await Exp.create({title,
             description,
              tags: newArr,
            host: req.user._id})
        res.status(201).json({status: "ok", data: exp})
    
   
}) 

exports.deleteExperience = deleteOne(Exp);
exports.updateExperience = updateOne(Exp);
