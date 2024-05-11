import React from 'react'
import logo from '../../assets/msaadaLogo.png'
import { useAuth } from '../../context/usersContext'
import { MdOutlineAccountCircle } from 'react-icons/md'

function Menus() {
    const token=localStorage.getItem('token')
    const user= localStorage.getItem('user')
    const org= localStorage.getItem('org')
    const {logout} = useAuth();

    return (
        <>
            <div className="navbar bg-slate-700 top-0 z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width ="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-700 rounded-box w-52 text-white">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/campaign'>Fundraisers</a></li>
                        <li><a href='/organisations'>Organisations</a></li>
                        <li><a href='/about'>About us</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                    </div>
                    <a href='/' className="btn btn-ghost text-xl p-0"><img class="w-15 h-10 mr-2 sm:w-15 sm:h-10 lg:w-18 lg:h-12" src ={logo} alt="logo"/> </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal text-white">
                        <li><a href='/'>Home</a></li>
                        <li><a href='/campaign'>Fundraisers</a></li>
                        <li><a href='/organisations'>Organisations</a></li>
                        <li><a href='/about'>About us</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* {token ? 
                    <button onClick={logout} className="btn text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log out</button>
                    :
                    <div className="dropdown dropdown-end absolute right-4 sm:z-20">
                    <div tabIndex={0} role="button" className="btn text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li className='hover:bg-slate-300'><a href="/org/login">Organisation</a></li>
                      <li className='hover:bg-slate-300'><a href="/user/login">User</a></li>
                    </ul>
                  </div>
                    } */}
                    {token && org? 
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        {/* <div tabIndex={0} role="button" className="text-white border border-blue-600 bg-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log out</div> */}
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center h-10 bg-transparent text-white border border-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-1 py-2.5 text-center'>
                              <p className='text-wrap '>{org && org}</p>
                              <MdOutlineAccountCircle className="h-6 w-6 ml-2"/>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='hover:bg-slate-300'><a href="/org/dashboard">Go to dashboard</a></li>
                        <li className='hover:bg-slate-300' onClick={logout}><a href='/'>Log out</a></li>
                        </ul>
                    </div>)
                    :token && user?
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                        <div tabIndex={0} role="button" className="text-xs">
                            <div className='flex items-center h-10 bg-blue-600 text-white border border-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-1 py-2.5 text-center'>
                              <p className='text-wrap '>{user && user}</p>
                              <MdOutlineAccountCircle className="h-6 w-6 ml-2"/>
                            </div>
                        </div>
                        {/* <div tabIndex={0} role="button" className="text-white border border-blue-600 bg-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log out</div> */}
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='hover:bg-slate-300'><a href="/user/dashboard">Go to dashboard</a></li>
                        <li className='hover:bg-slate-300' onClick={logout}><a href='/'>Log out</a></li>
                        </ul>
                    </div>)
                    :
                    (<div className="dropdown dropdown-end absolute right-4 sm:z-20">
                    <div tabIndex={0} role="button" className="text-white border border-blue-600 bg-blue-600 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Log in</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                      <li className='hover:bg-slate-300'><a href="/org/login">Organisation</a></li>
                      <li className='hover:bg-slate-300'><a href="/user/login">User</a></li>
                    </ul>
                  </div>)
                    }
                </div>
            </div>
        </>
    )
    
    
}

export default Menus