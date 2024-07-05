import React, { useEffect, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { useAuth } from '../../../context/usersContext';
import logo from '../../../assets/applogo.png'
import Joyride from 'react-joyride';

function DashboardNav({toggleSidebar}) {
    // const [isOpen, setIsOpen] = useState(true); // Default to open on large screens
  let current_org= localStorage.getItem('org');
  let token=localStorage.getItem("token");
  let org= localStorage.getItem("org");
  const {logout} = useAuth();

  
  if(!token && !org){
      window.location.replace("/org/login")
  }

  const handleLogout = () => {
    logout()
    window.location.replace("/org/login")
  };


  const [steps, setSteps] = useState([]);

  useEffect(() => {
    setSteps([
        {
            target: '.dash',
            content: 'Analytics here.',
        },
        {
        target: '.create-campaign',
        content: 'Create a new campaign by clicking here.',
        },
        {
        target: '.view-campaigns',
        content: 'View all your campaigns here.',
        },
        {
        target: '.view-contributions',
        content: 'View all contributions made to your campaigns here.',
        },
        {
        target: '.add-withdrawal-account',
        content: 'Add your M-Pesa and Bank withdrawal account here.',
        },
        {
        target: '.withdraw-funds',
        content: 'Withdraw your funds to your accounts by clicking here.',
        },
        {
        target: '.paybills',
        content: 'Pay your bills from your campaign funds here.',
        },
        {
        target: '.buy-goods',
        content: 'Buy goods and services using your campaign funds here.',
        },
        {
        target: '.airtime',
        content: 'Purchase airtime using your campaign funds here.',
        },
        {
        target: '.view-signatories',
        content: 'Add and view all your signatories here.',
        },
        {
        target: '.view-withdrawals',
        content: 'View all your withdrawals here.',
        },
        {
        target: '.view-transactions',
        content: 'View all transactions related to your campaigns here.',
        },
        {
          target: '.view-approvals',
          content: 'View all pending signatories approvals related to your campaigns here.',
          },
    ])
  }, [steps])

  return (
    <div className='w-full' id='dashNav'>
        <nav className="flex justify-between items-center py-2 w-full bg-white shadow">
          <div className="flex items-center ml-3">
            <button onClick={toggleSidebar} className="text-white focus:outline-none font-bold">
                <IoMenu className="w-8 h-8 text-gray-600 rounded-full hover:bg-gray-100"/>
            </button>
            <a href='/' className="btn btn-ghost">
                <img className="w-18 h-12" src={logo} alt="logo"/>
            </a>
              
          </div>
          <Joyride steps={steps} continuous={true} />
          <div className="block ml-36 w-32 overflow-hidden">
              <div className="flex items-center justify-end">
                    <div className="dropdown dropdown-end absolute right-4">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center justify-center h-10 bg-blue-600 text-white border border-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2.5 w-10 text-center'>
                              <p className='lg:text-base sm:text-sm'>{current_org && current_org.charAt(0)}</p>
                              <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-500"></span>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow border bg-white text-slate-800 rounded-box w-36">
                        <li ><a href="/org/dashboard/helpcenter">Help</a></li>
                        <li ><a href="/org/dashboard/profile">Profile</a></li>
                        <li  onClick={handleLogout}><a href='/org/login'>Log out</a></li>
                        </ul>
                    </div>
              </div>
          </div>
        </nav>
    </div>
  )
}

export default DashboardNav