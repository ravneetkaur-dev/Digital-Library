const mongoose=require('mongoose')
const express=require('express')
const {faculty}=require('../models/index')
const login=async(req,res)=>{
    const {email,password}=req.body;
    const data=await faculty.findOne({email,password})
     if (data) {
        // 2️⃣ Compare entered password with hashed password using bcrypt
        const isMatch = await bcrypt.compare(password, data.password);

        if (isMatch) {
            res.send("successful");
        } else {
            res.send("Incorrect password"); //forget password
        }
    } else {
        res.send("faculty not exist");
    }
}
module.exports=login;