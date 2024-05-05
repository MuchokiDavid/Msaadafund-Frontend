import React from 'react'
import { useAuth } from '../../context/usersContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Login() {
  const {userLogin, loginMessage, isLoggedIn} = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const login = (e) =>{
    e.preventDefault();
    userLogin(username, password);
  }

  if (isLoggedIn) {
    setTimeout(() => {
      navigate('/user/dashboard')
    }, 2000);
    
  }

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <Menus/>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-18 h-12 mr-2" src ={logo} alt="logo"/> 
            </a> */}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Log in to your account
                    </h1>
                    {loginMessage && <p className='text-red-500'>{loginMessage}</p>} 
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username or email address</label>
                            <input type="name" 
                            name="name" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="username" 
                            onChange={(e)=>{setUsername(e.target.value)}}
                            required/>
                        </div>
                        <div className='relative'>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type={showPassword ? "text":"password" }
                            name="password" 
                            id="password" 
                            placeholder="••••••••" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required/>
                            <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6">{showPassword?<FaEye/>:<FaEyeSlash/>}</button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                  <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="/user/reset" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <a href="/user/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Login