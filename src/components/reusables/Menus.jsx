import React from 'react'
import logo from '../../assets/msaadaLogo.png'
import { useAuth } from '../../context/usersContext'

function Menus() {
    const token=localStorage.getItem('token')
    const {logout} = useAuth();

    return (
        <>
            <div className="navbar bg-slate-700">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-700 rounded-box w-52 text-white">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/campaign'>Campaigns</a></li>
                        <li><a href='/about'>About us</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><img class="w-18 h-12 mr-2" src ={logo} alt="logo"/> </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/campaign'>Campaigns</a></li>
                        <li><a href='/about'>About us</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {token ? 
                    <button onClick={logout} className="btn text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log out</button>
                    :
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20">
                    <div tabIndex={0} role="button" className="btn m-1 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log in</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li className='hover:bg-slate-300'><a href="/org/login">Organisation</a></li>
                      <li className='hover:bg-slate-300'><a href="/user/login">User</a></li>
                    </ul>
                  </div>
                    }
                </div>
            </div>
        </>
    )
    
    
}

export default Menus