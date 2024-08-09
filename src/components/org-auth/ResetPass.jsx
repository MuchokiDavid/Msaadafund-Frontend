import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import forgot_password from '../../assets/forgot-password-pana.png';
import { apiUrl, appKey } from '../../context/Utils';

function ResetPass() {
  const [email, setEmail] = useState('');
  const [otp, setOrgOtp] = useState('');
  const [newOrgPassword, setNewOrgPassword] = useState('');
  const [confirmOrgPassword, setConfirmOrgPassword] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); 
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false); // New loading state for step 2


  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?!.*\s).{8,}$/;
  const handleSendOrgOTP = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/v1.0/org_forgot_password`, {email},{
        headers:{
          'X-API-KEY': appKey
      }
      });
      setMessage("An OTP has been sent to your email address.");
      setStep(2);
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setLoading(false);
  };

  const handleResetOrgPassword = async () => {
    try {
      if (!otp) {
        setMessage('Please enter OTP ');
        return;
      }
      if (newOrgPassword !== confirmOrgPassword) {
        setMessage('Passwords do not match');
        return;
      }
      if (!passwordPattern.test(newOrgPassword)) {
        setMessage('Your password must contain at least one uppercase letter, one special character, one digit, and be at least 8 characters long. Please avoid using spaces.');
        return;
      }

      setResetLoading(true);
      await axios.patch(`${apiUrl}/api/v1.0/org_reset_password`, { email, otp, new_password: newOrgPassword},{
        headers:{
          'X-API-KEY': appKey
      }
      });
      toast.success("Password reset successfully");
      setTimeout(() => {
        window.location.href = '/org/login';
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.error);
    }
    setResetLoading(false);
  };

  const handleGoToLogin = () => {
    window.location.href = '/org/login'; 
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

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordConfirm(!password);
  };

  return (
    <div>
      <Menus />
      <div className="h-[100vh] items-center flex justify-center px-3 lg:px-0 my-10">
      <div className="max-w-screen-xl bg-white flex justify-center flex-1">
        <div className="flex-1 text-center hidden md:flex">
          <div
            className="w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${forgot_password})`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 p-6 sm:p-12">
          <div className=" flex flex-col items-center p-4 border shadow rounded-lg bg-white">
            <div className="text-center">
              <h1 className="text-xl xl:text-3xl font-extrabold text-blue-900">
              Reset Password
              </h1>
            </div>
            <div className="w-full flex-1 mt-8">            
              <div className="mx-auto max-w-md flex flex-col gap-4 ">     
              <div className="flex justify-between mb-4">
                <button onClick={handlePrevStep} className='hover:underline font-medium'>
                  {step === 1 ? 'Back to Login' : 'Previous'}
                </button>
                {step < 2 && (
                  <button onClick={handleNextStep} className='hover:underline font-medium'>
                    Next
                  </button>
                )}
              </div>
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                {step === 1 ? 'Email' : 'Enter OTP and New Password'}
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 min-w-full" onSubmit={(e) => e.preventDefault()}>
                {step === 1 ? (
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Organisation Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                  </div>
                ) : (
                  <div>
                    <div>
                      <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                    </div>
                    <div>
                      <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOrgOtp(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter OTP" required />
                    </div>
                    <div className='relative mt-2'>
                      <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                      <input type={showPassword ? "text" : "password"} name="new-password" id="new-password" value={newOrgPassword} onChange={(e) => setNewOrgPassword(e.target.value)} pattern={passwordPattern} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Password" required />
                      <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
                    <div className='relative mt-2'>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                      <input type={password ? "text" : "password"} name="confirm-password" id="confirm-password" value={confirmOrgPassword} onChange={(e) => setConfirmOrgPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Confirm Password" required />
                      <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{password ? <FaEye /> : <FaEyeSlash />}</button>
                    </div>
                  </div>
                )}
                     <button type="button" onClick={step === 1 ? handleSendOrgOTP : handleResetOrgPassword} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      {step === 1 ? (
                        loading ? (
                          <>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                              10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Sending OTP...
                          </>
                        ) : (
                          "Send OTP"
                        )
                      ) : (
                        resetLoading ? (
                          <>
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505
                              10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            Resetting Password
                          </>
                        ) : (
                          "Reset Password"
                        )
                      )}
                    </button>
              </form>
              <p className="mt-2 text-sm text-center text-red-500 ">{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </div>
    <Footer />
    </div>
  );
}

export default ResetPass;


// {/* 
//       <div className="bg-gray-50 min-h-screen flex justify-center items-center mt-1">
//         <div className="flex flex-col md:flex-row items-center justify-center px-6 py-6 mx-auto">
//           <div className="sm:hidden md:block w-full lg:w-1/2 flex justify-center md:justify-end">
//             <img
//               className="w-3/4 md:w-full lg:w-3/4 bg-contain bg-center bg-no-repeat"
//               src={forgot_password}
//               alt='forgot password image'
//               // loading='lazy'
//             />
//           </div>
//           <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 mx-auto">
//             <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8 border">
//               <div className="flex justify-between mb-4">
//                 <button onClick={handlePrevStep} className='hover:underline'>
//                   {step === 1 ? 'Back to Login' : 'Previous'}
//                 </button>
//                 {step < 2 && (
//                   <button onClick={handleNextStep} className='hover:underline'>
//                     Next
//                   </button>
//                 )}
//               </div>
//               <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
//                 {step === 1 ? 'Email' : 'Enter OTP and New Password'}
//               </h2>
//               <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
//                 {step === 1 ? (
//                   <div>
//                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Organisation Email</label>
//                     <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
//                   </div>
//                 ) : (
//                   <div>
//                     <div>
//                       <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
//                     </div>
//                     <div>
//                       <input type="text" name="otp" id="otp" value={otp} onChange={(e) => setOrgOtp(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter OTP" required />
//                     </div>
//                     <div className='relative mt-2'>
//                       <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
//                       <input type={showPassword ? "text" : "password"} name="new-password" id="new-password" value={newOrgPassword} onChange={(e) => setNewOrgPassword(e.target.value)} pattern={passwordPattern} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" required />
//                       <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{showPassword ? <FaEye /> : <FaEyeSlash />}</button>
//                     </div>
//                     <div className='relative mt-2'>
//                       <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
//                       <input type={password ? "text" : "password"} name="confirm-password" id="confirm-password" value={confirmOrgPassword} onChange={(e) => setConfirmOrgPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="password" required />
//                       <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{password ? <FaEye /> : <FaEyeSlash />}</button>
//                     </div>
//                   </div>
//                 )}
//                 <button type="button" onClick={step === 1 ? handleSendOrgOTP : handleResetOrgPassword} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//                   {step === 1 ? 'Send OTP' : 'Reset Password'}
//                 </button>
//               </form>
//               <p className="mt-2 text-sm text-center text-red-500 ">{message}</p>
//             </div>
//           </div>
//         </div>
//         <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
//       </div> */}
