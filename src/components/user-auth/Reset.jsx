import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Menus from '../reusables/Menus';
import forgot_password from '../../assets/forgot-password-pana.png';
import Footer from '../reusables/Footer';


function Reset() {
const [email, setEmail] = useState('');
const [otp, setOtp] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [message, setMessage] = useState('');
const [step, setStep] = useState(1); 
const [showPassword,setShowPassword]=useState(false)
const [password,setPasswordConfirm ] = useState(false)

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?!.*\s).{8,}$/;



const handleSendOTP = async () => {
  try {
    await axios.post('https://appbackend.msaadafund.com/api/v1.0/forgot_password', { email });
    setMessage('OTP sent to your email');
    setStep(2);
  } catch (error) {
    setMessage(error.response.data.error);
  }
};

const handleResetPassword = async () => {
  try {
    // if the otp input field is empty, show an error message
    if (!otp) {
      setMessage('Please enter OTP ');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    if (!passwordPattern.test(newPassword)) {
      setMessage('Your password must contain at least one uppercase letter, one special character, one digit, and be at least 8 characters long. Please avoid using spaces.');
      return;
    }

    await axios.patch('https://appbackend.msaadafund.com/api/v1.0/reset_password', { email, otp, new_password: newPassword });
    // setMessage('Password reset successfully');
    toast.success("Password reset successfully");
    setTimeout(() => {
      window.location.href = '/user/login'; 
    },2000); 
  } catch (error) {
    setMessage(error.response.data.error);
  }
};

const handleGoToLogin = () => {
  window.location.href = '/user/login'; 
};

const handlePrevStep = () => {
  if (step === 1) {
    handleGoToLogin(); 
  } else {
    setStep(step - 1); 
  }
};

const handleNextStep = () => {
  setStep(step + 1);
};

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
      <Menus/>
        <div className="h-[100vh] items-center flex justify-center px-3 lg:px-0 my-10 bg-gray-50">
        <div className="max-w-screen-xl flex justify-center flex-1">
          <div className="flex-1 text-center hidden md:flex">
            <div
              className="w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${forgot_password})`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 p-6 sm:p-12">
            <div className=" flex flex-col items-center p-4 border shadow rounded-r-lg bg-white">
              <div className="text-center">
                <h1 className="text-xl xl:text-3xl font-extrabold text-blue-900">
                Reset Password
                </h1>
              </div>
              <div className="w-full flex-1 mt-8">            
                <div className="mx-auto max-w-md flex flex-col gap-4 ">     
                <div className="flex justify-between mb-4 font-medium">
                <button onClick={handlePrevStep}>
                  {step === 1 ? 'Back to Login' : 'Previous'}
                </button>
                {step < 2 && (
                  <button onClick={handleNextStep}>
                    Next
                  </button>
                )}
              </div>
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {step === 1 ? 'Enter Email' : 'Enter OTP and New Password'}
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="User email" required="" />
                  </div>
                ) : (
                  <div>
                    <div>
                    <label htmlFor="otp" className="block my-2 text-sm font-medium text-gray-900">OTP</label>
                    <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter OTP" />
                    </div>

                    <div className='relative'>
                    <label htmlFor="new-password" className="block my-2 text-sm font-medium text-gray-900">New Password</label>
                    <input type={showPassword ? "text" : "password" }
                      name="new-password" id="new-password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      pattern={passwordPattern} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                      placeholder="Password"
                      required/>
                      <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
                    </div>

                    <div className='relative'>
                    <label htmlFor="confirm-password" className="block my-2 text-sm font-medium text-gray-900">Confirm Password</label>
                    <input type={password ? "text" : "password" }
                    name="confirm-password" 
                    id="confirm-password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="Confirm Password"
                    required/>
                    <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{password ? <FaEye/> : <FaEyeSlash/>}</button>
                  </div>
                  </div>
                )}
                <button type="button" onClick={step === 1 ? handleSendOTP : handleResetPassword} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {step === 1 ? 'Send OTP' : 'Reset Password'}
                </button>
              </form>
              <p className="mt-2 text-sm text-center text-red-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </div>
    <Footer/>
    </div>
  );
}

export default Reset;

      // <section className="bg-gray-50">
      //   <div className="flex flex-col md:flex-row items-center justify-center px-6 py-6 mx-auto">
      //     <div className="md:w-1/2 flex justify-center md:justify-end">
      //       <img
      //         className="w-3/4 md:w-full lg:w-3/4 bg-contain bg-center bg-no-repeat"
      //         src={forgot_password}
      //         alt='forgot password image'
      //         loading='lazy'
      //       />
      //     </div>
      //     <div className="md:w-1/2 flex flex-col items-center justify-center px-6 py-6 mx-auto">
      //     <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 border">
      //     <div className="flex justify-between mb-4">
      //         <button onClick={handlePrevStep}>
      //           {step === 1 ? 'Back to Login' : 'Previous'}
      //         </button>
      //         {step < 2 && (
      //           <button onClick={handleNextStep}>
      //             Next
      //           </button>
      //         )}
      //       </div>
      //       <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
      //         {step === 1 ? 'Enter Email' : 'Enter OTP and New Password'}
      //       </h2>
      //       <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
      //         {step === 1 ? (
      //           <div>
      //             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
      //             <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
      //           </div>
      //         ) : (
      //           <div>
      //             <div>
      //             <label htmlFor="otp" className="block my-2 text-sm font-medium text-gray-900">OTP</label>
      //             <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter OTP" />
      //             </div>

      //             <div className='relative'>
      //             <label htmlFor="new-password" className="block my-2 text-sm font-medium text-gray-900">New Password</label>
      //             <input type={showPassword ? "text" : "password" }
      //               name="new-password" id="new-password" 
      //               value={newPassword} 
      //               onChange={(e) => setNewPassword(e.target.value)}
      //               pattern={passwordPattern} 
      //               className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
      //               placeholder="Password"
      //               required/>
      //               <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
      //             </div>

      //             <div className='relative'>
      //             <label htmlFor="confirm-password" className="block my-2 text-sm font-medium text-gray-900">Confirm Password</label>
      //             <input type={password ? "text" : "password" }
      //             name="confirm-password" 
      //             id="confirm-password" 
      //             value={confirmPassword} 
      //             onChange={(e) => setConfirmPassword(e.target.value)}
      //             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
      //             placeholder="Confirm Password"
      //             required/>
      //             <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{password ? <FaEye/> : <FaEyeSlash/>}</button>
      //           </div>
      //           </div>
      //         )}
      //         <button type="button" onClick={step === 1 ? handleSendOTP : handleResetPassword} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
      //           {step === 1 ? 'Send OTP' : 'Reset Password'}
      //         </button>
      //       </form>
      //       <p className="mt-2 text-sm text-center text-gray-500">{message}</p>
      //     </div>
      //     </div>
      //   </div>
      //   <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      // </section>
