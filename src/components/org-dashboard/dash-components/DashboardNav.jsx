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
          <div className="flex items-center">
              <a href='/' className="btn btn-ghost text-xl">
                  <img className="w-18 h-12" src={logo} alt="logo"/>
              </a>
              <button onClick={toggleSidebar} className="text-white focus:outline-none">
                  <IoMenu className="w-8 h-8"/>
              </button>
          </div>
          <div className="block ml-36">
              <h2 className="flex items-center">
                  <MdOutlineAccountCircle className="h-6 w-6 mr-2"/>
                  <p className='text-md sm:text-sm'>{current_org && current_org}</p>
              </h2>
          </div>
        </nav>
    </div>
  )
}

export default DashboardNav