import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../context/usersContext';
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";


function Menubar({isOpen, toggleSidebar}) {
  // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {logout} = useAuth();
  const token = localStorage.getItem('token');

   // Use react-responsive to get screen size
   const isSmallScreen = useMediaQuery({ maxWidth: 767 });
   const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const handleLogout = () => {
    logout()
    window.location.replace("/org/login")
  };

  if (!token){
    handleLogout()
  }

  const handleMenuItemClick = () => {
    if (isOpen && (isSmallScreen || isMediumScreen)) {
      toggleSidebar();
    }
  };

  return (
    <>
    
       {/* {!isOpen && (
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <IoMenu className='w-8 h-8' />
        </button>
      )} */}

      <Sidebar className={`text-slate-800 dark:text-gray-100 bg-gray-50 h-screen  dark:bg-gray-700 ${isOpen ? 'absolute' : 'hidden'}`} style={{ zIndex: 1000}}>
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
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard" />} icon={<FaHome />} onClick={handleMenuItemClick}> Dashboard</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/createcampaign" />} icon={<MdOutlineCampaign className='w-6 h-6'/>} onClick={handleMenuItemClick}>Add Campaign</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/campaigns" />} icon={<MdOutlineViewCompactAlt className='w-6 h-6'/>} onClick={handleMenuItemClick}>My Campaigns</MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/donations" />} icon={<FaDonate />} onClick={handleMenuItemClick}>Donations</MenuItem>
          <SubMenu className='hover:text-emerald-800 text-lg shadow-md' label="Transact" icon={<FaMoneyBillTransfer />}>
            <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/transact/withdraw" />} icon={<FaMoneyBillTrendUp />} onClick={handleMenuItemClick}>Withdraw</MenuItem>
            <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/transact/buyairtime" />} icon={<FaPhone />} onClick={handleMenuItemClick}>Buy Airtime</MenuItem>
          </SubMenu>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/transaction" />} icon={<GrTransaction />} onClick={handleMenuItemClick}>Transactions </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/accounts" />} icon={<BiMoneyWithdraw />} onClick={handleMenuItemClick}>Accounts </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' component={<Link to="/org/dashboard/profile" />} icon={<IoPersonCircle />} onClick={handleMenuItemClick}>Profile </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-lg hover:underline shadow-md' onClick={() => { handleLogout(); handleMenuItemClick(); }} icon={<RiLogoutBoxLine />}>Logout </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default Menubar;
