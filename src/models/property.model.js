const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
    },
    propertyDesc: {
        type: String
    },
    propertyRent: {
        type: String
    },
    propertyType: {
        type: String
    },
    bedrooms: {
        type: String
    },
    bathrooms: {
        type: String
    },
    furnishedType: {
        type: String
    },
    kitchen: {
        type: Boolean
    },
    hall: {
        type: Boolean
    },
    balcony: {
        type: Boolean
    },
    parking: {
        type: Boolean
    },
    laundry: {
        type: Boolean // fixed the typo from "laundary" to "laundry"
    },
    extraRequirements: {
        type: String
    },
    images: {
        type: [
           {url:String, publicId:String}
        ] // specifying an array of strings for image URLs
    },
    location: {
        type: Object
    },
    feedback: {
        type: [String] // assuming feedbacks are strings, or replace with a different schema if needed
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // assuming you are referencing the User model
    },
    status: {
        type: String
    }
});

const properties= mongoose.models.properties ||   mongoose.model("properties",propertySchema)
module.exports= properties


