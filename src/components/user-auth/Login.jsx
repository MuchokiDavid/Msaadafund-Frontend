import React from 'react'
import { useAuth } from '../../context/usersContext'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import login_pic from '../../assets/login.svg'
import Googleauth from './Googleauth';

function Login() {
  const {userLogin, loginMessage, isLoggedIn, userLoading} = useAuth();
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
    }, 1000);     
  }
  // if (isLoggedIn) {
  //   setTimeout(() => {
  //     window.open('/user/dashboard', '_blank');
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
          <div className=" flex flex-col items-center p-4 shadow border bg-white rounded-lg">
            <div className="text-center">
              <h1 className="text-xl xl:text-3xl font-extrabold text-blue-900">
              Supporter Sign in
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">             
              <div className="mx-auto max-w-md flex flex-col gap-4 ">              
              {loginMessage && <p className='text-red-500'>{loginMessage}</p>} 
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={login}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Username or email address</label>
                        <input type="name" 
                        name="name" 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        placeholder="username" 
                        onChange={(e)=>{setUsername(e.target.value)}}
                        required/>
                    </div>
                    <div className='relative'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
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
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label for="remember" className="text-gray-500">Remember</label>
                            </div>                            
                        </div> */}
                        <a href="/user/reset" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                    </div>
                    {userLoading ? <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                        10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                       </svg>                      
                      Loading...
                      </button>:<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>}
                    <Googleauth/>      
                    <p className="text-sm font-light text-gray-500">
                        Don’t have an account yet? <a href="/user/signup" className="font-medium text-primary-600 hover:underline">Sign up</a>
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

export default Login