import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ResetPin from './PinResetForm';
// import DashFooter from '../dash-components/DashFooter';
import { AiOutlineDelete } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";

function Accounts({banks, fetchBank}) {
    const [accounts, setAccounts] = useState([]);
    const [providers, setProviders] = useState('');
    const [accountNumbers, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [bank, setBank] = useState('');
    const [bankCode, setBankCode]= useState('')
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);
    const[allBanks,setAllBanks]= useState(banks)
    const [error, setError] = useState('');
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showResetPin, setShowResetPin] = useState(false); 
    const [resetPinEmail, setResetPinEmail] = useState('');
    const phonePattern = /^(07|01)\d{8}$/; 
    const formRef = useRef(null);

    useEffect(() => {
      fetchBank();
    }, [providers])
    
    useEffect(() => {
      setAllBanks(banks)
    }, [providers])
    

    // useEffect(() => {
    //     const otp = localStorage.getItem('otp');
    //     if (!otp) {
    //         window.location.replace('/org/dashboard/transact/accounts');
    //     } else {
    //         const timer = setTimeout(() => {
    //             localStorage.removeItem('otp');
    //             window.location.replace('/org/dashboard/transact/accounts');
    //         }, 5 * 60 * 1000); // 5 minutes
    //         return () => clearTimeout(timer);
    //     }
    // }, []);



    

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
        if (providers==='Bank' && !accountNumbers) {
            setError('Account Number is required')
            return;
        }
        if (!pin || !confirmPin) {
            setError('PIN is required.');
            return;
        }
        if(providers=== 'M-Pesa'){
            setBank(null)
            setBankCode(null)
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
                bank,
                bankCode,
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
            formRef.current.reset()
        } catch (error) {
            console.error('Error creating account:', error);
            setError('An error occurred while creating the account.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id)=> {
        const accessToken = localStorage.getItem('token');
        axios.delete(`/api/v1.0/orgaccounts/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setAccounts(accounts.filter(account => account.id !== id));
            toast.success('Account deleted successfully!');
        })
        .catch(error => {
            console.error('Error deleting account:', error);
            toast.error('An error occurred while deleting the account.');
        });
    }

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
    const handleBankChange = (event) => {
        const selectedBankCode = event.target.value;
        setBankCode(selectedBankCode);
        const selectedBank = allBanks.find(bank => bank.bank_code === selectedBankCode)?.bank_name;
        setBank(selectedBank);
    };

    // console.log(bank)
    // console.log(bankCode)
 
    return (
        <div className='main-page-container min-h-screen lg:h-fit px-5'>
               <div className="text-sm breadcrumbs mb-4">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li>
                    {/* <li><a href='/org/dashboard/accounts'>AccountAuth</a></li> */}
                    <li><a href='/org/dashboard/accounts'>Accounts</a></li>
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">Withdrawal Accounts</h2>
            <hr/>
            <div className='mx-auto w-full md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md  text-white'>
                <button onClick={() => setShowCreateAccount(true)} className='btn btn-ghost bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                    Create Account
                </button>
                {error && <p className='text-red-500 mt-4'>{error}</p>}
                <div className="accounts-list-section w-full">
                    <h1 className='text-2xl font-semibold mb-4 text-slate-600 '>Your Accounts</h1>
                    <div className='overflow-scroll'>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 text-sm'>Providers</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 text-sm'>Bank</th>                                  
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 text-sm'>Account Name</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 text-sm'>Account Number</th>
                                    <th className='border border-gray-300 px-2 py-1 text-gray-700 text-sm'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map((account) => (
                                    <tr key={account.id}>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 '>{account.providers}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 '>{account.bank}</td>                                     
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 '>{account.accountName}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 '>{account.accountNumber}</td>
                                        <td className='border border-gray-300 px-2 py-1 text-gray-700 '>
                                         <div className='flex flex-row gap-1'>
                                            <div>
                                                <button onClick={() => handleShowResetPin(account.email)} className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 w-full sm:w-auto'>
                                                    {/* Reset */}
                                                    <GrPowerReset/>
                                                </button>
                                            </div>                                            
                                            <div>
                                                <button onClick={()=> handleDelete(account.id)} className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                                    <AiOutlineDelete />
                                                </button>
                                            </div>
                                            

                                        </div>   
                                        
                                        
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
                    <div className="create-account-popup fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 py-4">
                        <div className='mx-auto lg:max-w-md md:max-w-full sm:max-w-full p-6 bg-white rounded-lg shadow-md text-white h-screen overflow-y-auto'>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-2xl font-semibold mb-4 text-slate-600 '>Create Account</h1>
                                </div>
                                <div>
                                    <button onClick={handleClosePopup}  className='hover:border rounded text-gray-800 text-2xl w-10 h-10 flex justify-center items-center'><IoMdCloseCircleOutline/></button>
                                </div>
                            </div>
                            
                            <div className='mb-6 flex items-center justify-center'>
                                <form onSubmit={handleSubmit} className='w-full' ref={formRef}>
                                {error && <p className='text-red-500 mt-4'>{error}</p>}
                                    <div className='mb-4'>
                                        <label htmlFor='providers' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Providers</label>
                                        <select value={providers} onChange={(e) => setProviders(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' required>
                                            <option value=''>Select Provider</option>
                                            <option value='M-Pesa'>M-Pesa</option>
                                            <option value='Bank'>Bank</option>
                                        </select>
                                        {/* <input type='text' value={providers} disabled onChange={(e) => setProviders(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' required /> */}
                                    </div>
                                    <div className='my-4'>
                                        {providers === 'Bank' ?
                                        (<>
                                            <label htmlFor='bank' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Bank</label>
                                            <select
                                                onChange={(e) => {
                                                    // setBank(e.target.value)
                                                    handleBankChange(e)
                                                    // setBankCode(e.target.options[e.target.selectedIndex].getAttribute('bank_code'))
                                                }}
                                                className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600'
                                                required>
                                                <option value="">Select Bank</option>
                                                {allBanks && allBanks.map((bank, index) => {
                                                    return (
                                                        <option
                                                            className='text-md'
                                                            value={bank.bank_code}
                                                            key={index}>{bank.bank_name}
                                                        </option>
                                                    )
                                                })}
                                            </select></>)
                                        : null}
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='accountName' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Account Name</label>
                                        <input type='text' value={accountName} onChange={(e) => setAccountName(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='eg John Doe, KCB account' required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='accountNumber' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Account Number</label>
                                        <input type='text' value={accountNumbers} onChange={(e) => setAccountNumber(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='eg 07xxx, 01xxx, 124......' required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='pin' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>PIN</label>
                                        <input type='password' value={pin} onChange={(e) => setPin(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='pin' maxLength={4} required />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='confirmPin' className='block mb-2 text-sm font-semibold text-slate-600 '><span className='text-red-500'>*</span>Confirm PIN</label>
                                        <input type='password' value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} className='block text-gray-700 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600' placeholder='confirm pin' maxLength={4} required />
                                    </div>
                                    <div>
                                        <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster position='top-center' reverseOrder={false} />
            {/* <DashFooter/> */}
        </div>
    );
}

export default Accounts;
