import { faStarHalf, faStar as yellowStar}  from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar}  from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ReviewCard({item}) {
  return (
    <div className='border border-gray-500   rounded-lg flex flex-col w-[284px] md:w-auto md:gap-5 p-2 ps-5  justify-center items-start'
        
    >
        <div id='stars'>
            {
                [1,2,3,4,5].map((no,index)=>(
                    <span key={index}>
                    {(no <= Math.floor(item.rating)) ?<FontAwesomeIcon icon={yellowStar} className='text-yellow-300'/> :((no-item.rating)>=1)?<FontAwesomeIcon icon={emptyStar} />:<FontAwesomeIcon icon={faStarHalf}  className='text-yellow-300'/>}
                    </span>
                ))
            }
        </div>
        <div>
            <p>{item.text}</p>
        </div>
        <h1>{item.name}</h1>
    </div>
  )
}

export default ReviewCard