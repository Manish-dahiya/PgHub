import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";


export async function POST(req){
    await connectToDatabase()
    const body=  await req.formData();
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
const location = body.get('location'); // Parse if JSON object
const feedback =body.get('feedback'); // Parse if JSON array
const owner = body.get('owner');
const status = body.get('status');

// For images, if they're files uploaded in the form:
const images = body.getAll('images'); // retrieves files as an array of Blob objects

    try {
        const createdProperty= await properties.create({
        propertyName,
        propertyDesc,
        propertyRent,
        propertyType,
        bedrooms,
        bathrooms,
        furnishedType,
        kitchen,
        hall,
        balcony,
        parking,
        laundary,
        extraRequirements,
        // images:[],
        location,
        feedback,//<------
        owner, //<--------------------------------
        status,
        })

        console.log("createdProperty:",createdProperty)

    } catch (error) {
        console.log(error)
    }
}