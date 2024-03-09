import express from 'express';
import { Blog } from '../../models/Blog.js';
import multer from 'multer';
import  path from 'path'





const router =express.Router();


//all blogs 

router.get ('/all',async (req,res)=>{
    try {
        const blogs= await Blog.find();


        if(!blogs){
            return res.status(400).send({message:"no blogs found"})
        }
        res.status(200).send({message:"successfully found all data",data:blogs})


    } catch (error) {
        console.log(error);
        res.status(500).send({error:"internal error",})
    }
})



router.get('/user',async (req,res)=>{
    try {

        //  getting userId  from the authenticated user
        const userId = req.user._id;

        //query the blogs posted by the authenticated user

        const userBlogs = await Blog.find({user:userId});
        res.json(userBlogs)
        
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"internal error"});
    }
})




router.put('/edit/:id',async (req,res)=>{
    try {
        const updateBlog =await Blog.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true})

        if(!updateBlog){
            return res.status(400).send({error: 'Blog not found for edit'})

        }

        res.status(200).send({message: "successfully updated the Blog", data: updateBlog})
    } catch (error) {
        console.error(error)
        res.status(500).send({error: 'Internal error'})

    }
})


router.delete("/:id", async (req,res)=>{
    try
    {
        const deletedBlog = await Blog.findByIdAndDelete({ _id: req.params.id});
        if(!deletedBlog)
        {
            return res.status(400).send({ error: "Error Ocurred on delete"});
        }
        res.status(200).send({ message: "Successfully Deleted"});
    } 
    catch (error)
    {
        console.log(error);
        res.status(500).send({error: "Internal Server error"});
    }
});


 const blogRouter= router;

export {blogRouter}

