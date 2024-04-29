import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ResetPin from './PinResetForm';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [providers, setProviders] = useState('');
    const [accountNumbers, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showResetPin, setShowResetPin] = useState(false); 
    const [resetPinEmail, setResetPinEmail] = useState('');
    const phonePattern = /^(07|01)\d{8}$/; 
    const formRef = useRef(null);

    useEffect(() => {
        const otp = localStorage.getItem('otp');
        if (!otp) {
            window.location.replace('/org/dashboard/transact/accounts');
        } else {
            const timer = setTimeout(() => {
                localStorage.removeItem('otp');
                window.location.replace('/org/dashboard/transact/accounts');
            }, 5 * 60 * 1000); // 5 minutes
            return () => clearTimeout(timer);
        }
    }, []);



    

    useEffect(() => {
        fetchAccounts();
    }, []);

   
    const fetchAccounts = async () => {
        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                window.location.replace('/org/login')
            }

            const response = await axios.get('/api/v1.0/accounts', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        let accountNumber //variable to hold formatted account number
        if (pin !== confirmPin) {
            setError('PINs do not match.');
            return;
        }
        if (providers==='M-Pesa' && !accountNumbers.match(phonePattern)) {
            setError('Invalid Account Number')
            return;
        }
    
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('token');
            if (!accessToken) {
                window.location.replace('/org/login')
                setLoading(false);
                return;
            }
            if(providers==='M-Pesa'){
                let phoneNo = accountNumbers.replace(/^0+/, '');
                accountNumber = "254" + phoneNo;
            }
            else if(providers==='Bank'){
                accountNumber = accountNumbers;
            }
            
            const response = await axios.post('/api/v1.0/accounts', {
                providers,
                accountName,
                accountNumber,
                pin,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setAccounts([...accounts, response.data]);
            toast.success('Account created successfully!');
            setProviders('');
            setAccountNumber('');
            setPin('');
            setConfirmPin('');
            setError('');
            setShowCreateAccount(false);
            fetchAccounts();
            formRef.current.reset()
        } catch (error) {
            console.error('Error creating account:', error);
            setError('An error occurred while creating the account.');
        } finally {
            setLoading(false);
        }
    };

    const handleShowResetPin = (email) => {
        setResetPinEmail(email); 
        setShowResetPin(true); 
    };

    const handleClosePopup = () => {
        setShowCreateAccount(false);
        setError('');
    };

    const handleCloseResetPin = () => {
        setShowResetPin(false); // Resetting the showResetPin state
        setResetPinEmail(''); 
    };
 
    return (
        <div className='main-page-container h-screen lg:h-fit px-5'>
               <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    <li><a href='/org/dashboard/accounts'>AccountAuth</a></li>
                    <li><a href='/org/dashboard/accountset'>Accounts</a></li>
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">Withdraw Accounts</h2>
            <hr className='mb-4'/>
            <div className='mx-auto lg:max-w-screen-lg md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-white sm:w-screen'>
                <button onClick={() => setShowCreateAccount(true)} className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                    Create Account
                </button>
                {error && <p className='text-red-500 mt-4'>{error}</p>}
                <div className="accounts-list-section w-full">
                    <h1 className='text-2xl font-semibold mb-4 text-slate-600 dark:text-slate-300 '>Your Accounts</h1>
                    <div className='overflow-scroll'>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr className='bg-gray-100 dark:bg-gray-700'>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300 text-sm'>Providers</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300 text-sm'>Account Name</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300 text-sm'>Account Number</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300 text-sm'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account.id}>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300'>{account.providers}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300'>{account.accountName}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300'>{account.accountNumber}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 dark:text-slate-300'>
                                        <button onClick={() => handleShowResetPin(account.email)} className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 w-full sm:w-auto'>
                                            Reset PIN
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                {showResetPin && (
                    <div className="reset-pin-popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <ResetPin email={resetPinEmail} onClose={handleCloseResetPin} />
                    </div>
                )}
                {showCreateAccount && (
                    // Create Account Popup JSX
                    <div className="create-account-popup fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className='mx-auto lg:max-w-md md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 text-white'>
                            <h1 className='text-2xl font-semibold mb-4 text-slate-600 dark:text-slate-300'>Create Account</h1>
                            <div className='mb-6 flex items-center justify-center'>
                                <form onSubmit={handleSubmit} className='w-full' ref={formRef}>
                                {error && <p className='text-red-500 mt-4'>{error}</p>}
                                    <div className='mb-4'>
                                        <label htmlFor='providers' className='block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300'>Providers</label>
                                        <select value={providers} onChange={(e) => setProviders(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' required>
                                            <option value=''>Select Provider</option>
                                            <option value='M-Pesa'>M-Pesa</option>
                                            <option value='Bank'>Bank</option>
                                        </select>
                                        {/* <input type='text' value={providers} disabled onChange={(e) => setProviders(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' required /> */}
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='accountName' className='block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300'>Account Name</label>
                                        <input type='text' value={accountName} onChange={(e) => setAccountName(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' placeholder='eg John Doe, KCB account' required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='accountNumber' className='block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300'>Account Number</label>
                                        <input type='text' value={accountNumbers} onChange={(e) => setAccountNumber(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' placeholder='eg 07xxx, 01xxx, 124......' required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='pin' className='block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300'>PIN</label>
                                        <input type='password' value={pin} onChange={(e) => setPin(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' placeholder='pin' maxLength={4} required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='confirmPin' className='block mb-2 text-sm font-semibold text-slate-600 dark:text-slate-300'>Confirm PIN</label>
                                        <input type='password' value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} className='block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600' placeholder='confirm pin' maxLength={4} required />
                                    </div>
                                    <div>
                                        <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                            {loading ? 'Creating...' : 'Create'}
                                        </button>
                                        <button onClick={handleClosePopup}  className='bg-gray-700 hover:bg-gray-800 text-white font-bold ml-28 py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </div>
    );
}

export default Accounts;
