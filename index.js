import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { isAuthed } from "./auths.js";
import { userRouter } from "./routes/user/user.js";
import { blogRouter } from "./routes/blog/blog.js";
import { dbConnection } from "./db.js";




dotenv.config()

const app = express();
dbConnection()
const {PORT}=process.env





app.use(cors())
app.use(express.json())



//routers 
app.use('/user',userRouter)
app.use('/blogs',isAuthed,blogRouter)



app.listen(PORT,()=>console.log(`listening on ${PORT}`))