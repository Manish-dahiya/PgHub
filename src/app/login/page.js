"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import aboutImage from "../../../public/aboutImage.png"
import toast from 'react-hot-toast';
function page() {
    const [isloggin,setIsLoggin]=useState(false);
    const init={
        username:"",
        email:"",
        password:"",
        contact:"",
        role:""
        
    }
    const [formData,setFormData]=useState(init)
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    // const notify=()=>toast('Hello Darkness!',
    //     {
    //       icon: '👏',
    //       style: {
    //         borderRadius: '10px',
    //         background: '#333',
    //         color: '#fff',
    //       },
    //     }
    //   );

  return (
    <div className='h-[100vh] w-full flex  justify-between text-white bg-[#141414]'>
        
        <div className='  rounded-lg  flex flex-col gap-7 justify-center items-center w-full md:w-[50%]'>
            {isloggin?<h1 className='text-2xl text-gray-300'>Login to your account</h1>:<h1 className='text-2xl text-gray-300'>Create a New Account</h1>}
            <div>
            <input type="text" name='username' placeholder='username'  className='text-center  text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg' />
            </div>
            {!isloggin &&<div> <input type="text" name='email' placeholder='email' className='text-center   text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg' /></div>
            }
           <div> <input type="password" name='password' placeholder='password'  className='text-center   text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  /></div>
           <div> <input type="text" name='contact' placeholder='contact:99999'  className='text-center   text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  /></div>
           {/* <div> 
            <label htmlFor="role">user </label>
            <input type="checkbox" name='user' id='role'    className='text-center   text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  />

            <input type="checkbox" name='owner' id='role'   className='text-center   text-white bg-[#14141466] px-2 w-96  md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg'  />
            
            </div> */}
           {
            isloggin?<button className='bg-blue-400 py-2 px-4 rounded-lg'>Login</button>
            :<button className='bg-blue-400 py-2 px-4 rounded-lg'>Sign up</button>
        }
        {
            isloggin?<span className='hover:text-blue-500 ' onClick={()=>setIsLoggin(!isloggin)}>Already have an Account?</span>: <span className='hover:text-blue-500 ' onClick={()=>setIsLoggin(!isloggin)}>Create a new Account ?</span>
        }
        </div>
       
        <div>

        <div id="right" className=" hidden md:block   w-full ">
          <Image src={aboutImage} alt="Image" className="h-[300px]   md:h-[600px]" />
        </div>
        </div>
    </div>
  )
}

export default page
