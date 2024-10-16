import React from 'react'
import logo from '../../assets/applogo.png'
import { useAuth } from '../../context/usersContext'
import { VscAccount } from "react-icons/vsc";

function Menus() {
    const token=localStorage.getItem('token')
    const user= localStorage.getItem('user')
    const org= localStorage.getItem('org')
    // const userDataString = localStorage.getItem('userData');
    // const userData = userDataString ? JSON.parse(userDataString) : null;
    const {logout} = useAuth();

    return (
        <>
            <div className="navbar bg-white  top-0 shadow-md z-20">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width ="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 text-gray-800 border ">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/org/signup'>Start Fundraising</a></li>  
                        <li><a href='/campaigns'>Discover Fundraisers</a></li>
                        <li><a href='/organisations'>Organisers</a></li>                      
                        <li><a href='/contact'>Contact us</a></li>
                    </ul>
                    </div>
                    <a href='/' className="btn btn-ghost text-xl p-0 hover:bg-slate-100"><img className="w-15 h-10 mr-2 sm:w-15 sm:h-10 lg:w-18 lg:h-12 " src ={logo} alt="logo"/> </a>
                </div>
                <div className="navbar-center nav hidden lg:flex">
                    <ul className="menu menu-horizontal text-gray-800">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/org/signup'>Start Fundraising</a></li> 
                        <li><a href='/campaigns'>Discover Fundraisers</a></li>
                        <li><a href='/organisations'>Organisers</a></li> 
                        <li><a href='/contact'>Contact us</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {token && org? 
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center justify-center h-10 w-10 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2 text-center'>
                              <p className='text-2xl sm:text-2xl md:text-3xl text-gray-400 hover:text-green-500'><VscAccount /></p>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 rounded-box w-52 border">
                            <li className='hover:bg-slate-300'><a href="/org/dashboard">Go to dashboard</a></li>
                            <li className='hover:bg-slate-300' onClick={logout}><a href='/'>Log out</a></li>
                        </ul>
                    </div>)
                    :token && user?
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center justify-center h-10 w-10 bg-blue-500 text-white border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs px-1 py-2 text-center'>
                                <p className='text-2xl sm:text-2xl md:text-3xl text-gray-400 hover:text-green-500'><VscAccount /></p>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 text-gray-800 rounded-box w-52 border">
                            <li className='hover:bg-blue-300'><a href="/user/dashboard">Go to dashboard</a></li>
                            <li className='hover:bg-slate-300' onClick={logout}><a href='/'>Log out</a></li>
                        </ul>
                    </div>)
                    :
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                    <div tabIndex={0} role="button" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Log in</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-50 text-gray-900 rounded-box w-52">
                      <li className='hover:bg-slate-300'><a href="/org/login">Organiser</a></li>
                      <li className='hover:bg-slate-300'><a href="/user/login">Supporter</a></li>
                    </ul>
                  </div>)
                    }
                </div>
            </div>
        </>
    )
    
    
}

export default Menus