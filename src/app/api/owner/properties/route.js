import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";
import { NextResponse } from "next/server";



export async function POST(req) {
  await connectToDatabase()
  const body = await req.formData();
  const propertyName = body.get('propertyName');
  const propertyDesc = body.get('propertyDesc');
  const propertyRent = body.get('propertyRent');
  const propertyType = body.get('propertyType');
  const bedrooms = body.get('bedrooms');
  const bathrooms = body.get('bathrooms');
  const furnishedType = body.get('furnishedType');
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


  //map function was returning an array of promises,To handle all those promises ,you have used
  //Promise.all( [..arr of promises..])  :-->
  //THIS MAIN PROMISE WILL GET RESOLVED IF ALL PROMISES IN THE ARRAY ARE RESOLVED
  //OR REJECT IF ANY PROMISE IN THE ARRAY REJECTS

  //  By await on Promise.all, we pause execution until all the promises have completed.

  const imagesData = await Promise.all(
    images.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer(); // from File API
      const buffer = Buffer.from(arrayBuffer); // from Node.js

      return {
        name: file.name,
        data: buffer,
        contentType: file.type,
      };
    })
  );
  try {
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
      images: imagesData, //<---------------------------
      location: { latitude: latitude, longitude: longitude },
      feedback: null,//<------
      owner: owner, //<--------------------------------
      status: status,
    })

    console.log("property created:", createdProperty.propertyName)
    return NextResponse.json({ response: createdProperty, success: true });

  } catch (error) {
    console.log(error)
    return NextResponse.json({ response: error, success: false });
  }
}