import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

function Till({allCampaigns,campaignError,handleWallet}) {
  const [campaigns, setCampaigns] = useState([])
    const [campaign, setCampaign] = useState('')
    const [walletDetails, setWalletDetails] = useState('')
    const [error, setError] = useState('')
    const [transactionResponse, setTransactionResponse] = useState([])
    const [tillNumber, setTillNumber]= useState('')
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
        const response = await axios.post('/api/v1.0/pay_to_till', {
            tillNumber: tillNumber,
            amount: amount,
            narrative: comment,
            campaignId: campaign
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
          setTransactionResponse(response.data);
          setTillNumber("");
          setAmount(0);
          setComment("");
          setError("");
          setLoading(false);
          setIsSubmitting(false)
          // toast('Pay to paybill request initiated successfully');
          Swal.fire({
              icon: 'success',
              title: 'Request successful',
              text: response.data.message
          });
        }
        // else if (response.status !== 200) {
        //     // throw new Error('Error in making payment');
        //     setError(response.data.error)
        //     setLoading(false);
        //     setIsSubmitting(false);
        //     // sweetalert error
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Something went wrong while paying, please try again!'
        //     });
        // }
        
    } catch (error) {
        console.error('Error in making payment:', error);
        setError(error.response.data.error)
        setLoading(false);
        setIsSubmitting(false);
        setTransactionResponse([])
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!tillNumber) {
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
            text: `You are about to send ${amount} to Till Number ${tillNumber} \n\n You won't be able to revert this!`,
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
// console.log(transactionResponse)

  return (
    <div className='mx-3'>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>Buy goods and services</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Buy Goods and Services</h1>
            <hr className='mb-2'/>
            
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
                    {error && <p className='text-red-600 text-base my-2'>{error}</p>}
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
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Till Number</label>
                        <input 
                        className="input input-bordered w-full" 
                        id="tillNumber" 
                        type="text" 
                        placeholder='Till Number'
                        name="tillNumber"
                        value={tillNumber}
                        onChange={(e)=>setTillNumber(e.target.value)} 
                        required/>
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
                            <li>Ensure that the till number provided is valid.</li>
                            <li>Double-check the amount you wish to pay and make sure it is not less than 10 to avoid errors.</li>
                            <li>Once you submit the payment request, the funds will be transferred to the till number provided.</li>
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

export default Till