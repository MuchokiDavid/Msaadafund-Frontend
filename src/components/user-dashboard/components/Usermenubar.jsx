import React from 'react';
import { FaDonate} from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../../context/usersContext';
import { MdOutlineSubscriptions } from "react-icons/md";
import { IoMdHelpCircle } from 'react-icons/io';
import { GrTransaction } from "react-icons/gr";



function Usermenubar({ handleMenuItemClick, toggleSideBar }) {
  const { logout } = useAuth();
  const token= localStorage.getItem('token')
  const user= localStorage.getItem('user')
  const signatory = localStorage.getItem('isSignatory')==='true';

  const handleLogout = () => {
    logout()
    window.location.replace("/user/login")
  };

  if(!token && !user){
    window.location.replace("/user/login")
  }


  return (
    <>
      <aside className="flex flex-col min-w-64 h-screen pl-5 py-2 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l overflow-x-hidden">
          <div className="flex flex-col justify-between flex-1 mt-4">
              <nav className="-mx-3 space-y-6 ">
                  <div className="space-y-3 ">
                      <label className="px-3 text-xs text-gray-500 uppercase">analytics</label>

                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700" 
                      onClick={handleMenuItemClick}
                      href="/user/dashboard">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                          </svg>

                          <span className="mx-2 text-sm font-medium">Dashboard</span>
                      </a>
                  </div>

                  <div className="space-y-3 ">
                      <label className="px-3 text-xs text-gray-500 uppercase">Data</label>

                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                      onClick={handleMenuItemClick}
                      href="/user/dashboard/contributions">
                          
                          <FaDonate className='h-4 w-4'/>

                          <span className="mx-2 text-sm font-medium">Contributions</span>
                      </a>

                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                      onClick={handleMenuItemClick}
                      href="/user/dashboard/subscriptions">
                          <MdOutlineSubscriptions/>
                          <span className="mx-2 text-sm font-medium">Subscriptions</span>
                      </a>
                  </div>
                  {/* signatory routes  */}
                  {signatory && (
                  <div className="space-y-3 ">
                    <label className="px-3 text-xs text-gray-500 uppercase">Signatory</label>

                    <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                    onClick={handleMenuItemClick}
                    href="/user/dashboard/approvals">
                    <GrTransaction className='w-5 h-5' />
                    <span className="mx-2 text-sm font-medium">Pending Approvals</span>
                    </a>
                </div>
                )}


                  <div className="space-y-3 ">
                      <label className="px-3 text-xs text-gray-500 uppercase">Customization</label>

                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                      onClick={handleMenuItemClick}
                      href="/user/dashboard/profile">
                          
                          <IoPersonCircle className='w-5 h-5' />

                          <span className="mx-2 text-sm font-medium">Profile</span>
                      </a>

                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                      onClick={handleMenuItemClick}
                      href="/user/dashboard/help">
                          
                          <IoMdHelpCircle className='w-5 h-5' />

                          <span className="mx-2 text-sm font-medium">Help</span>
                      </a>
                      <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                      onClick={() => { handleLogout()}}
                      >
                        
                          <RiLogoutBoxLine className='w-5 h-5' />

                          <span className="mx-2 text-sm font-medium">Log out</span>
                      </a>
                  </div>
              </nav>
          </div>
      </aside>
    </>
  );
}

export default Usermenubar;
