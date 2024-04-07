import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaHome } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { LiaTelegram } from "react-icons/lia";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../context/usersContext';
import { IoMenu } from "react-icons/io5";

function Usermenubar({ isOpen, toggleSidebar }) {
  const { isLoggedIn, user } = useAuth();

  const handleLogout = () => {
    // Handle logout
  };

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      {!isOpen && (
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <IoMenu className='w-8 h-8' />
        </button>
      )}

      {/* Sidebar */}
      <Sidebar className={`text-black h-full dark:bg-gray-300 ${isOpen ? '' : 'hidden'} md:block`} style={{ zIndex: 1000, height: "100vh", backgroundColor: '#2D3748'}}>
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
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/user/dashboard" />} icon={<FaHome />}> Home</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/user/dashboard/active-donations" />} icon={<CiBank />}> Active Donations</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/user/dashboard/previous-donations" />} icon={<LiaTelegram />}>Previous Donations</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/user/dashboard/profile" />} icon={<IoPersonCircle />}>Profile </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' onClick={handleLogout} icon={<RiLogoutBoxLine />}>Logout </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default Usermenubar;
