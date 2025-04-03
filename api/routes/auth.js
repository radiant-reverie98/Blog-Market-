const express = require('express')
const router = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


// REGISTER

router.post('/register',async (req,res)=>{
    try{
        const {username,email,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hashSync(password,salt)
        const newUser = new User({username,email,password:hashPassword})
        const saveUser = await newUser.save()
        res.status(201).json({message : "User created successfully",user: saveUser})
    }catch(err){
        res.status(500).json(err)
    }
})


// LOGIN
router.post('/login',async (req,res)=>{
    try{
        
        const isUser = await User.findOne({email: req.body.email})
        if(!isUser){
            return res.status(404).json({message:"User does not exist"})

        }
        const matchPassword = await bcrypt.compare(req.body.password,isUser.password)
        if(!matchPassword){
            return res.status(403).json({message : "Invalid credentials"})
        }
        const token = jwt.sign({_id:isUser._id,username : isUser.username,email:isUser.email},process.env.SECRET,{})
        const {password,...info} = isUser._doc
        res.cookie("token",token).status(200).json({message:"Logged in successfully",user:info})


    }catch(err){
        res.status(500).json(err)
    }
})

// Middleware
dotenv.config()

//LOGOUT
router.get('/logout',(req,res)=>{
    try{
        res.clearCookie("token",{sameSite: "none",secure:true}).status(200).json({message : "Loggedout Succesfully"})
    }catch(err){
        res.status(500).json(err)
    }
})

//Reftch user

router.get('/refetch',(req,res)=>{
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router



