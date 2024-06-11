import React from 'react'
import { IoMenu } from "react-icons/io5";
import logo from  '../../../assets/msaadaLogo.png';
import { useAuth } from '../../../context/usersContext';


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

  return (
    <div className='w-full' id='dashNav'>
        <nav className="flex justify-between items-center py-2 w-full bg-white shadow">
          <div className="flex items-center ml-3">
            <button onClick={toggleSidebar} className="text-white focus:outline-none font-bold">
                <IoMenu className="w-8 h-8 text-gray-600"/>
            </button>
            <a href='/' className="btn btn-ghost">
                <img className="w-18 h-12" src={logo} alt="logo"/>
            </a>
              
          </div>
          <div className="block ml-36 w-32 overflow-hidden">
              <div className="flex items-center">
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20">
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