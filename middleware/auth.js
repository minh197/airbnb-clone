
const jwt = require("jsonwebtoken")


const User = require("../models/user")

exports.loginRequired = async(req,res,next)=>{
    try{

        if(!req.headers.authorization ||  !req.headers.authorization.startsWith("Bearer ")){
            return res.status(401).json({status: "fail", error: "unauthorized sml"})
        }
        
        const token = req.headers.authorization.replace("Bearer ","");
        console.log("This is my token", token)
        console.log(typeof(token))
        console.log("This is secret", process.env.SECRET)
        let test=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY3MTBlOGE5OGY2YjdmMDk0NmJmNWYiLCJpYXQiOjE1OTMyNzE2NTcsImV4cCI6MTU5Mzg3NjQ1N30.ynOrpy1FEpr_dk4fcK7TVM2-zPnU4dIqVRw8ceaI0-E","supersecret")
        console.log(test,"This is test")
        const decoded = jwt.verify(token,process.env.SECRET)
        console.log(decoded)
        
        
        const user = await User.findById(decoded._id)
        if(!user)
        return res.status(401).json({status: "fail", error: "unauthorized no user"})
        
        req.user = user
        
        // res.send("ok con de")
        // console.log("this is headers", req.headers);

        next()
       
    }catch(err){
        return res.status(401).json({status: "fail", error: err.message})
    }

}

exports.hostRequired = (req,res,next) =>{
    if(req.user.type !== "host"){
        return res.status(401).json({ status: "fail", message: "Host required"})
    }
    next()

}