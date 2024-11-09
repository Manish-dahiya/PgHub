import Image from 'next/image'
import React from 'react'

function PropertyCard({theme,name,desc,price,coverImg}) {
  return (
    <div className='md:h-[500px] h-[400px] w-auto md:m-4 hover:scale-105 transition-transform border border-slate-500 rounded-lg p-7 flex flex-col justify-center items-center'>
        <Image src={coverImg} alt='image' width={400}/>
        <h1>{name}</h1>
        <p>{desc}</p>
        <div className='flex '>
            <p>{price}</p>
            <button className='rounded-lg bg-[#703bf7] py-2 px-3 ' >view Details</button>
        </div>
    </div>
  )
}

export default PropertyCard
