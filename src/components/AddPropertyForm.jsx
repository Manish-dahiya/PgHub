"use client"
import React from 'react'
import { useSelector } from 'react-redux'

//{
    // name: String,
    // description: String,
    // location: String,
    // rent: Number,
    // extra require: [String], <--only married allowed
    // feedback: [
    //     {rating,userid,text}
    //     ]
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // createdAt: { type: Date, default: Date.now },
    // status:
    // images<----------------array required
    //previous users
//}


function AddPropertyForm() {
    const theme= useSelector((state)=>state.getTheme.theme)
  return (
    <div className='w-[50%]'>
        <input type="text" name='propertyName' placeholder='name' className='border bg-transparent w-[100%] border-red-500 rounded-lg h-10 md:h-16 p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;
        <textarea type="text" name='propertyDesc' rows={10} placeholder='description' className='border bg-transparent w-[100%] border-red-500 rounded-lg  p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name='propertyRent' placeholder='$ Rent' className='border bg-transparent w-[100%] border-red-500 rounded-lg h-10 md:h-16 p-1 md:p-3 md:text-xl'/>&nbsp;&nbsp;&nbsp;&nbsp;
       
        <div className='flex gap-3'>
        <select name="propertyType" id=""  className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>Property type</option>
            <option value="commercial" className=''>Commercial</option>
            <option value="residential">Residential</option>
        </select>
        <select name="bedrooms" id=""     className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>No of bedrooms </option>
            <option value="1">1 bedroom</option> 
            <option value="2">3 bedroom</option> 
            <option value="3">2 bedroom</option> 
        </select>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <textarea type="text" name='extraRequirements' rows={10} placeholder='extra requirements' className='border bg-transparent w-[100%] border-red-500 rounded-lg  p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;

    </div>
  )
}

export default AddPropertyForm
