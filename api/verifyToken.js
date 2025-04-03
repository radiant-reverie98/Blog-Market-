const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const verifyToken= (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"You are not authenticated"})
    }
    jwt.verify(token,process.env.SECRET,{},async(err,data)=>{
        if(err){
            res.status(403).json({message:"Token not valid"})
        }
        req.userId = data._id
        next()
    })

}

dotenv.config()

module.exports = verifyToken

