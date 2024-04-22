import React, {useState} from 'react'
import axios from 'axios';
import logo from '../../assets/msaadaBlacklogo.png';
import toast, { Toaster } from 'react-hot-toast'
import Menus from '../reusables/Menus';
import Footer from '../reusables/Footer';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

function ResetPass() {
const [email, setEmail] =useState('');
const [otp, setOrgOtp] =useState('');
const [newOrgPassword, setNewOrgPassword] = useState('');
const [confirmOrgPassword, setConfirmOrgPassword] = useState('');
const [message, setMessage] = useState('');
const [step, setStep] = useState(1); 
const [showPassword,setShowPassword]=useState(false)
const [password,setPasswordConfirm ] = useState(false)

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


const handleSendOrgOTP = async () => {
  try{
    await axios.post('/api/v1.0/org_forgot_password', {email});
    setMessage("An OTP has been sent to your email address.");
    setStep(2)
  }catch (error){
      setMessage(error.response.data.error);
  }
};

const handleResetOrgPassword = async () => {
  try {
    // if the otp input field is empty, show an error message
    if (!otp) {
    setMessage('Please enter OTP ');
    return;
  }
    if (newOrgPassword !== confirmOrgPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (!passwordPattern.test(newOrgPassword)) {
      setMessage('Please ensure your password has atleast one lowercase letter, one uppercase letter,one character(!,@,#,$,%,^,&,*), one digit, and a total length of at least 8 characters')
      return;
    }
 

    await axios.patch("/api/v1.0/org_reset_password", { email, otp, new_password: newOrgPassword });
    // setMessage('Password reset successfully')
    toast.success("Password reset successfully");
    setTimeout(() => {
      window.location.href = '/org/login';
    }, 2000);
  } catch (error) {
    setMessage(error.response.data.error);
  }
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
      <section className="bg-gray-50 h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            {/* <img className="w-18 h-12 mr-2" src={logo} alt="logo" /> */}
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
            <div className="flex justify-between mb-4">
              <button onClick={handlePrevStep} className='hover:underline'>
                {step === 1 ? 'Back to Login' : 'Previous'}
              </button>
              {step < 2 && (
                <button onClick={handleNextStep} className='hover:underline'>
                  Next
                </button>
              )}
            </div>
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {step === 1 ? 'Enter Email' : 'Enter OTP and New Password'}
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
              {step === 1 ? (
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Organisation Email</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                </div>
              ) : (
                <div>
                  <div>
                     <label htmlFor="otp" 
                     className="block mb-2 text-sm font-medium text-gray-900 ">
                      OTP
                      </label>
                  </div>

                  <div>
                    <input type="text" 
                    name="otp" 
                    id="otp" 
                    value={otp} 
                    onChange={(e) => setOrgOtp(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="Enter OTP" 
                    required/>
                  </div>

                  <div className='relative mt-2'>
                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                    <input type={showPassword ? "text" : "password" }
                    name="new-password" id="new-password" 
                    value={newOrgPassword} 
                    onChange={(e) => setNewOrgPassword(e.target.value)}
                     pattern={passwordPattern} 
                     className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                     placeholder="••••••••" 
                     required/>
                      <button title='show password' onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{showPassword ? <FaEye/> : <FaEyeSlash/>}</button>
                  </div>

                  <div className='relative mt-2'>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                    <input type={password ? "text": "password" }
                    name="confirm-password" 
                    id="confirm-password" value={confirmOrgPassword} 
                    onChange={(e) => setConfirmOrgPassword(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="••••••••" 
                    required/>
                    <button title='show password' onClick={togglePasswordVisibility} className="absolute inset-y-0 right-2 flex items-center mt-6 ">{password ? <FaEye/> : <FaEyeSlash/>}</button>
                  </div>
                </div>

              )}
              <button type="button" onClick={step === 1 ? handleSendOrgOTP : handleResetOrgPassword} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {step === 1 ? 'Send OTP' : 'Reset Password'}
              </button>
            </form>
            <p className="mt-2 text-sm text-center text-red-500 ">{message}</p>
          </div>
        </div>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </section>
      <Footer/>
    </div>
  );
}

export default ResetPass