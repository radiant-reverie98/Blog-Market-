const express = require('express')
const router = express.Router()
const verifyToken = require('../verifyToken')
const Post = require('../models/post')
const Comment = require('../models/comment')


// CREATE

router.post('/create',verifyToken,async (req,res)=>{
    try{
        const newPost = new Post(req.body)
        const savePost = await newPost.save()
        res.status(200).json({message:"Post created successfully",post : savePost})
    }catch(err){
        res.status(500).json(err)
    }
})


// UPDATE

router.put('/:id', verifyToken, async (req, res) => {
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id }, // Make sure you're finding the post by _id
        { $set: req.body },      // Set the updated fields from the request body
        { new: true }            // Return the updated post
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (err) {
      console.error("Error updating post:", err);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  });

// DELETE

router.delete('/:id',verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId : req.params.id})
        
        res.status(200).json({message : "Post has been removed successfully"})

    }catch(err){
        res.status(500).json({message : err})
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById({_id:req.params.id})
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// GET POST 
router.get('/',async(req,res)=>{
    try{
        const query = req.query.search||""
        const searchFilter = {
            title:{$regex :query,$options : "i"}
        }
        const existPost = await Post.find(searchFilter)
        
        res.status(200).json({message : "Post details valid",user : existPost})
    
    }catch(err){
        res.status(500).json({message: err})
    }
})

// Getting Post details  PARTICULAR USER
router.get('/user/:id',async(req,res)=>{
    try{
        const existPost = await Post.find({userId:req.params.id})
        
        res.status(200).json({message : "Post details valid",user : existPost})
    
    }catch(err){
        res.status(500).json({message: err})
    }
})





module.exports = router