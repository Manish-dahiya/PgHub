"use client"
import Link from 'next/link'
import React from 'react'

function Sidebar({isSidebar,setIsSideBar,theme}) {
  return (
    <div className={`h-full w-40 ${theme=="dark"?"bg-[#262626]":"#FFFFFF"} p-2 rounded-s-lg fixed right-0 top-0`}>
        <div className='flex justify-between'>
            <h1>PgHub</h1>
            <button onClick={()=>setIsSideBar(false)}>X</button>
        </div>
        <div className='flex flex-col my-10'>
            <Link href={"/"}>Home</Link>
            <Link href={"/properties"}>Properties</Link>
            <Link href={"/aboutUs"}>About us</Link>
        </div>
    </div>
  )
}

export default Sidebar
