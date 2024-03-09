import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { isAuthed } from "./auths.js";
import { userRouter } from "./routes/user/user.js";
import { blogRouter } from "./routes/blog/blog.js";
import multer from "multer";
import { Blog } from "./models/Blog.js";




dotenv.config()

const app = express();

const {PORT}=process.env
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI.toString(), )
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  })




app.use(cors())
app.use(express.json())


const storage = multer.diskStorage({
  destination:function(req, file,cb){
      cb(null,'public/uploads')
  },
  filename:function(req,file,cb){
      cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
  }
})

const upload=multer({storage})


//routers 
app.use('/user',userRouter)
app.use('/blogs',isAuthed,blogRouter)
app.post('blog/add',isAuthed,upload.single('image'), async(req,res)=>{
  try {
      //date for the blog post
      const postDate = new Date().toLocaleString();
      const imagePath=req.file.path
      //use the user Id from the auth token
      
      const userId =req.user._id

      const blog= new Blog({
          ...req.body,date:postDate,user:userId,
          image:imagePath
      })
      await blog.save();

      res.status(201).send(' blog added Successfully')
  } catch (error) {
      console.error(error)
      res.status(500).send('internal error creating on upload')
  }
})




app.listen(PORT,()=>console.log(`listening on ${PORT}`))