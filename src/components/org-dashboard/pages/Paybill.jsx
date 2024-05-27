import React, { useEffect, useState, useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import axios from 'axios';

function Paybill({allCampaigns,campaignError,handleWallet}) {
    const [campaigns, setCampaigns] = useState([])
    const [campaign, setCampaign] = useState('')
    const [walletDetails, setWalletDetails] = useState('')
    const [error, setError] = useState('')
    const [transactionResponse, setTransactionResponse] = useState('')
    const [paybillNumber, setPaybillNumber]= useState('')
    const [accountNumber, setAccountNumber]= useState('')
    const [amount, setAmount]= useState(10)
    const [comment, setComment]= useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const formRef = useRef(null)
    const token= localStorage.getItem('token')


    useEffect(() => {
    setCampaigns(allCampaigns)
    }, [allCampaigns, token])

    useEffect(() => {
    setError(campaignError)
    }, [campaignError,token])

    //Get wallet details from a function in the main as a prop
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (campaign === '') {
          setError('Please select a campaign');
        } else {
            setError(null);
            const walletDetail = await handleWallet(campaign);
            setWalletDetails(walletDetail);
        }
      } catch (error) {
        console.error('Error fetching wallet details:', error);
        setError('Error in fetching wallet details');
      }
    };

    fetchData();

  }, [campaign, campaigns, handleWallet]);

//handle pay using axios and add 
const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('/api/v1.0/pay_to_paybill', {
            paybillNumber: paybillNumber,
            accountNumber: accountNumber,
            amount: amount,
            narrative: comment,
            campaignId: campaign
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            // throw new Error('Error in making payment');
            setError('Error in making payment');
            setLoading(false);
            setIsSubmitting(false);
            // sweetalert error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while paying, please try again!'
            });
        }
        else if (response.status === 200) {
            setTransactionResponse(response.data);
            setPaybillNumber("");
            setAccountNumber("");
            setAmount(0);
            setComment("");
            setError("");
            setLoading(false);
            setIsSubmitting(false)
            // toast('Pay to paybill request initiated successfully');
            Swal.fire({
                icon: 'success',
                title: 'Request successful',
                text: 'Your payment request has been received successfully'
            });
        }
        
    } catch (error) {
        console.error('Error in making payment:', error);
        setError('Error in making payment');
        setLoading(false);
        setIsSubmitting(false);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!accountNumber) {
        setError("Account number is required");
        setIsSubmitting(false);
        return;
    } else if (!paybillNumber) {
        setError("Paybill number is required");
        setIsSubmitting(false);
        return;
    } else if (!amount) {
        setError("Amount is required");
        setIsSubmitting(false);
        return;
    } else if (parseInt(amount) < 10) {
        setError("Amount must be greater than 10");
        setIsSubmitting(false);
        return;
    } else {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to send ${amount} to Paybill ${paybillNumber} Acc No: ${accountNumber} \n\n You won't be able to revert this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, pay now!'
        }).then((result) => {
            if (result.isConfirmed) {
                handlePay(e);
            } else {
                setIsSubmitting(false);
            }
        });
    }
};

if (loading) {
    return (
        <div aria-label="Loading..." role="status" className="flex justify-center items-center space-x-2  min-h-screen">
            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
            </svg>
        <span className="text-4xl font-medium text-gray-500">Loading...</span>
    </div>
    )
}

// console.log(transactionResponse)

  return (
    <div className='mx-3'>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>Paybill</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Paybill</h1>
            <hr className='mb-2'/>
            {error && <p className='text-red-600 text-base my-2'>{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form ref={formRef} onSubmit={handleSubmit}>                    
                    {transactionResponse.transactions && <p className='text-emerald-500'>Status: {transactionResponse.transactions[0].status}</p>}
                    {walletDetails? 
                        <div className="stats border">
                            <div className="stat">
                                <div className="stat-title">Campaign Balance</div>
                                <div className="stat-value">{walletDetails&&walletDetails.currency} {walletDetails && walletDetails.available_balance}</div>
                            </div>
                        </div>
                        : null
                    }
                    <div>
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Campaign</label>
                        <select 
                        onChange={(e) => {setWalletDetails('');setError(''); setCampaign(e.target.value); setTransactionResponse('')}}
                        className='input input-bordered w-full placeholder:bg-slate-400 bg-gray-100' 
                        required>
                            <option value="">Select campaign</option>
                            {campaigns.map((campaign, index) => {
                                return(
                                    <option 
                                    value={campaign.id} 
                                    key={index}>{campaign.campaignName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='mt-4'>
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Paybill Number</label>
                        <input 
                        className="input input-bordered w-full" 
                        id="paybillNumber" 
                        type="text" 
                        placeholder='Paybill Number'
                        name="paybillNumber"
                        value={paybillNumber}
                        onChange={(e)=>setPaybillNumber(e.target.value)} 
                        required/>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Account Number</label>
                        <input 
                        className="input input-bordered w-full" 
                        id="Account Number" 
                        type="text" 
                        placeholder='Account Number'
                        maxLength={10}
                        value={accountNumber}
                        onChange={(e)=>setAccountNumber(e.target.value)} 
                        required />
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="number"><span className='text-red-500'>*</span>Amount</label>
                        <input
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount} 
                        className="input input-bordered w-full" 
                        placeholder='Amount'
                        id="amount" 
                        type="number" 
                        name="amount" 
                        required/>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="number">Comment</label>
                        <input
                        onChange={(e) => setComment(e.target.value)}
                        value={comment} 
                        className="input input-bordered w-full" 
                        id="comment" 
                        placeholder='Comment'
                        type="text" 
                        name="comment"/>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button type="submit"
                            className='intaSendPayButton'>
                                {isSubmitting ? "Submitting..." : "Pay"}
                        </button>
                    </div>
                </form>

                <aside className="">
                    <div className="bg-white p-10 rounded">
                        <h2 className="font-bold text-2xl">Instructions</h2>
                        <ul className="list-disc mt-4 list-inside text-lg">
                            <li>Ensure that the paybill and account number provided are valid.</li>
                            <li>Double-check the amount you wish to pay and make sure it is not less than 10 to avoid errors.</li>
                            <li>Once you submit the payment request, the funds will be transferred to the paybill provided.</li>
                            <li>If you encounter any issues during the purchase process, please contact our support team for assistance.</li>
                        </ul>
                    </div>
                </aside>
                <Toaster position='top-center'/>
            </div>
        </div>
    </div>
  )
}

export default Paybill