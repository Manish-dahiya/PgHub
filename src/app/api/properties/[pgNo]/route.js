import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model"
import { NextResponse } from "next/server";
import users from "@/models/user.model";

export async function GET(req,context){
     // Wait for params to be available
     const params = await context.params;
  let pgNo = params.pgNo;
        
     // Connect to database first
     await connectToDatabase();
     
     // Parse page number after ensuring params is available
      pgNo = parseInt(pgNo, 10);
  const filters = Object.fromEntries(req.nextUrl.searchParams); // Get all query params as an object


      // Initialize query object
      const query = {};
  
      // Add conditions based on filters
      if (filters.propertyName) {
        query.propertyName = toLowerCase(filters.propertyName);
      }
      if (filters.propertyType) {
        query.propertyType = filters.propertyType;
      }
      if (filters.propertyRent) {
        query.propertyRent = { $lte: Number(filters.propertyRent) }; // Ensure the rent is less than or equal to the filter value
      }
      if (filters.furnishedType) {
        query.furnishedType = toLowerCase(filters.furnishedType);
      }
      if (filters.bedrooms) {
        query.bedrooms = Number(filters.bedrooms);
      }
      if (filters.id) {
        query._id =  filters.id;
      }
    
      // Additional filters can be added similarly, for example:
      // if (filters.location) { query.location = filters.location; }
  
      // Pagination (calculate skip and limit)
      const pageSize = query._id?0:10; // Number of results per page
      const pageNumber = parseInt(pgNo, 10) || 1; // Default to 1 if no page number is provided
      const skip = (pageNumber - 1) * pageSize;
  
      // Fetch properties from the database with filtering and pagination
      const Fetchedproperties = await properties.find(query).populate("owner")  //query == {propertyType:"residentail",propertyRent:"200",furnishedType:"fullyfurnsied"}
        .skip(skip)
        .limit(pageSize);
  
      const totalCount = await properties.countDocuments(query);

      return NextResponse.json({response:Fetchedproperties,totalCount:totalCount,success:true});
}