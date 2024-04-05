import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaHome } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { LiaTelegram } from "react-icons/lia";
import { GrTransaction } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../context/usersContext';
import { MdOutlineAccountCircle } from "react-icons/md";

function Menubar({isOpen}) {
  // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {isLoggedIn, user} = useAuth();
  console.log(user)

  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  // useEffect(() => {
  //   const handleResize = () => {
  //     const isLargeScreen = window.innerWidth >= 1024;
  //     // setIsOpen(isLargeScreen); // Open on large screens, close on others
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <>
      {/* Navbar */}
      {/* <nav className="bg-gray-800 text-white flex justify-between items-center p-4">

        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <h1 className="text-xl">Dashboard</h1>
        <div>
          <h2><MdOutlineAccountCircle />Username</h2>
        </div> {/* Add any additional navbar content here *
      </nav> */}

      {/* Sidebar */}
      <Sidebar className={`text-black h-full dark:bg-gray-300 ${isOpen ? '' : 'hidden'}`} style={{ zIndex: 1000, height: "100vh", backgroundColor: '#2D3748'}}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/company/dashboard" />} icon={<FaHome />}> Home</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/company/dashboard/campaign" />} icon={<CiBank />}> Campaign</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/company/dashboard/donations" />} icon={<LiaTelegram />}>Donations</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/company/dashboard/transaction" />} icon={<GrTransaction />}>Transactions </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/company/dashboard/profile" />} icon={<IoPersonCircle />}>Profile </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' onClick={handleLogout} icon={<RiLogoutBoxLine />}>Logout </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default Menubar;
