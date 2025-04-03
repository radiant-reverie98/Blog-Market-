const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Post = require('../models/post')
const Comment = require('../models/comment')
const verifyToken = require('../verifyToken')


// UPDATE

router.put('/:id',verifyToken,async (req,res)=>{
    try{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)

        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

// DELETE

router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId: req.params.id})
        await Comment.deleteMany({userId: req.params.id})
        res.clearCookie("token",{sameSite: "none",secure:true}).status(200).json({message : "User removed successfully"})


    }catch(err){
        res.status(500).json({message : err})
    }
})

// GET USER

router.get('/:id',async(req,res)=>{
    try{
        const existUser = await User.findById(req.params.id)
        const {password,...userInfo} = existUser._doc
        res.status(200).json({message : "User valid",user : userInfo})
    
    }catch(err){
        res.status(500).json({message: err})
    }
})


module.exports = router