import React from 'react'
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from  '../../../assets/msaadaLogo.png';
import { useAuth } from '../../../context/usersContext';
import { useNavigate } from 'react-router-dom';

function UserNav({toggleSidebar}) {
    let token=localStorage.getItem("token");
    let current_user= localStorage.getItem("user");
    const {logout} = useAuth();
    const navigate = useNavigate();

    if(!token && !current_user){
        window.location.replace("/user/login")
    }

    const handleLogout = () => {
        logout()
        window.location.replace("/user/login")
    }
  return (
    <div className='w-full'>
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
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center h-10 bg-blue-600 text-white border border-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-1 py-2.5 text-center'>
                              <p className='text-wrap '>{current_user && current_user}</p>
                              <MdOutlineAccountCircle className="h-6 w-6 ml-2"/>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-slate-800 rounded-box w-36">
                        <li className='hover:bg-slate-700'><a href="/user/dashboard/help">Help</a></li>
                        <li className='hover:bg-slate-700'><a href="/user/dashboard/profile">Profile</a></li>
                        <li className='hover:bg-slate-700' onClick={handleLogout}><a href='/user/login'>Log out</a></li>
                        </ul>
                    </div>
              </div>
          </div>
        </nav>
    </div>
  )
}

export default UserNav