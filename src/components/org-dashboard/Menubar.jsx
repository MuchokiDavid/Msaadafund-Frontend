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
import { IoMenu } from "react-icons/io5";

function Menubar({isOpen}) {
  // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {isLoggedIn, user} = useAuth();
  console.log(user)

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <>
    
       {/* {!isOpen && (
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <IoMenu className='w-8 h-8' />
        </button>
      )} */}

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
