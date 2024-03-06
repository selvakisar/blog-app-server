import express from 'express';
import bcrypt from 'bcrypt';
import { User, generateToken } from '../../models/user.js';


const router=express.Router();

// signup

router.post('/signup',async (req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).send({error:"user already exists"});
        }

        //hashing password  for encrypt

        const salt=await bcrypt.genSalt(12);
        const hashedPassword=await bcrypt.hash(req.body.password,salt)

        //user added to database

        user = await new User({...req.body,password:hashedPassword}).save();

        //token generate

        const token = await generateToken(user._id);
        res.status(200).send({message:"successfully created ",token})
    } catch (error) {
        console.log(error)
        res.status(404).send({error: "internal server error"})
    }
})



router.post('/login',async (req,res)=>{
    try {
        //user find
        const user=await User.findOne({email:req.body.email});

        if(!user){
           return res.status(400).send({error: "user not found"})
        }

        const validatePassword = await bcrypt.compare(
            req.body.password,user.password
        )

        if(!validatePassword){
            return res.status(400).send({error: "invalid credentials"})
        }

        //generatea token 

        const token = generateToken(user._id);
        res.status(200).send({message:"Success",token:token})


    } catch (error) {
        console.log(error)
        res.status(404).send({error:"internal server error"})    
    }
})




export const userRouter =router;

