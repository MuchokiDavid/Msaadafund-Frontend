import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'


function AccountAuth() {
    const [step, setStep] = useState(1); 
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')


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
            window.location.replace('/org/dashboard/transact/accountset')
            localStorage.setItem('otp', res.data.otp);
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

        // useEffect to delete OTP from local storage after 5 minutes
    useEffect(() => {
        const deleteOtpAfterTime = setTimeout(() => {
        localStorage.removeItem('otp');
        }, 5 * 60 * 1000); // 5 minutes
        return () => clearTimeout(deleteOtpAfterTime);
    }, []);

  return (
    <div>
        <div className="text-md breadcrumbs mb-4">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>AccountAuth</a></li>
            </ul>
            <h2 className="mt-3 text-2xl font-bold leading-tight ">Accounts Authentication</h2>
            <hr className='mb-4'/>
            <div className="container mx-auto h-screen lg:h-fit lg:px-16">
                {message && <div className='text-green-500'>{message}</div>}
                {error && <div className="text-red-500">{error}</div>}
            <div className='w-1/2 flex justify-between mt-4'>
              <button className='text-black' onClick={handlePrevStep}>
                {step === 1 ? '' : 'Previous'}
              </button>
              {step < 2 && (
                <button className='bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring' onClick={handleNextStep}>
                  Next
                </button>
              )}
            </div>
                <form className="mt-4"  onSubmit={(e) => e.preventDefault()}>
                    {step === 1 ? (
                    <div >
                        <label className="block text-black  font-medium">Email Address</label>
                        <input 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=' Enter Organisation Email Address' 
                        className="w-1/2 mt-1 p-2 border bg-white text-black border-gray-300 rounded-md"
                        />
                    </div>
                    ):
                    <div>
                        <div>
                        <label className="block text-black  font-medium">Email Address</label>
                            <input
                            type='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=' Enter Organisation Email Address' 
                            className="w-1/2 mt-1 p-2 border bg-white text-black border-gray-300 rounded-md"
                            />
                        </div>
                        <div className='mt-4'>
                        <label className="block text-black  font-medium">OTP</label>
                            <input type="text" 
                            name="otp" id="otp" 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-1/2 mt-1 p-2 border bg-white text-black border-gray-300 rounded-md"
                            />                  
                            </div>
                    </div> 
                    }
                    <button onClick={step === 1 ? handleSendOtp : handleConfirmOtp}
                    className="mt-6 inline-block rounded bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring"
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