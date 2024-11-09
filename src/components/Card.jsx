import Image from 'next/image'
import React from 'react'

function card({heading,img,text,theme,height,width}) {
  return (
    <div className={`rounded-lg ${theme=="dark"?"darkTheme":"lightTheme"}  border border-gray-500 h-[${height}] w-[${width}] hover:scale-110 transition-transform p-3  flex flex-col justify-center items-center`}>
    <h1 className='font-bold text-2xl'>{heading}</h1>
    {height!="100px" && <Image src={img} alt='image' />}
    <p className='text-gray-500'>{text}</p>
    
</div>
  )
}

export default card
