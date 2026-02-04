import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Function to upload directly from a stream to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "properties" }, // Specify folder
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
   
   stream.end(buffer)
  });
};

export async function POST(req) {
  await connectToDatabase()
  const body = await req.formData();
  // const propertyName = toLowerCase(body.get('propertyName'));
  const propertyName = body.get("propertyName")?.toLowerCase() || "";

  const propertyDesc = body.get('propertyDesc');
  const propertyRent = parseInt(body.get('propertyRent'));
  const propertyType = body.get('propertyType');
  const bedrooms = parseInt(body.get('bedrooms'));
  const bathrooms = parseInt(body.get('bathrooms'));
  // const furnishedType = toLowerCase(body.get('furnishedType'));
    const furnishedType = body.get("furnishedType")?.toLowerCase() || "";

  const kitchen = body.get('kitchen') === 'true'; // Convert string to boolean if necessary
  const hall = body.get('hall') === 'true';
  const balcony = body.get('balcony') === 'true';
  const parking = body.get('parking') === 'true';
  const laundary = body.get('laundary') === 'true';
  const extraRequirements = body.get('extraRequirements');
  const latitude = body.get('latitude'); // Parse if JSON object
  const longitude = body.get('longitude'); // Parse if JSON object
  const feedback = body.get('feedback'); // Parse if JSON array
  const owner = body.get('owner');
  const status = body.get('status');
  const images = body.getAll("images")

  try {
    
       const uploadPromises = images.map(async (image) => {
        const arrayBuffer = await image.arrayBuffer(); // Get ArrayBuffer
        const buffer = Buffer.from(arrayBuffer); // Convert to Buffer
        return uploadToCloudinary(buffer); // Upload buffer to Cloudinary
      });

    const uploadedImages = await Promise.all(uploadPromises);

    // Extract URLs
    const imagesForDB = uploadedImages.map((img) => {return  {url:img.secure_url,publicId:img.public_id} });
  

    const createdProperty = await properties.create({
      propertyName: propertyName,
      propertyDesc: propertyDesc,
      propertyRent: propertyRent,
      propertyType: propertyType,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      furnishedType: furnishedType,
      kitchen: kitchen,
      hall: hall,
      balcony: balcony,
      parking: parking,
      laundary: laundary,
      extraRequirements: extraRequirements,
      images: imagesForDB, //<---------------------------
      location: { latitude: latitude, longitude: longitude },
      feedback: null,//<------
      owner: owner, //<--------------------------------
      status: status,
    })

    console.log("property created@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:", createdProperty.propertyName)
    return NextResponse.json({ response: createdProperty, success: true });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ response: error, success: false });
  }
}


//1..ENV FILE
//2.FRONTEND SENT IMAGE
//3.BACKEND