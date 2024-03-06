import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { isAuthed } from "./auths.js";
import { userRouter } from "./routes/user/user.js";
import { blogRouter } from "./routes/blog/blog.js";




dotenv.config()

const app = express();

const {PORT}=process.env
// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  })




app.use(cors())
app.use(express.json())



//routers 
app.use('/user',userRouter)
app.use('/blogs',isAuthed,blogRouter)



app.listen(PORT,()=>console.log(`listening on ${PORT}`))