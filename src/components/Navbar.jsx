
"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { changeTheme } from '@/helper/helper';
import Sidebar from './Sidebar';

function Navbar({theme,setTheme}) {
    // State to hold the current theme
    // const [toggleTheme, setToggleTheme] = useState("dark");
    const [isSidebar,setIsSidebar]=useState(false)
    useEffect(() => {
        const savedTheme = JSON.parse(localStorage.getItem("theme"));
        if (savedTheme) {
            setTheme(savedTheme);
            // changeTheme(savedTheme); // Apply the saved theme
        } else {
            setTheme("dark"); // Default to dark theme
            changeTheme("dark"); // Apply default theme
        }
    }, [theme]); 

    // Handle theme change
    const handleChangeTheme = (theme) => {
        setTheme(theme);
        changeTheme(theme); // Apply the new theme
    };

    return (
        <div className={`h-10 md:h-20  w-full fixed top-0  ${theme=="dark"?"darkTheme":"lightTheme"} p-3 flex justify-between items-center`}>
            <div>
                <h1 className='font-bold'>PgHub</h1>
            </div>
            {/* center div */}
            <div className='hidden md:flex gap-10'>
                <Link href={"/"}>Home</Link>
                <Link href={"/properties"}>Properties</Link>
                <Link href={"/aboutUs"}>About Us</Link>
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
