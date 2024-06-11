import React, { useState } from 'react'
import Menus from '../reusables/Menus'
import Footer from '../reusables/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function OrgSignUp() {
  // const [message, setMessage] = useState("")
  const [errors, setErrors] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const phonePattern = /^(07|01)\d{8}$/;
  const navigate= useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [password,setPasswordConfirm ] = useState(false)
  const [policy,setPolicy] = useState(false)

  const clearState = () => {
    setUserName("")
    setEmail("")
    setPhoneNumber("")
    setAddress("")
    setUserPassword("")
    setConfirmPassword("")
    // setMessage("")
    setErrors("")
  }

  function handleSubmit(e) {
    e.preventDefault();
    // const formData= 
    if (!userPassword.match(passwordPattern)) {
      setErrors('Your password should have atleast one letter, one special character, one digit, and a total length of at least 8 characters')
    }
    else if (!phoneNumber.match(phonePattern)) {
      setErrors('Invalid Phone Number')
    }
    else {
      if (userPassword === confirmPassword) {
        let phoneNo = phoneNumber.replace(/^0+/, '');
        let formattedPhoneNumber = "254" + phoneNo;
        fetch('/api/v1.0/auth/organisation/register', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            email: email,
            phoneNumber: formattedPhoneNumber,
            address: address,
            password: userPassword
          })
        }).then((res) => res.json())
          .catch((err) => { console.log(err) })
          .then((data) => {
            // console.log(data.message);
            if(data.message){
              // setMessage(data.message)
              toast.success("Account created successifully")
              // window.location="/login"
              clearState()
              setTimeout(() => {
                navigate('/org/login')
              }, 2000);
            }
            if (data.error) {
              setErrors(data.error)
            } 
          });
      } else {
        setErrors('Passwords does not match')
      }
    };
  }

  const togglePassword=(e)=>{
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirm=(e)=>{
    e.preventDefault()
    setPasswordConfirm(!password)
  }

  // handle policy button
  const handlePolicy=()=>{
    setPolicy(!policy)
  }

  return (
    <div>
      <Menus/>
      <section className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                <img className="w-18 h-12 mr-2" src ={logo} alt="logo"/> 
            </a> */}
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an Organiser account to start creating fundraisers
              </h1>
              {errors && <p className='text-red-500'>{errors}</p>}
              {/* {message && <p className='text-lime-500'>{message}</p>} */}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label> */}
                  <input type="name"
                    name="name"
                    id="company_name"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Organisation Name"
                    required/>
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label> */}
                  <input type="phone"
                    name="phone"
                    id="org_phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Phone Number e.g 07xxxx"
                    required/>
                </div>
                <div>
                  {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label> */}
                  <input type="email"
                    name="email"
                    id="org_email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="E-mail e.g name@company.com"
                    required/>
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label> */}
                  <input type="address"
                    name="address"
                    id="org_address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Address"
                    required/>
                </div>
                <div className='relative'>
                  <input type={showPassword ? "text":"password"}
                    name="password" id="org_password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required/>
                    <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center">{showPassword?<FaEye/>:<FaEyeSlash/>}</button>
                </div>
                <div className='relative'>
                  <input type={password ? "text" : "password"}
                    name="confirm_password"
                    id="org_confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required/>
                    <button title='show password' onClick={togglePasswordConfirm} className="absolute inset-y-0 right-2 flex items-center">{password?<FaEye/>:<FaEyeSlash/>}</button>
                </div>
                <div className='flex items-center'>
                  <input type="checkbox" id="policy" name="policy" value="policy"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded "
                    onClick={handlePolicy}
                    required/>
                  <label for="policy" className="ml-2 block text-sm text-gray-900 ">
                    I agree to the <a href="/privacy" className="font-medium text-primary-600 hover:underline ">Privacy Policy</a> and <a href='/terms' className="font-medium text-primary-600 hover:underline">Terms of Service</a>
                  </label>
                </div>
                    <button type="submit" disabled={!policy} className={`w-full text-white ${policy?'bg-primary-700':'bg-gray-400'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>Create an account</button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account? <a href="/org/login" className="font-medium text-primary-600 hover:underline ">Log in here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <Toaster toastOptions={{ duration: 2000, position: 'top-center' }} />
      </section>
      <Footer/>
    </div>
  )
}

export default OrgSignUp