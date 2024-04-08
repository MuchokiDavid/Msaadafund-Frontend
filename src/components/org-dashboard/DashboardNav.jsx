import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {isLoggedIn, user} = useAuth();
  console.log(user)
  
  return (
    <div>
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4">

            <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <IoMenu className='w-8 h-8' />
            </button>
            <h1 className="text-xl">Dashboard</h1>
            <div>
            <h2><MdOutlineAccountCircle />Username</h2>
            </div> 
        </nav>
    </div>
  )
}

export default DashboardNav