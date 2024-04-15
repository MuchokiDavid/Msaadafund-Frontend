import React, { useState } from 'react'
import Menus from '../reusables/Menus'
import Footer from '../reusables/Footer'
import toast, { Toaster } from 'react-hot-toast'

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

  return (
    <div>
      <Menus />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-18 h-12 mr-2" src ={logo} alt="logo"/> 
            </a> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              {errors && <p className='text-red-500'>{errors}</p>}
              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label> */}
                    <input type="name"
                      name="firstname"
                      id="username"
                      onChange={(e) => { setFirstName(e.target.value) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      required="" />
                  </div>
                  <div>
                    {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label> */}
                    <input type="name"
                      name="lastname"
                      id="lastname"
                      onChange={(e) => { setLastName(e.target.value) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
                      required="" />
                  </div>
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                  <input type="name"
                    name="username"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    required="" />
                </div>
                <div>
                  {/* <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label> */}
                  <input type="phone"
                    name="phone"
                    id="phone"
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
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="E-mail e.g name@example.com"
                    required="" />
                </div>
                <div>
                  {/* <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label> */}
                  <input type="password"
                    name="password" id="password"
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="" />
                </div>
                <div>
                  {/* <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label> */}
                  <input type="password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="" />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="/user/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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