import connectToDatabase from "@/lib/dbConnect"
import users from "@/models/user.model"
import { NextResponse } from "next/server"

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const privatekey=process.env.JWT_SECRET// used to encode the cookie data
const joi= require("joi")

export async function POST(req){
    await connectToDatabase()
    const {username,email,password}=await req.json()

    //validations
    const userJoiSchema=joi.object({
        username:joi.string().min(3).max(25).alphanum().required(),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(10).alphanum(),
    })

    const check=userJoiSchema.validate({username,email,password})
    if (check.error) {
        const message = check.error.details[0].message
        console.log(message);
        return NextResponse.json({response:message},{status:200})
    }


    const userName=await users.findOne({username:username})
    const userEmail=await users.findOne({email:email})
    if(userName){
        return NextResponse.json({response:"username already exists"},{status:200})
    }
    if(userEmail){
        return NextResponse.json({response:"email already exists"},{status:200})
    }
    //to store the password in encrypted format

    const salt=await bcrypt.genSalt(10)
    const hashedpasword=await bcrypt.hash(password,salt)
    // const avatarFilename = req.file ? req.file.filename : "avatar.png"
    const userResult=await users.create({
        username:username,
        email:email,
        password:hashedpasword,
        // avatar:avatarFilename
    })

    console.log(userResult)
    const data={
        _id:userResult._id,
        name:userResult.username,
        email:userResult.email
    }
    const token=jwt.sign(data,privatekey)
    // res.cookie("token",token) //saving the username to the cookies
    return NextResponse.json({response:token},{status:201});
}