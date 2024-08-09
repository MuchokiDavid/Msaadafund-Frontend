import React, { useState } from 'react'
import Menus from '../reusables/Menus'
import Footer from '../reusables/Footer'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import login_pic from '../../assets/signup.svg'
import Googleauth from './Googleauth'
import { apiUrl } from '../../context/Utils'

function Register() {
  const [errors, setErrors] = useState("")
  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?!.*\s).{8,}$/;
  const phonePattern = /^(07|01)\d{8}$/;
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false)
  const [password,setPasswordConfirm ] = useState(false)
  const [policy, setPolicy]= useState(false)
  const [loading, setLoading]= useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    // const formData= 
    if (!userPassword.match(passwordPattern)) {
      setLoading(false)
      setErrors('Your password must contain at least one uppercase letter, one special character, one digit, and be at least 8 characters long. Please avoid using spaces.');
    }
    else if (!phoneNumber.match(phonePattern)) {
      setLoading(false)
      setErrors('Invalid Phone Number')
    }
    else {
      if (userPassword === confirmPassword) {
        let phoneNo = phoneNumber.replace(/^0+/, '');
        let formattedPhoneNumber = "254" + phoneNo;
        fetch(`${apiUrl}/api/v1.0/auth/user/register`, {
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
              setLoading(false)
              toast.success("User registered successifully")
              setTimeout(() => {
                navigate('/user/login')
              }, 2000);
            }
            if (data.error) {
              setLoading(false)
              toast.error(data.error)
              setErrors(data.error)
            } 
          })
          .catch((err) => { 
            setLoading(false)
            setErrors(err) 
          });
      } else {
        setLoading(false)
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
  const handlePolicy=()=>{
    setPolicy(!policy)
  }

  return (
    <div>
      <Menus />
      <div className="h-fit items-center flex justify-center px-3 lg:px-0 mt-1 bg-gray-50">
      <div className="max-w-screen-xl flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${login_pic})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 p-4">
          <div className=" flex flex-col items-center p-4 shadow rounded-lg border bg-white">
            <div className="text-center">
              <h1 className="text-xl xl:text-3xl font-extrabold text-blue-900">
              Supporter Sign up
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">            
              <div className="mx-auto max-w-md flex flex-col gap-4 "> 
              {errors && <p className='text-red-500'>{errors}</p>}             
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900">First Name</label> */}
                    <input type="name"
                      name="firstname"
                      id="firstname"
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
                <div className='flex items-center'>
                  <input type="checkbox" id="policy" name="policy" value="policy"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded "
                    onClick={handlePolicy}
                    required/>
                  <label for="policy" className="ml-2 block text-sm text-gray-900 ">
                    I agree to the <a href="/privacy" className="font-medium text-primary-600 hover:underline ">Privacy Policy</a> and <a href='/terms' className="font-medium text-primary-600 hover:underline">Terms of Service</a>
                  </label>
                  </div>
                  {loading ? <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                      10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading...
                    </button>:<button type="submit" disabled={!policy} className={`w-full text-white ${policy ? 'bg-primary-600':'bg-gray-600'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>Create account</button>}
                  {/* <button type="submit" disabled={!policy} className={`w-full text-white ${policy ? 'bg-primary-600':'bg-gray-600'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>Create an account</button> */}
                <Googleauth/>
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <a href="/user/login" className="font-medium text-primary-600 hover:underline ">Login here</a>
                </p>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster toastOptions={{ duration: 2000, position: 'top-center' }} />
    </div>
    <Footer />
    </div>
  )
}

export default Register