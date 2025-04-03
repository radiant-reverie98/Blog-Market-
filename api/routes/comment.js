const express = require('express')
const router = express.Router()
const verifyToken = require('../verifyToken')

const Comment = require('../models/comment')

// CREATE

router.post('/create',verifyToken,async (req,res)=>{
    try{
        const newComment = new Comment(req.body)
        const saveComment = await newComment.save()
        res.status(200).json({message:"Comment created successfully",post : saveComment})
    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE

router.put('/:id',async (req,res)=>{
    try{
        
        const updatedComment = await Comment.findOneAndUpdate({userId:req.params.id},{$set:req.body},{new:true})
        res.status(200).json(updatedComment)
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE

router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await Comment.findOneAndDelete({_id:req.params.id})
        
        res.status(200).json({message : "Comment has been removed successfully"})

    }catch(err){
        res.status(500).json({message : err})
    }
})

// GET POST DETAILS
router.get('/',async(req,res)=>{
    try{
        const existComment = await Comment.find()
        
        res.status(200).json({message : "Post details valid",user : existComment})
    
    }catch(err){
        res.status(500).json({message: err})
    }
})

// POST OF PARTICULAR USER
router.get('/:userId',async(req,res)=>{
    try{
        const existComment = await Comment.find({userId:req.params.userId})
        
        res.status(200).json({message : "Post details valid",user : existComment})
    
    }catch(err){
        res.status(500).json({message: err})
    }
})



module.exports = router