import React from 'react'
import { useAuth } from '../../context/usersContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import login_pic from '../../assets/login.svg'


function OrgLogIn() {
  const {orgLogin, loginMessage, isLoggedIn} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading]= useState(false)
  

  const login = (e) =>{
    e.preventDefault();
    orgLogin(email, password);
  }
  
  if (loading){
    return (
      <div class="flex items-center justify-center h-screen">
        <div class="relative">
          <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
            <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
             </div>
          </div>
      </div>
    )
  }

  if (isLoggedIn) {
    setLoading(true)
    setTimeout(() => {
      navigate('/org/dashboard')
      setLoading(false)
    }, 1000);
    return null;
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
      <div className="h-[100vh] items-center flex justify-center px-3 lg:px-0 bg-gray-50 mt-1">
      <div className="max-w-screen-xl flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${login_pic})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 p-6 sm:p-12">
          <div className=" flex flex-col items-center p-4 border shadow rounded-lg bg-white">
            <div className="text-center">
              <h1 className="text-xl xl:text-3xl font-extrabold text-blue-900">
              Organiser Sign in
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">            
              <div className="mx-auto max-w-md flex flex-col gap-4 ">     
              {loginMessage && <p className='text-red-500'>{loginMessage}</p>}         
                    <form className="space-y-4 md:space-y-6 w-full" action="#" onSubmit={login}>                      
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
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
                            {/* <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 " required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 ">Remember</label>
                                </div>
                            </div> */}
                            <a href="/org/reset" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet ? <a href="/org/signup" className="font-medium text-primary-600 hover:underline ">Sign up</a>
                        </p>
                    </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default OrgLogIn