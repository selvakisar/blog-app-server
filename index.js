import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from "mongoose";
import { isAuthed } from "./auths.js";
import { userRouter } from "./routes/user/user.js";
import { blogRouter } from "./routes/blog/blog.js";


const app = express();


dotenv.config()

mongoose.connect(process.env.URI, {

  useNewUrlParser: "true",
  useUnifiedTopology: "true"

})
mongoose.connection.on("error", err => {

  console.log("err", err)

})
mongoose.connection.on("connected", (err, res) => {

  console.log("mongoose is connected")

})
// mongoose.connect(process.env.URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
// .then(()=>console.log("Connected to database"))
// .catch((err)=>console.log(err,"error connecting"))



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



app.listen(process.env.PORT,()=>console.log(`listening on ${process.env.PORT}`))