const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")

const {deleteOne} = require("./handlerFactory")
const Review = require("../models/review")




exports.getReviews = catchAsync(async (req,res,next) => {
    const reviews = await Review.find()
    res.json({status: "ok",data: reviews})
})



exports.updateReview = catchAsync(async (req,res,next) => {
    const review = await Review.findOneAndUpdate(
        {user: req.user._id},
        {...req.body,user:req.user._id},
        {
            upsert: true,
            new:true,
            runValidation: true
        })
    res.json({status: "ok",data: review})
})


exports.createReview = catchAsync(async(req,res,next) => {
    const check = await Review.exist({ experience:req.params.eid,
    user:req.user._id
})
if(check){
    return next(new AppError(403, "Already reviewed"))
}
const review = await Review.create({
    ...req.body,
    experience:req.params.eid,
    user:req.user._id
})
res.status(201).json({status: "ok",data:review})

})

exports.deleteReview = deleteOne(Review)