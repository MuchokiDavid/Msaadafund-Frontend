import React, { useEffect, useState } from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from  '../../../assets/msaadaLogo.png';
import { useAuth } from '../../../context/usersContext';


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  let current_org= localStorage.getItem('org');
  let token=localStorage.getItem("token");
  const {logout} = useAuth();

  
  if(!token){
      window.location.replace("/org/login")
  }

  const handleLogout = () => {
    logout()
    window.location.replace("/org/login")
  };

  return (
    <div className='w-screen'>
        <nav className="bg-slate-700 text-white flex justify-between items-center py-2 w-full">
          <div className="flex items-center ml-3">
            <button onClick={toggleSidebar} className="text-white focus:outline-none font-bold">
                <IoMenu className="w-8 h-8"/>
            </button>
            <a href='/' className="btn btn-ghost">
                <img className="w-18 h-12" src={logo} alt="logo"/>
            </a>
              
          </div>
          <div className="block ml-36 w-32 overflow-hidden">
              <div className="flex items-center">
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20 hover:border">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center h-10'>
                              <MdOutlineAccountCircle className="h-6 w-6 mr-2"/>
                              <p className='text-wrap '>{current_org && current_org}</p>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-36">
                        <li className='hover:bg-slate-700'><a href="/org/dashboard/profile">Profile</a></li>
                        <li className='hover:bg-slate-700' onClick={logout}><a href='/org/login'>Log out</a></li>
                        </ul>
                    </div>
              </div>
          </div>
        </nav>
    </div>
  )
}

export default DashboardNav