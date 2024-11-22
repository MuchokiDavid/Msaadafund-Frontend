import React from 'react'
// import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import logo from  '../../../assets/applogo.png';
import { useAuth } from '../../../context/usersContext';
import { VscAccount } from "react-icons/vsc";

function UserNav({toggleSidebar, handleMenuItemClick}) {
    let token=localStorage.getItem("token");
    let current_user= localStorage.getItem("user");
    const {logout} = useAuth();
    // const userDataString = localStorage.getItem('userData');
    // const userData = userDataString ? JSON.parse(userDataString) : null;

    if(!token && !current_user){
        window.location.replace("/user/login")
    }

    const handleLogout = () => {
        logout()
        window.location.replace("/user/login")
    }
  return (
    <div className='w-full' id='userDash' onClick={handleMenuItemClick}>
        <nav className="flex justify-between items-center py-2 w-full bg-white shadow">
          <div className="flex items-center ml-3">
            <button onClick={toggleSidebar} className="text-white focus:outline-none font-bold">
                <IoMenu className="w-8 h-8 text-gray-600  rounded-full hover:bg-gray-100"/>
            </button>
            <a href='/' className="btn btn-ghost hover:bg-slate-100">
                <img className="w-18 h-12" src={logo} alt="logo"/>
            </a>
              
          </div>
          <div className="block ml-36 w-32 overflow-hidden">
              <div className="flex items-center">
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center justify-center h-10 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2.5 w-10 text-center'>
                              <p className='text-2xl sm:text-2xl md:text-3xl text-gray-400 hover:text-green-500'><VscAccount /></p>
                              {/* <p className='text-wrap flex-wrap'>{userData && userData.firstName}</p> */}
                              {/* <MdOutlineAccountCircle className="h-6 w-6 ml-2"/> */}
                              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-500"></span>

                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white border rounded-box w-36">
                        <li className='hover:bg-slate-500'><a href="/user/dashboard/help">Help</a></li>
                        <li className='hover:bg-slate-500'><a href="/user/dashboard/profile">Profile</a></li>
                        <li className='hover:bg-slate-500' onClick={handleLogout}><a href='/user/login'>Log out</a></li>
                        </ul>
                    </div>
              </div>
          </div>
        </nav>
    </div>
  )
}

export default UserNav