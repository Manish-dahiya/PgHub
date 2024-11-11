"use client"
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import defaultUser from "../../../public/defaultUser.png"
import demoProperty from "../../../public/demoProperty.png"
import PropertyCard from '@/components/PropertyCard'
import LeafletMap from '@/components/LeafletMap'
import AddPropertyForm from '@/components/AddPropertyForm'

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
  
  ]

  
  const clients=[
    {
      id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"pending"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"success"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"success"
    },
    {
        id:1,
      name:"harivansh",
      property:"Awesome app",
      price:"$18484",
      status:"pending"
    }
  ]




function page() {
    const theme= useSelector((state)=>state.getTheme.theme)
    const [active,setActive]=useState(2) //default properties set

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [markers, setMarkers] = useState([
      { latitude:30.7848005, longitude:76.923568}, // Example marker 1
      { latitude: 51.515, longitude: -0.1 },  // Example marker 2
    ]);
  
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

  return (
    <div  className={`h-[100vh] w-[100vw] ${theme == "dark" ? "bg-[#060606] text-white" : "lightTheme"}   overflow-x-hidden`}>
      <Navbar theme={theme} />

        {/* owner profile section*/}
        <div className=' md:h-[40vh] flex justify-center items-center bg-red-400 '>
            <div className='text-center'>
                <Image src={defaultUser} alt="default user" className='rounded-full ' height={150} />
                <h1 className='md:text-2xl'>username</h1>
                <div className='bg-slate-900 py-1 px-3 rounded-lg'>
                    <button className=' hover:text-blue-400 '>Edit</button> &nbsp; &nbsp; 
                    <button className='hover:text-blue-400 '>Logout</button>
                </div>

            </div>
        </div>

        {/* navigation section between owner properties and client */}
        <div className='h-10 border-b border-[#14141466] flex justify-center md:gap-10 p-2'>
                <div className='flex flex-col w-20  items-center'>
                    <div className={` cursor-pointer `} onClick={()=>setActive(1)}>Properties</div>
                   {active==1 &&  <div className=' border-b-4 border-blue-400 w-28  rounded-lg'></div>}

                </div>
                <div className='flex flex-col w-20 items-center'>
                <div className={`cursor-pointer`} onClick={()=>setActive(2)}>Clients</div>

                {active==2 && <div className=' border-b-4 border-blue-400 w-28  rounded-lg'></div>}
                </div>
        </div>

        {/*properties of owner */ }
        {
            active==1 ?
            <div className='md:my-10 flex justify-center items-center '>
            <div className='w-[80vw] grid md:grid-cols-3 md:gap-1 grid-rows-auto  '>
            {
                 properties?.map((item,index)=>(
                     <PropertyCard key={index} name={item.name} coverImg={item.image[0]} desc={item.desc} price={item.price}/>
                 ))
             }
            </div>
         </div>
        :   //clients div
             <div className='flex items-center justify-center md:px-20 md:mt-10'>
                <table className='w-full text-center '>
                    <thead>
                        <tr className={`h-10 w-full border-b-4 ${theme=="dark"? " border-[#141414]" :"border-[#999696]"}`}>
                        <th>sno.</th>
                        <th>name</th>
                        <th>property</th>
                        <th>price</th>
                        <th>payment status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients?.map((item,index)=>(
                                <tr key={index} className={`h-10 w-full border-b-4 ${theme=="dark"? " border-[#141414]" :"border-[#999696]"} ${theme=="dark"?"text-[#999696]":"black"}`}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.property}</td>
                                    <td>{item.price}</td>
                                    <td className={`${item.status=="pending" ? "text-red-400" : "text-blue-700"}`}>{item.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
             </div>
        }
            <div className={` py-4 px-20 mt-24 border-b-2  ${theme=="dark"? " border-[#141414]" :"border-[#999696]"}`}/>

        {/*add property form */}
        <div className='md:mx-10 text-center'>
            <h1 className='md:text-3xl font-bold  md:my-10'>Add new Property </h1>
            <div className='flex flex-col md:flex-row md:gap-4'>
            <LeafletMap onLocationSelected={handleLocationSelected} markers={markers} />
            <AddPropertyForm/>
            </div>
        </div>

    </div>
  )
}

export default page
