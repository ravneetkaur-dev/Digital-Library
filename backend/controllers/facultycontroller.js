const mongoose=require('mongoose')
const express=require('express')
import bcrypt from 'bcryptjs';
const jwt=require('jsonwebtoken')
const dotenv = require('dotenv');
const {faculty}=require('../models/index')
const login=async(req,res)=>{
    const {email,password}=req.body;
    const data=await faculty.findOne({email})
     if (!data) {
        return res.status(404).send("Faculty not found");
     }
       const isMatch = await bcrypt.compare(password, data.password);
       if (!isMatch) {
        return res.status(401).send("Invalid credentials");
       }
        const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET
            , { expiresIn: '1d' });
       return res.status(200).json({message: "Login successful",token})
}

const logout=async(req,res)=>{
    try {
         res.send("Logged out successfully");
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).send("Internal server error");
    }
};
module.exports={login,logout};