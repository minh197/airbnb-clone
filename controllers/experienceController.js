
const Exp = require("../models/experience")
const Tag = require("../models/tag")

exports.getExperiences = async (req,res,next) =>{

    const exps = await Exp.find()
    .populate("tags")
    .populate("host")



   res.json({status: "ok", data: exps})
}

exports.createExperience = async(req,res,next) =>{

    try{
        const {title, description, tags} = req.body

        if(!title || !description || !tags){
            return res.status(400).json({status: "fail",
             error: "title, description, tags are required"})
        }
    const newArr = await Tag.convertToObject(tags)
    console.log(newArr)
        const exp = await Exp.create({title,
             description,
              tags: newArr,
            host: req.user._id})
        res.status(201).json({status: "ok", data: exp})
    }
    catch(err){
        console.log(err)
        res.send("errorr")
    }
   
}