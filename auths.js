import jwt from "jsonwebtoken";

import { User } from "./models/user.js";

export const isAuthed = async(req,res,next)=>{
    let token ;

    if(req.headers){
        try{
            token = await req.headers["x-auth-token"];
            const decode = jwt.verify(token,process.env.SECRET_KEY);
            console.log(decode)
            req.user=await User.findById(decode.id).select("-password")
            next()
        }
        catch(error){
            console.log(error)
            res.status(400).send({error:"invalid authentication "})
        }
    }
    if(!token){
        return res.status(400).send({message:"access denied"})
    }
}