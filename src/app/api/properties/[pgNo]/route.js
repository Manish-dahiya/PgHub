import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model"
import { NextResponse } from "next/server";


export async function GET(req, {params}){
    await connectToDatabase();
    const pgNo = parseInt(params.pgNo, 10); // No need to await params.pgNo
    console.log("%%%%% pg number is :",pgNo-1)
    try {
        const allprops= await properties.find().skip((pgNo-1)*10).limit(10);;
        return NextResponse.json({response:allprops,success:true});
    } catch (error) {
        return NextResponse.json({response:"some internal error  error occured",success:false})
    }
}