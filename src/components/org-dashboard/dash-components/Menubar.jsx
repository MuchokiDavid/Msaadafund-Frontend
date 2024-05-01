import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaHome } from "react-icons/fa";
import { MdOutlineCampaign } from "react-icons/md";
import { FaDonate } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../../context/usersContext';
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { GiSpeakerOff } from "react-icons/gi";
import { GrAddCircle } from "react-icons/gr";
import { IoMdHelpCircle } from "react-icons/io";


function Menubar({isOpen, toggleSidebar, handleMenuItemClick}) {
  // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  const {logout} = useAuth();
  const token = localStorage.getItem('token');
  const orgName = localStorage.getItem('org');


  const handleLogout = () => {
    logout()
    window.location.replace("/org/login")
  };

  if (!token && !orgName){
    handleLogout()
  }


  return (
    <div className='bg-emerald-500 min-h-screen'>
    
       {/* {!isOpen && (
        <button onClick={toggleSidebar} className="text-white focus:outline-none md:hidden">
          <IoMenu className='w-8 h-8' />
        </button>
      )} */}

      <Sidebar className={`text-slate-800 bg-transparent h-full ${isOpen ? 'absolute' : 'hidden'}`} style={{ zIndex: 1000}}>
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
          <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard" />} icon={<FaHome className='w-5 h-5' />} onClick={handleMenuItemClick}> Dashboard</MenuItem>
          <SubMenu className='hover:text-emerald-800 text-sm shadow' label="Campaigns" icon={<MdOutlineViewCompactAlt className='w-5 h-5' />}>
              <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/createcampaign" />} icon={<GrAddCircle className='w-5 h-5'/>} onClick={handleMenuItemClick}>Add Campaign</MenuItem>
              <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/mycampaigns/active" />} icon={<MdOutlineCampaign className='w-5 h-5'/>} onClick={handleMenuItemClick}>Active Campaigns</MenuItem>
              <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/mycampaigns/inactive" />} icon={<GiSpeakerOff className='w-5 h-5'/>} onClick={handleMenuItemClick}>Inactive Campaigns</MenuItem>
              <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transaction" />} icon={<GrTransaction className='w-5 h-5' />} onClick={handleMenuItemClick}>Campaign Transactions </MenuItem>
          </SubMenu>
          <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/donations" />} icon={<FaDonate className='w-5 h-5' />} onClick={handleMenuItemClick}>Donations</MenuItem>
          <SubMenu className='hover:text-emerald-800 text-sm shadow' label="Transact" icon={<FaMoneyBillTransfer className='w-5 h-5' />}>
            <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transact/accounts" />} icon={<BiMoneyWithdraw className='w-5 h-5' />} onClick={handleMenuItemClick}>Accounts </MenuItem>
            <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transact/withdraw" />} icon={<FaMoneyBillTrendUp className='w-5 h-5' />} onClick={handleMenuItemClick}>Withdraw</MenuItem>
            <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transact/buyairtime" />} icon={<FaPhone className='w-5 h-5' />} onClick={handleMenuItemClick}>Buy Airtime</MenuItem>
            <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transact/withdrawals" />} icon={<GrTransaction className='w-5 h-5' />} onClick={handleMenuItemClick}>Withdrawals</MenuItem>
            <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/transact/transactionstatus" />} icon={<GrInProgress className='w-5 h-5' />} onClick={handleMenuItemClick}>Check Status</MenuItem>
          </SubMenu>
          {/* <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/accounts" />} icon={<BiMoneyWithdraw />} onClick={handleMenuItemClick}>Accounts </MenuItem> */}
          <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/helpcenter" />} icon={<IoMdHelpCircle className='w-5 h-5' />} onClick={handleMenuItemClick}>Help Center </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' component={<Link to="/org/dashboard/profile" />} icon={<IoPersonCircle className='w-5 h-5' />} onClick={handleMenuItemClick}>Profile </MenuItem>
          <MenuItem className='hover:text-emerald-800 text-sm hover:underline shadow' onClick={() => { handleLogout(); handleMenuItemClick(); }} icon={<RiLogoutBoxLine className='w-5 h-5' />}>Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Menubar;
