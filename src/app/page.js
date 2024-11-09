"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import home from "../../public/home.png";
import Card from "@/components/Card";
import homeIcon from "../../public/homeIcon.png"
import propertyIcon from "../../public/propertyIcon.png"
import PropertyCard from "@/components/PropertyCard";
import demoProperty from "../../public/demoProperty.png"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import stars from "../../public/stars.png"
const properties=[
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  },
  {
    id:1,
    image:[demoProperty],
    name:"luxiry palace pg's",
    desc:"this is a nice pg",
    price:'$8744'
  }
]



export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false); // Track if the component has mounted

  useEffect(() => {
    // Set mounted to true once the component is mounted
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    } else {
      setTheme("dark"); // Or any default theme you'd like
    }
  }, []);

  if (!mounted) {
    return null; // Render nothing until mounted (avoid SSR mismatch)
  }

  return (
    <div
      className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-black text-white" : "lightTheme"} overflow-x-hidden`}
    >
      <Navbar theme={theme} setTheme={setTheme} />
      {/* Top div */}
      <div className="flex md:flex-row justify-between md:mt-20 mt-10 h-[100%] w-[100%]">
        <div id="left" className="md:flex md:flex-col md:justify-center items-center p-14 w-[50%]">
          <h1 className="text-4xl font-bold">Discover Your Dream </h1>
          <h1 className="text-4xl font-bold mt-1">Pg with PgHub!</h1>

          <p className="my-7 text-gray-500 text-lg">
            Your journey to find the perfect pg begins here. Explore your listings to find the stay that matches your dream.
          </p>
          <button className="purple px-3 py-3 rounded-lg hover:scale-105 transition-transform ">Browse properties</button>
          {/* Cards */}
          <div className="mt-20 flex flex-wrap gap-4">
            <Card text={"Happy customers"} heading={"200+"} theme={theme} height={"100px"} width={"200px"}/>
            <Card text={"Properties for Client"} heading={"10k"} theme={theme} height={"100px"} width={"200px"}/>
            <Card text={"Years of Experience"} heading={"16+"} theme={theme} height={"100px"} width={"200px"}/>
          </div>
        </div>
        <div id="right" className="w-[50%]">
          <Image src={home} alt="Image" className="md:h-[600px]" />
        </div>
      </div>
      {/* big cards */}
      <div className="w-full  border-b-8 border-[#141414] h-[30%] flex gap-11 justify-center flex-wrap border-t-8 p-3">
      <Card text={"Happy customers"} heading={null} img={homeIcon} theme={theme} height={"300px"} width={"300px"}/>
            <Card text={"Find your Dream Pg"} heading={null} img={homeIcon} theme={theme} height={"300px"} width={"300px"}/>
            <Card text={"Effortlessly property Management"} heading={null} img={propertyIcon} theme={theme} height={"300px"} width={"300px"}/>
            <Card text={"Regular Notifications"} heading={null} theme={theme} img={propertyIcon} height={"300px"} width={"300px"}/>
      </div>

      {/* featured properties */}
      <div className="py-4 px-20 mt-20">
        <Image  src={stars} alt="featured stars" className="opacity-50" />
        <h1 className="font-bold text-4xl m-2">Featured Properties</h1>
        <div className=" md:flex md:justify-between ">
          <p className="text-gray-500">Explore our handpicked selection of featured properties.Each listings offeres a glimpse info exceptional pg's available throug PgHub.Click view details for more Info</p>
          <button className="bg-[#141414] border  py-1 px-2 rounded-lg border-slate-500">view All properties</button>
        </div>
        <div className="flex flex-wrap gap-6 ">
              <Swiper
               spaceBetween={20}
               slidesPerView={3}
               pagination={{ clickable: true }}

              >
              {
                properties?.map((item,index)=>(
                  <SwiperSlide key={index} >
                    <PropertyCard name={item.name} coverImg={item.image[0]} desc={item.desc} price={item.price}/>
                  </SwiperSlide>
                ))
              }
              </Swiper>
          </div>
      </div>
    </div>
  );
}
