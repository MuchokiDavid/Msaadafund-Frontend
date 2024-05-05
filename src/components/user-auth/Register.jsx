import React, { useState } from 'react'
import Menus from '../reusables/Menus'
import Footer from '../reusables/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function Register() {
  const [errors, setErrors] = useState("")
  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const passwordPattern = /^[A-Za-z0-9]{8,}$/;
  const phonePattern = /^(07|01)\d{8}$/;
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false)
  const [password,setPasswordConfirm ] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    // const formData= 
    if (!userPassword.match(passwordPattern)) {
      setErrors('Please ensure your password has atleast one letter, one digit, and a total length of at least 8 characters')
    }
    else if (!phoneNumber.match(phonePattern)) {
      setErrors('Invalid Phone Number')
    }
    else {
      if (userPassword === confirmPassword) {
        let phoneNo = phoneNumber.replace(/^0+/, '');
        let formattedPhoneNumber = "254" + phoneNo;
        fetch('/api/v1.0/auth/user/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: userName,
            email: email,
            phoneNumber: formattedPhoneNumber,
            password: userPassword
          })
        }).then((res) => res.json())
          .then((data) => {
            // console.log(data.message);
            if(data.message){
              toast.success("User registered successifully")

              setTimeout(() => {
                navigate('/user/login')
              }, 2000);
            }
            if (data.error) {
              setErrors(data.error)
            } 
          })
          .catch((err) => { setErrors(err) });
      } else {
        setErrors('Passwords does not match')
      }
    };
  }
// for set password field
  const togglePassword = (e)=>{
    e.preventDefault()
    setShowPassword(!showPassword)
  }
// for confirm input field
  const togglePasswordVisibility=(e)=>{
    e.preventDefault()
    setPasswordConfirm(!password)
  }

  return (
    <div>
      <Menus />
      <section className="bg-white min-h-screen flex justify-center items-center lg:my-16">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img className="w-18 h-12 mr-2" src ={logo} alt="logo"/> 
            </a> */}
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              {errors && <p className='text-red-500'>{errors}</p>}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">First Name</label> */}
                    <input type="name"
                      name="firstname"
                      id="username"
                      onChange={(e) => { setFirstName(e.target.value) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="First Name"
                      required/>
                  </div>
                  <div>
                    {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label> */}
                    <input type="name"
                      name="lastname"
                      id="lastname"
                      onChange={(e) => { setLastName(e.target.value) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Last Name"
                      required/>
                  </div>
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label> */}
                  <input type="name"
                    name="username"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Username"
                    required/>
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label> */}
                  <input type="phone"
                    name="phone"
                    id="phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Phone Number e.g 07xxxx"
                    required/>
                </div>
                <div>
                  {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label> */}
                  <input type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="E-mail e.g name@example.com"
                    required/>
                </div>
                <div className='relative'>
                  {/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label> */}
                  <input type={showPassword ? "text": "password"}
                    name="password" id="password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
                    <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center">{showPassword?<FaEye/>:<FaEyeSlash/>}</button>
                </div>
                <div className='relative'>
                  {/* <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label> */}
                  <input type={password ? "text": "password"}
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required/>
                    <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center">{password?<FaEye/>:<FaEyeSlash/>}</button>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <a href="/user/login" className="font-medium text-primary-600 hover:underline ">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </section>
      <Footer />
    </div>
  )
}

export default Register