import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Menus from '../reusables/Menus';

function Reset() {
const [email, setEmail] = useState('');
const [otp, setOtp] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [message, setMessage] = useState('');
const [step, setStep] = useState(1); 
const [showPassword,setShowPassword]=useState(false)
const [password,setPasswordConfirm ] = useState(false)

const passwordPattern = /^[A-Za-z0-9]{8,}$/;


const handleSendOTP = async () => {
  try {
    await axios.post('/api/v1.0/forgot_password', { email });
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
      setMessage('Please ensure your password has atleast one letter, one digit, and a total length of at least 8 characters')
      return;
    }

    await axios.patch('/api/v1.0/reset_password', { email, otp, new_password: newPassword });
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
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            {/* <img className="w-18 h-12 mr-2" src={logo} alt="logo" /> */}
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow border md:mt-0 sm:max-w-md sm:p-8">
            <div className="flex justify-between mb-4">
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
                  <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                </div>
              ) : (
                <div>
                  <div>
                  <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                  <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter OTP" />
                  </div>

                  <div className='relative'>
                  <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
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
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
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
            <p className="mt-2 text-sm text-center text-gray-500">{message}</p>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </section>
    </div>
  );
}

export default Reset;

