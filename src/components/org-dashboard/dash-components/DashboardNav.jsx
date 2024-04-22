import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from  '../../../assets/msaadaLogo.png';


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  let current_org= localStorage.getItem('org');
  let token=localStorage.getItem("token");

  
  if(!token){
      window.location.replace("/org/login")
  }

  return (
    <div className='w-screen'>
        <nav className="bg-slate-700 text-white flex justify-between items-center py-4 w-full">
          <div className="flex items-center ml-3">
            <button onClick={toggleSidebar} className="text-white focus:outline-none font-bold">
                <IoMenu className="w-8 h-8"/>
            </button>
            <a href='/' className="btn btn-ghost">
                <img className="w-18 h-12" src={logo} alt="logo"/>
            </a>
              
          </div>
          <div className="block ml-36 w-32 overflow-hidden">
              <h2 className="flex items-center">
                  <MdOutlineAccountCircle className="h-8 w-8 mr-2"/>
                  <p className='text-lg sm:text-sm overflow-hidden'>{current_org && current_org}</p>
              </h2>
          </div>
        </nav>
    </div>
  )
}

export default DashboardNav