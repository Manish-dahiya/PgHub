"use client"
import Navbar from '@/components/Navbar'
import { getPropertiesByPagination } from '@/redux/propertySlice'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import Image from 'next/image'


function Page() {

    const dispatch = useDispatch()
    const theme = useSelector((state) => state.getTheme.theme)
    const currentProperty = useSelector((state) => state.propertyData.propertyInfo.data)
    const params = useParams(); // Use the Next.js hook to fetch params
    const { id } = params
    const init = {
        propertyName: "",
        furnishedType: "",
        bedrooms: "",
        propertyRent: "",
        propertyType: "",
        id: id
    }

    useEffect(() => {
        dispatch(getPropertiesByPagination({ pgNo: 1, filters: init }))
    }, [])
    useEffect(() => {
        console.log(currentProperty)
    }, [currentProperty])

    return (
        <div className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"} overflow-x-hidden`}>
            <Navbar theme={theme} />

            <div className='md:px-20 p-7 mt-24'>
                <div>
                    prop price
                </div>

                <div >
                    <Swiper
                        slidesPerView={2}
                        centeredSlides={true}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        
                        
                    >
                        {
                            currentProperty && currentProperty[0]?.images?.map((img, index) => (
                                <SwiperSlide key={index} className='' >
                                    <Image src={img.url} width={1000} height={600} alt="propertyImg" className='w-[100%] h-[100%] object-fit' />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>




            </div>
        </div>
    )
}

export default Page
