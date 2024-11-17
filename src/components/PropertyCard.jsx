import { faBiking, faShower, faSquare, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

function PropertyCard({ theme, name, desc, price, coverImg, type, furnishedType, bedrooms, bathrooms, parking }) {
  return (
    <div className={`h-[400px] ${theme=="light" && "bg-[#cdbdeb]"}  w-auto md:mx-4  hover:scale-105 transition-transform border border-slate-500 rounded-lg px-3 pt-3 pb-4 flex flex-col`}>
      <Image src={coverImg} alt='image' width={400} height={500} className='rounded-lg' priority/>
      <h1 className='font-bold my-1'>{name}</h1>
      <p className='text-[#787a7e] mb-1'>    Enchanting three bedrooms, three bath home with spacious one
        bedroom, one bath...</p>
      {/* <p className='text-[#787a7e]'>propertyType: <span className='text-white'>{type}</span> </p>
        <p>furnishedType: {furnishedType}</p>
        <p>Bedrooms: {bedrooms}</p> */}
      <div className="advants grid grid-cols-3">
        <div>
          <span>Bedrooms</span>
          <div><i className="fas fa-th-large"></i><span> <FontAwesomeIcon icon={faSquare} />  {bedrooms}</span></div>
        </div>
        <div>
          <span>Bathrooms</span>
          <div><i className="fas fa-shower"></i><span> <FontAwesomeIcon icon={faShower} /> {bathrooms}</span></div>
        </div>
        <div>
          <span>Parking</span>
          <div>
            <i className="fas fa-vector-square"></i
            ><span>{parking ? <FontAwesomeIcon icon={faBiking} /> : <FontAwesomeIcon icon={faX} />}</span>
          </div>
        </div>
      </div>

      <div className="price flex justify-between items-center ">
        <div>
          <p>For Sale</p>
          <span className='text-2xl text-green-400'>${price}</span>
        </div>
        <p className='hover:text-blue-500 cursor-pointer'>View details</p>
      </div>


    </div>
  )
}

export default PropertyCard
