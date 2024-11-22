"use client"
import { sendEmail } from '@/redux/userSlice'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

function SendEmailForm() {
    const init= {
        firstName:"",
        lastName:"",
        email:"",
        message:""
    }
    const theme= useSelector((state)=>state.getTheme.theme)
    const [formData,setFormData]=useState(init)
    const responseMessage= useSelector((state)=>state.userData.emailData.response)
    const status= useSelector((state)=>state.userData.emailData.state)
    const dispatch= useDispatch()
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
    }))
    }

    const handleSendEmail=()=>{
        if(formData.firstName.length==0 ||formData.lastName.length==0 || formData.email.length==0 ||formData.message.length==0){
            toast.error("fill the fields first")
            return
        }
        dispatch(sendEmail(formData))
    }

    useEffect(()=>{
        if(status=="pending"){
            toast.loading("sending..")
        }
        else if(status=="failed"){
            toast.error(responseMessage)
        }
        else if(status=="success"){
            toast.success(responseMessage)
        }
    },[responseMessage,status])


  return (
    <div className='w-full'>
     {/* <h1 className='md:text-3xl text-xl'> Send the email via gmail</h1> */}
        <input type="text" name='firstName' value={formData.firstName} onChange={handleChange} placeholder='firstname'  className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"} p-1 md:p-3 my-2  md:h-16 h-10 w-[40%] me-4 border border-gray-300 dark:border-gray-700 rounded-lg`} />
        <input type="text" name='lastName' value={formData.lastName} onChange={handleChange} placeholder='lastname' className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"} p-1 md:p-3 my-2 md:h-16 h-10 border w-[50%] border-gray-300 dark:border-gray-700 rounded-lg`}  />
        <br />
        <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='email' className={`${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"} my-2 p-1 md:p-3 md:h-16 h-10 border w-full border-gray-300 dark:border-gray-700 rounded-lg`}  />
        <br />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder='enter your message' rows={6} id="" className={`border ${theme=="dark"?"text-white bg-[#14141466]" : "bg-transparent text-black"} my-2 w-[100%] border-slate-500 rounded-lg  p-1 md:p-3 md:text-xl`}></textarea>
        <button className='text-white md:my-1 my-1 bg-[#31313166] py-2 px-3 rounded-lg  border border-black hover:border-white' onClick={handleSendEmail}>Send Email</button>
    </div>
  )
}

export default SendEmailForm


//pagination
//emailing
//using map 
