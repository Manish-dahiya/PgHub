"use client"
import LeafletMap from '@/components/LeafletMap'
import Navbar from '@/components/Navbar'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import { getPropertiesByPagination } from '@/redux/propertySlice'
import PropertyCard from '@/components/PropertyCard'
import SkeletonLoader from '@/components/SkeletonLoader'
import Footer from '@/components/Footer'
import Link from 'next/link'
import backgroundPattern from "../../../public/backgroundPattern.png"
import Image from 'next/image'
import clientIcon from "../../../public/clientIcon.png"
import noData from "../../../public/noData.avif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
function page() {
    const init={
        propertyName:"",
        furnishedType:"",
        bedrooms:"",
        propertyRent:"",
        propertyType:""

    }
    const [searchFields,setSearchFields]=useState(init)
    const theme = useSelector((state) => state.getTheme.theme)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const currentPageProperties = useSelector((state) => state.propertyData.propertyInfo.data)
    const totalPropCount = useSelector((state) => state.propertyData.propertyInfo.totalCount)
    const status = useSelector((state) => state.propertyData.propertyInfo.status)
    const errorMessage = useSelector((state) => state.propertyData.propertyInfo.error)
    const [markers, setMarkers] =useState([  { latitude: 30.7848005, longitude: 76.923568 }, { latitude: 51.515, longitude: -0.1 }])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    
    // const [markers,setMarkers]=useState(
    //     [  { latitude: 30.7848005, longitude: 76.923568 }, { latitude: 51.515, longitude: -0.1 }]
    // )
    useEffect(()=>{
        setMarkers(()=>(
             currentPageProperties?.map((item,index)=>(
                { latitude:item.location.latitude , longitude:item.location.longitude}
            )) ||[{ latitude: 30.7848005, longitude: 76.923568 }, { latitude: 51.515, longitude: -0.1 }]
        )
        )
    },[currentPageProperties])

    // Handle the location selection and simulate storing it in the state
    const handleLocationSelected = (location) => {
        setSelectedLocation(location);
        console.log('Location Selected:', location);

        // Example: You can send this data to a backend API to store the location
        // fetch('/api/save-location', {
        //   method: 'POST',
        //   body: JSON.stringify(location),
        //   headers: { 'Content-Type': 'application/json' },
        // });
    };

    //<------------swiper pagination---------------------->
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    const handleSlideChange = (swiper) => {
        const newPage = swiper.activeIndex+1 ; // Swiper page starts from 0
        dispatch(getPropertiesByPagination({pgNo:swiper.activeIndex+1,filters:searchFields})) 
    }; 

    useEffect(() => {
        if (status == "pending") {
            setLoading(true);
        }
        else {
            setLoading(false)
        }
    }, [status, errorMessage])

    useEffect(() => {
        dispatch(getPropertiesByPagination({
            pgNo: 1, 
            filters: searchFields
          }));  
    }, [])

    const handleSearchFieldsChange=(e)=>{
        const {name,value}=e.target
        setSearchFields((prev)=>({
            ...prev,
            [name]:value
        })) 
    }



    return (
        <div className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}>
            <Navbar theme={theme} />
            <div className='md:px-20 p-7 mt-24'>
                <h1 className='text-xl md:2xl'>Find you dream Pg here </h1>
                <p className='text-[#787a7e]'>Welcome to PgHub where your dream pg awaits in every corner of our beautiful world.Explore our currated selection of pg's Each
                    offering a unique stay and chance to rediefine you journey.
                </p>
            </div>
            {/* search bar */}
            <div className='flex md:gap-4 md:mx-20 m-7'>
                <input type="text" placeholder='search'  name='propertyName' value={searchFields.propertyName} onChange={handleSearchFieldsChange}  className='border  bg-transparent w-[100%] border-slate-500 rounded-lg h-10 md:h-16 p-1 md:p-3 md:text-xl' />
                <button className='border rounded-lg border-[#787a7e] px-4 py-1' onClick={()=>dispatch(getPropertiesByPagination({pgNo:1,filters:searchFields}))} >search</button>
            </div>
            
            {/* categories for filtering */}
            <div className='flex flex-wrap w-[100%] justify-center items-center md:gap-10 gap-2'>
                <select name="propertyType" value={searchFields.propertyType} onChange={handleSearchFieldsChange} id="" className={`${theme == "dark" ? "text-white bg-[#14141466]" : "bg-transparent text-black"} w-[240px] text-center   md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
                    <option value="" hidden>Property-Type</option>
                    <option value="commercial">commercial</option>
                    <option value="residential">residential</option>
                </select>
                <select name="propertyRent" value={searchFields.propertyRent} id="" onChange={handleSearchFieldsChange} className={`${theme == "dark" ? "text-white bg-[#14141466]" : "bg-transparent text-black"} w-[240px] text-center    md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
                    <option value="" hidden>Prices-Range</option>
                    <option value="2000">less than $2000</option>
                    <option value="4000">less than $4000</option>
                    <option value="6000">less than $6000</option>
                    <option value="more">more than $6000</option>
                </select>
                <select name="furnishedType" value={searchFields.furnishedType} onChange={handleSearchFieldsChange} id="" className={`${theme == "dark" ? "text-white bg-[#14141466]" : "bg-transparent text-black"} w-[240px] text-center    md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
                    <option value="" hidden >Furnished-Type</option>
                    <option value="fullFurnished">furnished</option>
                    <option value="halfFurnished">half-furnished</option>
                    <option value="unFurnished">unfurnished</option>
                </select>
                <select name="bedrooms" value={searchFields.bedrooms} onChange={handleSearchFieldsChange} id="" className={`${theme == "dark" ? "text-white bg-[#14141466]" : "bg-transparent text-black"} w-[240px] text-center    md:h-16 h-10 border border-gray-300 dark:border-gray-700 rounded-lg`}>
                    <option value="" hidden>Bedrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <div>
                    <button className='border rounded-lg border-[#787a7e] px-4 py-3' onClick={()=> setSearchFields(init)}>Reset</button>
                </div>
            </div>
            {/* map div  */}
            <div id='map' className='md:mx-20 mx-7 flex flex-col mb-2 justify-center items-center'>
                <h1>select location</h1>
                <LeafletMap onLocationSelected={handleLocationSelected} markers={markers} properties={currentPageProperties} />
            </div>

            {/* properties div*/}
            <div className='md:mx-20 mx-7 my-7'>
                <div>
                    <h1 className='text-xl md:text-2xl '>Here Are Your Dream Pg's</h1>
                    <p className='text-[#787a7e]'>Hi,Here are our all listings </p>
                </div>
                {/* properties div */}
                <div >
                  { totalPropCount>0 ? <Swiper
                        pagination={pagination}
                        modules={[Pagination]}
                        className="mySwiper h-[1200px]"
                        onSlideChange={handleSlideChange} // Attach the slide change handler
                    >
                       
                        {
                            Array(Math.ceil(totalPropCount/10)).fill().map((item, index) => (
                                <SwiperSlide key={index}>
                                    {
                                        loading ?
                                            <div  className='grid md:grid-cols-4 gap-3 md:grid-rows-auto w-[100%]'>
                                                {
                                                    [1,2,3,4,5,6,7,8,9].map((item,index)=>(
                                                        <SkeletonLoader key={index} />
                                                    ))
                                                }
                                            </div>
                                            : <div className='grid md:grid-cols-4 gap-2 md:grid-rows-auto w-[100%]'>
                                                {
                                                    currentPageProperties?.map((item, index) => (
                                                        <div key={index} >
                                                            <PropertyCard name={item.propertyName} theme={theme} coverImg={item.images[0].url} desc={item.propertyDesc} type={item.propertyType} bedrooms={item.bedrooms} furnishedType={item.furnishedType} bathrooms={item.bathrooms} price={item.propertyRent} />
                                                        </div>
                                                    ))}
                                            </div>
                                    }
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>  :

                        <div className='text-6xl text-slate-800  h-[900px] flex gap-10  justify-center items-center'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <h1>Ooooooopsssss!!!        No Data found</h1>
                        
                        </div>
                        
                    }
                </div>

            </div>

            <div className="px-2 md:px-32 border-b-4 my-3 md:py-10 relative  border-[#141414] " style={{backgroundImage:`url(${backgroundPattern})` , backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Image src={backgroundPattern} alt="hii" className="opacity-20 absolute top-0 left-0 w-full h-full object-cover"></Image>
                <div className="text-center" >
                  
                  <h1  className="md:text-3xl my-3">Start Your pg finding journey Today</h1>
                  <p className="text-gray-500">Start your PG-finding journey today with PGHub! Discover a seamless and convenient way to search for your ideal paying guest accommodation. At PGHub, we understand the importance of finding a comfortable and affordable space that feels like home. Whether you’re a student, a professional, or anyone in need of a place to stay, our platform offers a wide range of options tailored to your preferences and budget. Say goodbye to the hassle of endless searches and let PGHub guide you to the perfect spot. Begin your journey with us today and find your next home with ease and confidence!</p>
                  <div className="m-20"><Link href={"/properties"} className="rounded-lg px-3 py-3 pbutton ">Explore properties</Link></div>
                </div>
          </div>
            <Footer />

        </div>
    )
}

export default page
