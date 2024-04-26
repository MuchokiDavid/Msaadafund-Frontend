import { useNavigate } from 'react-router-dom';
import React,{useState} from 'react'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'


function AccountAuth() {
    const [step, setStep] = useState(1); 
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')

    const navigate = useNavigate();

    // handle receiving otp
    const handleSendOtp = ()=>{
        // handle authorization
        const accessToken = localStorage.getItem('token');
        const org = localStorage.getItem('org');

        if (!accessToken) {
            window.location.replace('org/login')
            return;
        }
        if (!org) {
            window.location.replace('org/login')
            return null;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        // handle post 
        axios.post('/api/v1.0/account_pin',{email},config)
        .then ((res)=>{
            setStep(2)
            toast.success('OTP sent successfully,Please check Your Email')
            console.log(res)
            setError('')
        })
        .catch((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setError(errorMsg);
        })

    }

    const handleConfirmOtp = ()=>{
        // handle authorization
        const accessToken = localStorage.getItem('token');
        const org = localStorage.getItem('org');

        if (!accessToken) {
            window.location.replace('org/login')
            return;
        }
        if (!org) {
            window.location.replace('org/login')
            return null;
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
        // handle patch for otp
        axios.patch('/api/v1.0/confirm_account_pin', {otp,email}, config)
        .then ((res)=>{
            setMessage('OTP confirmed successfully')
            window.location.replace('/org/dashboard/accountset')
            console.log(res)
            setError('')
        })
        .catch((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setError(errorMsg);

        })
    }

    const handlePrevStep = () => {
        if (step === 1) {
        } else {
          setStep(step - 1); 
        }
      };
      const handleNextStep = () => {
        setStep(step + 1);
      };

  return (
    <div>
        <div className="text-md breadcrumbs mb-4">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a href='/org/dashboard/accounts'>AccountAuth</a></li>
            </ul>
            <div>
                {message && <div className='text-green-500'>{message}</div>}
                {error && <div className="text-red-500">{error}</div>}
            <div className="mt-4">
              <button onClick={handlePrevStep}>
                {step === 1 ? 'Enter Org Email' : 'Previous'}
              </button>
              {step < 2 && (
                <button onClick={handleNextStep}>
                  Next
                </button>
              )}
            </div>
                <form className="mt-4 bg-white"  onSubmit={(e) => e.preventDefault()}>
                    {step === 1 ? (
                    <div>
                        <label>Email Address</label>
                        <input 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=' Enter Organisation Email Address' 
                        className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white " 
                        />
                    </div>
                    ):
                    <div>
                        <div>
                            <label>Email Address</label>
                            <input
                            type='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=' Enter Organisation Email Address' 
                            className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white " 
                            />
                        </div>
                        <div>
                            <label>OTP</label>
                            <input type="text" 
                            name="otp" id="otp" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)}
                            className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                            />                  
                            </div>
                    </div> 
                    }
                    <button onClick={step === 1 ? handleSendOtp : handleConfirmOtp}
                    className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                    {step === 1 ? 'Send Otp' : 'Confirm Otp'}
                    </button>

                    </form>
                    
                <Toaster position='top-right' reverseOrder={false}/>
            </div>
        </div>
    </div>
  )
}

export default AccountAuth