import React, { useEffect, useState} from 'react'
import Swal from 'sweetalert2';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
// import DashFooter from '../dash-components/DashFooter';

function Withdraw({ allCampaigns, campaignError, handleWallet }) {
    const [accountNumbers, setAccountNumbers] = useState([])
    const [campaigns, setCampaigns] = useState(allCampaigns)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem('token')
    const org= localStorage.getItem('org')

    const [providers, setProviders] = useState('')
    const [amount, setAmount] = useState()
    const [accountNumber, setAccountNumber] = useState('')
    const [campaign, setCampaign] = useState('')
    const [pin, setPin] = useState('')
    const [withdrawForm, setWithdrawForm] = useState(false)
    const [walletDetails, setWalletDetails] = useState()
    const [transactionResponse, setTransactionResponse] = useState([])
    const [bank, setBank] = useState('')
    const [popupErrors, setPopupErrors] = useState(null)
    const [passswordShow,setPasswordShow] = useState("")
    const [isSubmitting, setIsSubmitting]= useState(false)

    // const formRef = useRef(null);
    const phoneRegex = /^254\d{9}$/

    useEffect(() => {
        setCampaigns(allCampaigns)
    }, [allCampaigns, token])

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await fetch('https://appbackend.msaadafund.com/api/v1.0/accounts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setLoading(false)
                    setAccountNumbers(data);
                } else {
                    setLoading(true)
                    throw new Error(data);
                }
            } catch (error) {
                setLoading(true)
                setErrors('Accounts not found, ensure you have created account', error);
            }
        };

        handleFetch()
    }, [token, handleWallet])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (campaign === '') {
                    setErrors('Please select a campaign');
                } else {
                    setErrors(null);
                    const walletDetail = await handleWallet(campaign);
                    setWalletDetails(walletDetail);
                }
            } catch (error) {
                console.error('Error fetching wallet details:', error);
                setErrors('Error in fetching wallet details');
            }
        };

        fetchData();

    }, [campaign,providers,handleWallet]);


    useEffect(() => {
        if (campaignError) {
            setErrors(campaignError)
        }
    }, [campaignError, token])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (campaign === '') {
            setErrors('Please select a campaign')
        }
        else if (providers === "M-Pesa" && parseInt(amount) < 10) {
            setErrors('Amount should be greater than Sh.10')
        }
        else if (providers === "Bank" && parseInt(amount) < 100) {
            setErrors('Amount should be greater than Sh.100')
        }
        else if (accountNumber === '') {
            setErrors('Please select an account number')
        }
        else if (providers === 'Bank' && bank === '') {
            setErrors('Please select a bank')
        }
        else if (providers === 'M-Pesa' && !accountNumber.match(phoneRegex)) {
            setErrors('Please select a valid account')
        }
        else {
            setPin('')
            setPopupErrors('')
            setWithdrawForm(true)
        }

    }

    function handleWithdraw(e) {
        e.preventDefault();
        try{
            setIsSubmitting(true)
            setErrors(null)
            fetch('https://appbackend.msaadafund.com/api/v1.0/withdraw', {
                method: "POST",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    campaign: campaign,
                    amount: amount,
                    accountNumber: accountNumber,
                    providers: providers,
                    pin: pin,
                    bank_code: bank
                })
            }).then((res) => res.json())
            .catch((err) => { console.log(err); setIsSubmitting(false)})
            .then((data) => {
                if(data.message){
                    setTransactionResponse(data.message)                    
                    //Swal
                    Swal.fire({
                        title: 'Success',
                        text: data.message,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                        })
                    setWithdrawForm(false)
                    setWalletDetails()
                    setIsSubmitting(false)
                    setAmount('')
                    setAccountNumber('')
                    setCampaign('')
                    setWithdrawForm(false)
                }
                if (data.error) {
                    setPopupErrors(data.error)
                } 
            });
        }
        catch(error){
            setLoading(false)
            setErrors('Error in withdrawing funds', error);
        }
    //     finally{
    //         setLoading(false)
    //     //     formRef.current.reset();
    //     //     setAccountNumber('')
    //     //     setAmount('')
    //     //     setCampaign('')
    //     //     setPin('')
    //     // }
    }

if (!token && !org) {
    window.location.replace("/org/login")
}

if (loading) {
    return(<div className='flex justify-center'>...</div>)
}
// console.log(walletDetails)
// console.log(campaigns)
// console.log(transactionResponse)
// console.log(accountNumber)
// console.log(accountNumbers)
// console.log(bank)
// console.log(providers)

const handlePasswordEye = ((e)=>{
    e.preventDefault()
    setPasswordShow(!passswordShow)

})

return (
    <div>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a href='/org/dashboard/transact/withdraw'>Withdraw</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Withdraw</h1>
            <hr className='mb-2' />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border rounded-lg p-6">
                <form >                    
                    {walletDetails ?
                        <div className="stats border">
                            <div className="stat bg-white text-gray-800">
                                <div className="stat-title text-gray-700">Campaign Balance</div>
                                <div className="stat-value">{walletDetails && walletDetails.currency} {walletDetails && walletDetails.available_balance}</div>
                            </div>
                        </div>
                        : null
                    }
                    <div>
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Campaign</label>
                        <select
                            onChange={(e) => {
                                setWalletDetails('');
                                setErrors('');
                                setCampaign(e.target.value)
                            }}
                            className='input input-bordered w-full bg-gray-100 border-gray-300 '
                            required>
                            <option value="">Select campaign</option>
                            {campaigns.map((campaign, index) => {
                                return (
                                    <option
                                        value={campaign.id}
                                        key={index}>{campaign.campaignName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Account</label>
                        <select
                            onChange={(e) => {
                                setAccountNumber(e.target.value)
                                // get bank code from one account
                                setBank(accountNumbers.find(account => account.accountNumber === e.target.value).bankCode)
                                setProviders(accountNumbers.find(account => account.accountNumber === e.target.value).providers)
                                // if (providers === 'Bank') {
                                // }
                            }}
                            className='input input-bordered border-gray-300  w-full placeholder:bg-slate-400 bg-gray-100'
                            required>
                            <option value="">Select account</option>
                            {accountNumbers.map((accountNo, index) => {
                                return (
                                    <option
                                        value={accountNo.accountNumber}
                                        key={index}>{accountNo.accountName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="number"><span className='text-red-500'>*</span>Amount</label>
                        <input
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            className="input input-bordered border-gray-300  w-full bg-white"
                            id="amount"
                            placeholder='Above Ksh.10 for M-Pesa, Above Ksh.100 for Bank'
                            type='number' 
                            name="amount"
                            required />
                    </div>
                    {errors && <p className='text-red-700 text-base mt-2'>{errors}</p>}
                    <div className="flex items-center justify-between mt-4">
                        <button type='submit' onClick={handleSubmit} className="flex items-center justify-center px-8 py-2 border border-blue-600 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-transparent hover:text-gray-900 md:py-2 md:text-lg md:px-4">{isSubmitting? "Withdrawing...":"Withdraw"}</button>
                    </div>
                </form>

                <dialog open={withdrawForm} onClose={() => setWithdrawForm(false)} className="modal flex-row justify-center items-center text-center">
                    <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg">Please Enter Your Pin</h3>
                        {/* <div className="modal-action"> */}
                        {transactionResponse.transactions && <p className='text-emerald-500'>Status: {transactionResponse.transactions[0].status}</p>}
                        {popupErrors && <p className='text-red-700 '>{popupErrors}</p>}
                        <form className='flex justify-center items-center ' onSubmit={handleWithdraw}>
                            <div className='flex-col justify-center items-center pl-4 pr-8'>
                                <div className='my-4 text-white'>
                                    <label className="font-semibold my-3" htmlFor="amount">Amount</label>
                                    <input
                                        className="input input-bordered border-gray-300 w-full bg-white custom-disabled-input"
                                        value={amount}
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold mb-4" htmlFor="password"><span className='text-red-500'>*</span>Enter Pin</label>
                                    <input
                                        onChange={(e) => setPin(e.target.value)}
                                        value={pin}
                                        className="input input-bordered w-full bg-white"
                                        id="pin"
                                        type={ passswordShow ? "password" : "text"}
                                        placeholder='pin'
                                        maxLength={4}
                                        name="pin"
                                        required
                                    />
                                    <button onClick={handlePasswordEye} className='absolute right-14 mx-1 mt-4   '>{passswordShow ? <FaEyeSlash/> : <FaEye/>}</button>
                                </div>
                                <div>
                                    <button type='submit' className="rounded-md px-5 py-2 bg-blue-600 text-white my-4">Withdraw</button>
                                </div>
                            </div>
                        </form>
                        <button onClick={() => { setWithdrawForm(false); setLoading(false); setTransactionResponse('');  setPopupErrors(''); setCampaign('');}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        {/* </div> */}
                    </div>
                </dialog>

                <aside className="">
                    <div className="bg-white px-6 rounded">
                    <h2 className="font-bold text-xl">Instructions</h2>
                        <ul className="list-disc list-inside text-xs">
                            <li>Ensure you have added your signatories <span className='text-blue-600 font-semibold underline'><a href='/org/dashboard/transact/signatories'>here</a></span></li>
                            <li>Register your withdrawal account <span className='text-blue-600 font-semibold underline'><a href='/org/dashboard/transact/accounts'>here</a></span></li>
                            {/* <li>Minimum withdrwal amount is <span className='text-black font-medium'>sh.10</span> for <span className='text-black font-medium'>M-Pesa</span>  and <span className='text-black font-medium'>sh.100</span> for <span className='text-black font-medium'>Bank</span>.</li> */}
                            <li>Enter your withdrawal pin to complete the withdrawal process.</li>
                            <li>Once you submit the payment request, This will initialize the transaction which requires 3 signatories to be completed</li>
                        </ul>
                    <h2 className="font-bold text-lg mt-2">Transaction Fee</h2>
                        <table className="table-auto w-full mt-2 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 bg-gray-100">Item</th>
                                    <th className="border px-4 py-2 bg-gray-100">Amount {'(Sh.)'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-1">M-PESA</td>
                                    <td className="border px-4 py-1">1.5% {"("}min 10 max 50{")"} </td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">0 to 10,000</td>
                                    <td className="border px-4 py-1">100.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">10,001 to 50,000</td>
                                    <td className="border px-4 py-1">150.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">50,001 to 100,000</td>
                                    <td className="border px-4 py-1">200.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">100,001 to 500,000</td>
                                    <td className="border px-4 py-1">400.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">500,001 to 999,999</td>
                                    <td className="border px-4 py-1">500.00</td>
                                </tr>
                            </tbody>
                        </table>
                       
                    </div>
                </aside>

            </div>
        </div>
        {/* <DashFooter/> */}
    </div>
)
}

export default Withdraw