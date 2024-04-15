import React, { useState } from 'react'
import Menus from '../reusables/Menus'
import Footer from '../reusables/Footer'
import toast, { Toaster } from 'react-hot-toast'

function OrgSignUp() {
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const passwordPattern = /^(?=.*[a-zA-Z!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8}$/
  const phonePattern = /^(07|01)\d{8}$/;

  const clearState = () => {
    setUserName("")
    setEmail("")
    setPhoneNumber("")
    setAddress("")
    setUserPassword("")
    setConfirmPassword("")
    setMessage("")
    setErrors("")
  }

  function handleSubmit(e) {
    e.preventDefault();
    // const formData= 
    if (!userPassword.match(passwordPattern)) {
      setErrors('Password must be exactly 8 characters long and contain at least one number and one character (letter or special character)')
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
              setMessage(data.message)
              toast.success("Account created successifully")
              // window.location="/login"
              clearState()
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
                Create an Organisation account
              </h1>
              {errors && <p className='text-red-500'>{errors}</p>}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                  <input type="name"
                    name="name"
                    id="company_name"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Organisation Name"
                    required="" />
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                  <input type="phone"
                    name="phone"
                    id="org_phone"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Phone Number e.g 07xxxx"
                    required="" />
                </div>
                <div>
                  {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                  <input type="email"
                    name="email"
                    id="org_email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="E-mail e.g name@company.com"
                    required="" />
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                  <input type="address"
                    name="address"
                    id="org_address"
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Address"
                    required="" />
                </div>
                <div>
                  {/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> */}
                  <input type="password"
                    name="password" id="org_password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="" />
                </div>
                <div>
                  {/* <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label> */}
                  <input type="password"
                    name="confirm_password"
                    id="org_confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="" />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="/org/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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