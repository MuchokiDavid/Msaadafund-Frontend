import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaHome } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../context/usersContext';
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineViewCompactAlt } from "react-icons/md";

function Menubar({isOpen}) {
  // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {logout} = useAuth();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout()
    window.location.replace("/org/login")
  };

  if (!token){
    handleLogout()
  }

  return (
    <>
    
       {/* {!isOpen && (
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <IoMenu className='w-8 h-8' />
        </button>
      )} */}

      <Sidebar className={`text-slate-800 dark:text-gray-100 bg-gray-50 h-screen md:max-h-screen dark:bg-gray-700 ${isOpen ? 'absolute' : 'hidden'}`} style={{ zIndex: 1000}}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                // backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard" />} icon={<FaHome />}> Dashboard</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/createcampaign" />} icon={<MdOutlineCampaign className='w-6 h-6'/>}>Create Campaign</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/campaigns" />} icon={<MdOutlineViewCompactAlt className='w-6 h-6'/>}>View Campaigns</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/donations" />} icon={<FaDonate />}>Donations</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/transaction" />} icon={<GrTransaction />}>Transactions </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/accounts" />} icon={<BiMoneyWithdraw />}>Accounts </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/profile" />} icon={<IoPersonCircle />}>Profile </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' onClick={handleLogout} icon={<RiLogoutBoxLine />}>Logout </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default Menubar;
