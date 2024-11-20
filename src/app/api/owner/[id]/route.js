import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";
import { NextResponse } from "next/server";

export async function GET(req,{params}){
    await connectToDatabase();
    const ownerId=await params.id
    console.log("ownerID is:",ownerId)
    try {
      const ownersAllProperties= await properties.find({owner: ownerId});
      // console.log(ownersAllProperties)
     return NextResponse.json({response:ownersAllProperties,success:true})
    } catch (error) {
      console.log(error)    
      return NextResponse.json({response:"some error occured",success:false})
    }
  }
  