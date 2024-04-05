import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMenu } from "react-icons/io5";


function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {isLoggedIn, user} = useAuth();
  console.log(user)

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isLargeScreen = window.innerWidth >= 1024;
  //     setIsOpen(isLargeScreen); // Open on large screens, close on others
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  
  return (
    <div>
        <nav className="bg-gray-800 text-white flex justify-between items-center p-4">

            <button onClick={toggleSidebar} className="text-white focus:outline-none">
            <IoMenu className='w-8 h-8' />

            {/* <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg> */}
            </button>
            <h1 className="text-xl">Dashboard</h1>
            <div>
            <h2><MdOutlineAccountCircle />Username</h2>
            </div> {/* Add any additional navbar content here */}
        </nav>
    </div>
  )
}

export default DashboardNav