const express=require('express')
const { JobModel } = require('../Model/jobs.model')
const jobRouter=express.Router()

jobRouter.get('/', async (req,res)=>{
    let language =req.query.language
    if(language){
        try{
         let jobs=await JobModel.find({language:language})
         res.status(200).send(jobs)
        }catch(err){
            res.status(400).send({"msg":err.message})
        }
    }else{
        try{
            let jobs=await JobModel.find()
            res.status(200).send(jobs)
           }catch(err){
               res.status(400).send({"msg":err.message})
           }
    }
    
})

jobRouter.post('/add', async (req,res)=>{
    try{
        let jobs=new JobModel(req.body)
        await jobs.save()
        res.status(200).send({"msg":"New Job Added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={jobRouter}