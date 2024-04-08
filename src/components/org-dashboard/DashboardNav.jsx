import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {user} = useAuth();
  let token=localStorage.getItem("token");
  const navigate= useNavigate()
  
  if(!token){
      navigate("org/login")
  }

  return (
    <div>
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4">

            <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <IoMenu className='w-8 h-8' />
            </button>
            <h1 className="text-xl">Dashboard</h1>
            <div>
            <h2><MdOutlineAccountCircle className='h-6 w-6'/>{user && user.orgName}</h2>
            </div> 
        </nav>
    </div>
  )
}

export default DashboardNav