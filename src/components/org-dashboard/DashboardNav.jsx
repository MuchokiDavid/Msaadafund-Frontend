import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from  '../../assets/msaadaLogo.png';


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {user} = useAuth();
  let token=localStorage.getItem("token");
  
  if(!token){
      window.location.replace("/org/login")
  }

  return (
    <div>
        <nav className="bg-slate-700 text-white flex justify-between items-center p-4">
            <div>
              <a href='/' className="btn btn-ghost text-xl"><img class="w-18 h-12 mr-5" src ={logo} alt="logo"/> </a>
              <button onClick={toggleSidebar} className="text-white focus:outline-none lg:hidden">
              <IoMenu className='w-8 h-8' />
              </button>
            </div>
            
            <h1 className="text-xl">Dashboard</h1>
            <div>
            <h2><MdOutlineAccountCircle className='h-6 w-6'/>{user && user.orgName}</h2>
            </div> 
        </nav>
    </div>
  )
}

export default DashboardNav