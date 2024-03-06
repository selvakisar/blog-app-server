import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { isAuthed } from "./auths.js";
import { userRouter } from "./routes/user/user.js";
import { blogRouter } from "./routes/blog/blog.js";


const app = express();


dotenv.config()
const {URL,PORT}=process.env


mongoose.connect(URL)
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log(err,"error connecting"))



app.use(
    cors({
        orgin:"http://localhost:3000",
        methods:"GET,POST,PUT,DELETE",
        credentials:true
    })
)
app.use(express.json())



//routers 
app.use('/user',userRouter)
app.use('/blogs',isAuthed,blogRouter)

const port = process.env.PORT||8000

app.listen(port,()=>console.log(`listening on ${port}`))