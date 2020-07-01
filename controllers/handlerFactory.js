exports.deleteOne = Model => async (req,res,next)=>{
    try{
        let filterObj = {}
        if(Model.modelName === "Exp"){
          filterObj._id = req.params.eid;
          filterObj.host = req.user._id
            
        }else if(Model.modelName === "Review"){
            filterObj._id = req.params.rid;
            filterObj.user = req.user._id
        }
        const doc = await Model.findOneAndDelete(filterObj)
        
           if(!doc) return res.status(404).json({status:"fail",message:"No document found"})

           res.status(204).end();
       
    }catch (err){
        console.log(err)
        err.statusCode = 500;
        err.status = "erroreeee"
        next(err)
       

    }


}

exports.updateOne = Model => async(req,res,next)=>{
    try{
       
        let filterObj = {}
        let allows =[]
        if(Model.modelName === "Exp"){
          filterObj._id = req.params.eid;
          filterObj.host = req.user._id
           allows =['title','description','tags']
            
        }else if(Model.modeName === "Review"){
            filterObj._id = req.params.rid;
            filterObj.user = req.user._id
            allows =['ratting','review']
        }
        const doc = await Model.findOne(filterObj)

        if(!doc) return res.status(404).json({status:"fail",message:"No document found"})
           

           //change the value of doc properties in doc according to the allows array

            for(const key in req.body){
                if(allows.includes(key)){
                  doc[key] = req.body[key]
                }
            }


            await doc.save();
         

           res.status(200).json({status: "Ok", data: doc});
       
    }catch (err){
        console.log(err)
        return res.status(500).json({status:"error",message:err.message})

    }
}