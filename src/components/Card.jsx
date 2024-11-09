import Image from 'next/image'
import React from 'react'

function card({heading,img,text,theme,height,width}) {
  return (
    <div className={`rounded-lg ${theme=="dark"?"darkTheme":"bg-[#ebe7e7]"}  border border-gray-500  hover:scale-110 transition-transform p-3  flex flex-col justify-center items-center`}
    style={{
      height: height || "auto",
      width: width || "auto",
    }}
    >
    <h1 className='font-bold text-2xl'>{heading}</h1>
    {img && <Image src={img} alt='image' />}
    <p className='text-gray-500'>{text}</p>
    
</div>
  )
}

export default card
