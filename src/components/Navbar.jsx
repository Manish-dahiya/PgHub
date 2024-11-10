
"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { configTheme } from '@/helper/helper';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';
import { changeTheme } from '@/redux/themeSlice';
function Navbar({theme,setTheme}) {
    const dispatch= useDispatch()
    const [isSidebar,setIsSidebar]=useState(false)
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);  // Parse the saved theme
            dispatch(changeTheme(parsedTheme));  // Dispatch action to update Redux state
            configTheme(parsedTheme)
        } else {
            const defaultTheme = "dark";  // Default theme if not found in localStorage
            dispatch(changeTheme(defaultTheme));  // Dispatch default theme to Redux state
            configTheme(defaultTheme)
        }
    }, [theme]); 

    // Handle theme change
    const handleChangeTheme = (theme) => {
        // setTheme(theme);
        dispatch(changeTheme(theme))
        configTheme(theme); // Apply the new theme
    };

    return (
        <div className={`h-10 md:h-20  w-full fixed top-0 z-11 ${theme=="dark"?"darkTheme":"navbarlight"} p-3 flex justify-between items-center`}>
            <div>
                <h1 className='font-bold'>PgHub</h1>
            </div>
            {/* center div */}
            <div className='hidden md:flex gap-10'>
                <Link href={"/"}>Home</Link>
                <Link href={"/properties"}>Properties</Link>
                <Link href={"/about"}>About Us</Link>
            </div>
            <div className='hidden md:flex items-center gap-3'>
                <div className='text-sm'>
                    {/* Toggle theme icon */}
                    {theme === "dark" ? (
                        <FontAwesomeIcon icon={faSun} className='h-4 cursor-pointer' onClick={() => handleChangeTheme("light")} />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} className='h-4 cursor-pointer' onClick={() => handleChangeTheme("dark")} />
                    )}
                </div>
                <button>Contact Us</button>
            </div>
            {/* hamburger */}
            <div className='md:hidden'>
                <h1 className='font-bold cursor-pointer' onClick={()=>setIsSidebar(!isSidebar)}>&#9776;</h1>
            </div>
            
            {
                isSidebar && <Sidebar isSidebar={isSidebar} setIsSideBar={setIsSidebar} theme={theme}/>
            }

        </div>
    );
}

export default Navbar;
