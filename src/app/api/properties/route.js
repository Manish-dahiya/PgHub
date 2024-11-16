import connectToDatabase from "@/lib/dbConnect";

const properties = require("@/models/property.model");
const { NextResponse } = require("next/server");


export async function GET(req){
    await connectToDatabase()
    try {
        const allpropCount= await properties.countDocuments()
        return NextResponse.json({response:allpropCount,success:true})
    } catch (error) {
        return NextResponse.json({response:error.message,success:false})
    }
}