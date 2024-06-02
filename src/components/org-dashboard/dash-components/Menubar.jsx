import React from 'react';
import {IoPersonCircle } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth } from '../../../context/usersContext';
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaPhone } from "react-icons/fa6";
import { GrAddCircle } from "react-icons/gr";
import { IoMdHelpCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import { GrAtm } from "react-icons/gr";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { BsBoxArrowDown } from "react-icons/bs";
import { FaDonate } from "react-icons/fa";
import { MdSendToMobile } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineAppRegistration } from "react-icons/md";

function Menubar({handleMenuItemClick}) {
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

  return(
  <aside className="flex flex-col min-w-64 min-h-screen pl-5 py-2 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l overflow-x-hidden">
        
    <div className="flex flex-col justify-between flex-1 ">
        <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase">analytics</label>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                    </svg>

                    <span className="mx-2 text-sm font-medium">Dashboard</span>
                </a>

                {/* <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>

                    <span className="mx-2 text-sm font-medium">Preformance</span>
                </a> */}
            </div>

            <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase">Campaign</label>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/createcampaign">
                    <GrAddCircle className='h-5 w-5'/>

                    <span className="mx-2 text-sm font-medium">Create</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/mycampaigns/active">
                    
                    <VscVmActive className='w-5 h-5'/>

                    <span className="mx-2 text-sm font-medium">Active</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/mycampaigns/inactive">
                    <MdOutlineCancel className='h-5 w-5'/>

                    <span className="mx-2 text-sm font-medium">Inactive</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/donations">
                    <FaDonate className='h-4 w-4'/>

                    <span className="mx-2 text-sm font-medium">Contributions</span>
                </a>

            </div>


            <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase">Transact</label>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/accounts">
                    
                    <BiMoneyWithdraw className='w-4 h-4' />

                    <span className="mx-2 text-sm font-medium">Accounts</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/withdraw">
                  
                    <GrAtm className='w-4 h-4' />

                    <span className="mx-2 text-sm font-medium">Withdraw</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/paybill">
                    <MdSendToMobile className='w-4 h-4' />

                    <span className="mx-2 text-sm font-medium">Paybill</span>
                </a>          


                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/till">
                    <MdOutlinePayments className='w-4 h-4'/>

                    <span className="mx-2 text-sm font-medium">Till Number</span>
                </a>


                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/buyairtime">
                    
                    <FaPhone className='w-3 h-3' />

                    <span className="mx-2 text-sm font-medium">Buy Airtime</span>
                </a>    
                
                
            </div>

            <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase">Records</label>
                
                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/transactionstatus">
                    
                    <HiOutlineStatusOnline className='w-4 h-4'/>

                    <span className="mx-2 text-sm font-medium">Status</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/signatories">
                    
                    <MdOutlineAppRegistration className='w-4 h-4'/>

                    <span className="mx-2 text-sm font-medium">Signatories</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transact/withdrawals">
                    
                    <BsBoxArrowDown className='w-4 h-4'/>

                    <span className="mx-2 text-sm font-medium">Withdrawals</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/transaction">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>

                    <span className="mx-2 text-sm font-medium">Transactions</span>
                </a>
            </div>


            <div className="space-y-3 ">
                <label className="px-3 text-xs text-gray-500 uppercase">Customization</label>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/profile">
                    
                    <IoPersonCircle className='w-5 h-5' />

                    <span className="mx-2 text-sm font-medium">Profile</span>
                </a>

                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                onClick={handleMenuItemClick}
                href="/org/dashboard/helpcenter">
                    
                    <IoMdHelpCircle className='w-5 h-5' />

                    <span className="mx-2 text-sm font-medium">Help</span>
                </a>
                <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" 
                onClick={() => { handleLogout(); handleMenuItemClick(); }}
                >
                   
                    <RiLogoutBoxLine className='w-5 h-5' />

                    <span className="mx-2 text-sm font-medium">Log out</span>
                </a>
            </div>
        </nav>
    </div>
</aside>
  )
}

export default Menubar;
