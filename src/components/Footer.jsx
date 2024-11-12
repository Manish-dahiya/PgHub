import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer({theme}) {
  return (
    <div className='pt-10'>
      <div className='text-center'>PgHub</div>
    <div className=' md:my-1 px-10   grid  grid-cols-4 justify-center md:justify-end   md:items-center'>
      <div className=''>
            <h1 className='my-4 text-slate-500'>Home</h1>
            <p className='py-2'>Hero section</p>
            <p className='py-2'>Featured Properties</p>
            <p className='py-2'>FAQ's</p>
      </div>
      <div>
        <h1 className='text-slate-500 my-4'>About Us</h1>
        <p className='py-2'>Our Story</p>
        <p className='py-2'>Github</p>
        <p className='py-2'>Twiter</p>
        <p className='py-2'>Linkedin</p>
      </div>
      <div>
        <h1 className='text-slate-500 my-4'>Properties</h1>
        <p className='py-2'>Portfolio</p>
      </div>
      <div>
        <h1 className='text-slate-500 my-4'>Services</h1>
        <p className='py-2'>Pg's</p>
        <p className='py-2'> Pg Ratings</p>
        <p className='py-2'> Pg listings</p>
      </div>
      {/* <div className='text-slate-500 my-4'>first</div> */}

    </div>
    <div className={`h-10 ${theme=="dark"?"bg-[#14141466]":"bg-[#ebe7e7]"} flex justify-around py-7 `}>
        <div>
            <span>
                PgHub All right reserved &nbsp;&nbsp;&nbsp;&nbsp;
                Terms & conditions
            </span>
        </div>

        <div>
            <FontAwesomeIcon icon={faTwitter}/>
            <FontAwesomeIcon icon={faLinkedin}/>
            <FontAwesomeIcon icon={faGithub}/>
        </div>
    </div>
    </div>
  )
}

export default Footer
