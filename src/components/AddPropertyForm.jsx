"use client"
import { decodeToken } from '@/helper/helper'
import { addNewProperty } from '@/redux/propertySlice'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

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


function AddPropertyForm({selectedLocation}) {
    const theme= useSelector((state)=>state.getTheme.theme)
    const userInfo= useSelector((state)=>state.userData.user.data)
    const status=useSelector((state)=>state.propertyData.propertyInfo.status)
    const errorMessage=useSelector((state)=>state.propertyData.propertyInfo.error)
    const init={
        propertyName:"",
        propertyDesc:"",
        propertyRent:"",
        propertyType:"",
        bedrooms:"",
        bathrooms:"",
        furnishedType:"",
        kitchen:false,
        hall:false,
        balcony:false,
        parking:false,
        laundary:false,
        extraRequirements:"",
        // images:[],
        location:{},
        feedback:[],//<------
        owner:"", //<--------------------------------
        status:"listed",
        previousUser:[]//<-------
    }
    const [formData,setFormData]=useState(init);
    const [propertyImages,setPropertyImages]=useState(null);
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        const {name,value}= e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const handleImages=(e)=>{
        //taking multiples files as input
         // 1.Use Array.from to convert FileList to an array and set it as state
         //2. you have to use multiple attribute in input tag
    setPropertyImages(Array.from(e.target.files));
    }
    useEffect(()=>{
            if(userInfo){
              setFormData((prev)=>({
                ...prev,
                "owner":userInfo._id
              }))
            }
    },[userInfo])

    useEffect(()=>{
        if (status === "pending") {
            toast.loading("listing...");
        } else if (status === "success" ) {
            toast.dismiss();
            
            toast.success("Property listed successfully");
          
        } else if (status === "failed" ) {
          toast.dismiss();
          toast.error(errorMessage);
      }
        else if (status === "rejected" && errorMessage) {
            toast.dismiss();
            toast.error(errorMessage);
        }
    },[errorMessage,status])

    
    const handlePropertyListing=()=>{
        if( formData.propertyName=="" ||
            formData.propertyDesc=="" ||
            formData.propertyRent=="" ||
            formData.propertyType=="" ||
            formData.bedrooms=="" ||
            formData.bathrooms=="" ||
            formData.furnishedType=="" 
        )
        {
            toast.error("fill the fields first");
            return;
        }
        else if( selectedLocation==null){
            toast.error("Please select property location");
            return;
        }
        else if(propertyImages==null){
            toast.error("Please select some property images");
            return;
        }

        const data= new FormData()
        data.append("propertyName",formData.propertyName);
        data.append("propertyDesc",formData.propertyDesc);
        data.append("propertyRent",formData.propertyRent);
        data.append("propertyType",formData.propertyType)
        data.append("bedrooms",formData.bedrooms)
        data.append("bathrooms",formData.bathrooms)
        data.append("furnishedType",formData.furnishedType)
        data.append("kitchen",formData.kitchen)
        data.append("hall",formData.hall)
        data.append("balcony",formData.balcony)
        data.append("parking",formData.parking)
        data.append("laundary",formData.laundary)
        data.append("extraRequirements",formData.extraRequirements)
        data.append("status",formData.status)
        data.append("owner",formData.owner)
        //----location
        data.append("latitude",selectedLocation.latitude)
        data.append("longitude",selectedLocation.longitude)
       
        //images
        propertyImages.forEach((file) => {
            data.append("images", file); // 'images' key must match the key used in backend
          });
        
        dispatch(addNewProperty(data))
    }

 
  return (
    <div className='w-full px-7 md:w-[50%] pb-10 pt-7 md:pt-0 '>
        <input type="text" name='propertyName' value={formData.propertyName} onChange={handleChange} placeholder='name' className='border bg-transparent w-[100%] border-slate-500 rounded-lg h-10 md:h-16 p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;
        <textarea type="text" name='propertyDesc' value={formData.propertyDesc} onChange={handleChange} rows={10} placeholder='description' className='border bg-transparent w-[100%] border-slate-500 rounded-lg  p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="text" name='propertyRent' value={formData.propertyRent} onChange={handleChange} placeholder='$ Rent' className='border bg-transparent w-[100%] border-slate-500 rounded-lg h-10 md:h-16 p-1 md:p-3 md:text-xl'/>&nbsp;&nbsp;&nbsp;&nbsp;
       
        <div className='flex flex-wrap gap-3'>
        <select name="propertyType" id="" value={formData.propertyType} onChange={handleChange}  className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>Property type</option>
            <option value="commercial" className=''>Commercial</option>
            <option value="residential">Residential</option>
        </select>
        <select name="bedrooms" id=""  value={formData.bedrooms} onChange={handleChange}   className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>No of bedrooms </option>
            <option value="1">1 bedroom</option> 
            <option value="2">3 bedroom</option> 
            <option value="3">2 bedroom</option> 
        </select>
        <select name="furnishedType" id=""  value={formData.furnishedType} onChange={handleChange}    className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>furnished Type </option>
            <option value="fullFurnished">full furnised</option> 
            <option value="halfFurnished">half furnished</option> 
            <option value="unFurnished">unfurnished</option> 
        </select>
        <select name="bathrooms" id="" value={formData.bathrooms} onChange={handleChange}   className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"}  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
            <option value="" hidden>Number of Bathrooms </option>
            <option value="1">1 </option> 
            <option value="2">2 </option> 
            <option value="3">3</option> 
        </select>

        <br />
        <div className='flex flex-row justify-center items-center gap-3 md:mt-2'>
        <input type="checkbox" value={formData.kitchen} onChange={handleChange} name="kitchen" id="kitchen" className='checkbox-custom ' />
        <label htmlFor="kitchen">Kitchen</label>
        </div>
        
        <div className='flex flex-row justify-center items-center gap-3 md:mt-2'>
        <input type="checkbox" name="hall" value={formData.hall} onChange={handleChange} id="hall" className='checkbox-custom ' />
        <label htmlFor="hall">Hall</label>
        </div>
           
        <div className='flex flex-row justify-center items-center gap-3 md:mt-2'>
        <input type="checkbox" name="balcony" value={formData.balcony} onChange={handleChange} id="balcony" className='checkbox-custom ' />
        <label htmlFor="balcony">Balcony</label>
        </div>
        <div className='flex flex-row justify-center items-center gap-3 md:mt-2'>
        <input type="checkbox" name="parking" value={formData.parking} onChange={handleChange} id="parking" className='checkbox-custom ' />
        <label htmlFor="parking">Parking</label>
        </div>
        <div className='flex flex-row justify-center items-center gap-3 md:mt-2'>
        <input type="checkbox" name="laundary" value={formData.laundary} onChange={handleChange} id="laundary" className='checkbox-custom ' />
        <label htmlFor="laundary">Laundry Facilities</label>
        </div>
        
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <textarea type="text" name='extraRequirements' value={formData.extraRequirements} onChange={handleChange} rows={6} placeholder='extra requirements' className='border bg-transparent w-[100%] border-slate-500 rounded-lg  p-1 md:p-3 md:text-xl'/> &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;
       <div className='md:mt-3 md:pt-3'>
          <p className='pb-1'>Add Images*</p>  <input type="file" multiple onChange={handleImages} className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"} `} />
        </div> 

        <br />
        <button className={`${theme=="dark"?"text-white bg-blue-500" : "bg-blue-500 text-black"} md:mt-10 py-2 px-4 rounded-lg `} onClick={handlePropertyListing} >List</button>

    </div>
  )
}

export default AddPropertyForm
