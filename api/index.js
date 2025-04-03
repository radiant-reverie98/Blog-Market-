const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
// Landing Page
app.get('/',(req,res)=>{
    res.send("Welcome")
})

// Database Connection
const connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected to database successfully')
    }catch(err){
        console.error(err)
    }
}
// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials:true,
}))
dotenv.config()
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)
app.use("/images", express.static(path.join(__dirname,"/images")));
 
// Image Upload

const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images/")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.image)
        // fn(null,"image.jpeg")

    }
})

const upload = multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json({message:"Image has been uploaded successfully"})
})

app.listen(process.env.PORT,()=>{
    connection()
    console.log(`App is running`)
})