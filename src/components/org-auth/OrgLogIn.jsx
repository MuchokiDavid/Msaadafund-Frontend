import React from 'react'
import { useAuth } from '../../context/usersContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";



function OrgLogIn() {
  const {orgLogin, loginMessage, isLoggedIn} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const token=localStorage.getItem('token')
  

  const login = (e) =>{
    e.preventDefault();
    orgLogin(email, password);
  }

  if (isLoggedIn) {
    setTimeout(() => {
      navigate('/org/dashboard')
    }, 2000);
  }
  // if (isLoggedIn) {
  //   setTimeout(() => {
  //     window.open('/org/dashboard', '_blank');
  //   }, 1000);    
  // }

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }



  return (
    <div>
      <Menus/>
      <section className="bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 lg:w-1/3">
            {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img className="w-18 h-12 mr-2" src ={logo} alt="logo"/> 
            </a> */}
            <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Organiser Log in
                    </h1>
                    {loginMessage && <p className='text-red-500'>{loginMessage}</p>} 
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Organisation Email</label>
                            <input type="email" 
                            name="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " 
                            placeholder="email" 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required/>
                        </div>
                        <div className="relative">
                            <label htmlFor="password" 
                            className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type={showPassword ? "text":"password" }
                            name="password" 
                            id="password" 
                            placeholder="password" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            required/>
                            <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6">{showPassword?<FaEye/>:<FaEyeSlash/>}</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                                </div>
                            </div>
                            <a href="/org/reset" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <a href="/org/signup" className="font-medium text-primary-600 hover:underline ">Sign up</a>
                        </p>
                    </form>
                    {/* <FaEye/>
                    <FaEyeSlash/> */}
                </div>
            </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default OrgLogIn