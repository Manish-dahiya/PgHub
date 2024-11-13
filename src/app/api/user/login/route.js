import connectToDatabase from "@/lib/dbConnect"
import users from "@/models/user.model"
import { NextResponse } from "next/server"

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const path=require("path")
const privatekey=process.env.JWT_SECRET// used to encode the cookie data


export async function POST(req){
   
    const {username,password}=await req.json()
    await connectToDatabase();
    console.log(username,password)
        const user=await users.findOne({username:username})
        if(!user){
            return NextResponse.json({response:"user does not exist"},{status:200})
        }
        //comparing the password 
        const checkpassword=await bcrypt.compare(password,user.password)
        if(!checkpassword){
            return NextResponse.json({response:"password is incorrect"},{status:200})
        }
        const data={
            _id:user._id,
            name:user.username,
            email:user.email
        }
        const token=jwt.sign(data,privatekey)
       return NextResponse.json({response:token},{status:201});
}