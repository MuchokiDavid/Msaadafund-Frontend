import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
// import DashFooter from '../dash-components/DashFooter';

function Paybill({allCampaigns,campaignError,handleWallet}) {
    const [campaigns, setCampaigns] = useState([])
    const [campaign, setCampaign] = useState('')
    const [walletDetails, setWalletDetails] = useState('')
    const [error, setError] = useState('')
    const [transactionResponse, setTransactionResponse] = useState([])
    const [paybillNumber, setPaybillNumber]= useState('')
    const [accountNumber, setAccountNumber]= useState('')
    const [amount, setAmount]= useState(10)
    const [comment, setComment]= useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
        const response = await axios.post('https://backend.service.msaadafund.com/home/api/v1.0/pay_to_paybill', {
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
            setIsSubmitting(false)
            // toast('Pay to paybill request initiated successfully');
            Swal.fire({
                icon: 'success',
                title: 'Request successful',
                text: response.data.message
            });
        }
        
    } catch (error) {
        console.error('Error in making payment:', error);
        setError(error.response.data.error);
        setIsSubmitting(false);
        setTransactionResponse([])
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
    } else if (parseInt(amount) > 150000) {
        setError("Amount must be less than 150000");
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

// console.log(transactionResponse)

  return (
    <div className='mx-3'>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a href='/org/dashboard/transact/paybill'>Paybill</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Paybill</h1>
            <hr className='mb-2'/>            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 border rounded-lg">
                <form onSubmit={handleSubmit}>                   
                   
                    {walletDetails? 
                        <div className="stats border">
                            <div className="stat bg-white text-gray-800">
                                <div className="stat-title text-gray-700">Campaign Balance</div>
                                <div className="stat-value">{walletDetails&&walletDetails.currency} {walletDetails && walletDetails.available_balance}</div>
                            </div>
                        </div>
                        : null
                    }
                     {transactionResponse && transactionResponse.transactions && <p className='text-emerald-500'>Status: {transactionResponse.transactions[0].status}</p>}
                    <div>
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Campaign</label>
                        <select 
                        onChange={(e) => {setWalletDetails('');setError(''); setCampaign(e.target.value); setTransactionResponse('')}}
                        className='input input-bordered w-full placeholder:bg-slate-400 bg-gray-50 border-gray-300' 
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
                        className="input input-bordered w-full bg-white border-gray-300" 
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
                        className="input input-bordered w-full bg-white border-gray-300" 
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
                        className="input input-bordered w-full bg-white border-gray-300" 
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
                        className="input input-bordered w-full bg-white border-gray-300" 
                        id="comment" 
                        placeholder='Comment (optional)'
                        type="text" 
                        name="comment"/>
                    </div>
                    {error && <p className='text-red-600 text-base my-2'>{error}</p>}
                    <div className="flex items-center justify-between mt-4">
                    {isSubmitting ?
                        (
                            <button type="button" class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                                <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                    </path>
                                </svg>
                                Paying
                            </button>
                        ) 
                        :
                        (
                            <button type="submit" class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                                Pay
                            </button>
                        )
                    }

                    </div>
                </form>

                <aside className="">
                    <div className="p-3 rounded">

                    <h2 className="font-bold text-xl">Instructions</h2>
                        <ul className="list-disc mt-3 list-inside text-xs">
                            <li>Ensure you have added your signatories <span className='text-blue-600 font-semibold'><a href='/org/dashboard/transact/signatories'>here</a></span></li>
                            <li>Once you submit the payment request, This will initialize the transaction which requires atleast 3 signatories to be completed</li>
                            <li>If you encounter any issues during the purchase process, please contact our support team for assistance.</li>
                        </ul>

                    <h2 className="font-bold text-xl mt-2">Transaction Fee</h2>
                        <table className="table-auto w-full mt-2 text-left text-xs">
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2 bg-gray-100">Item</th>
                                    <th className="border px-4 py-2 bg-gray-100">Amount {'(Sh.)'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-1">0 to 1,000</td>
                                    <td className="border px-4 py-1">30.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">1,001 to 3,500</td>
                                    <td className="border px-4 py-1">50.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">3,501 to 5,000</td>
                                    <td className="border px-4 py-1">70.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">5,001 to 10,000</td>
                                    <td className="border px-4 py-1">80.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">10,001 to 30,000</td>
                                    <td className="border px-4 py-1">100.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">30,001 to 45,000</td>
                                    <td className="border px-4 py-1">130.00</td>
                                </tr>
                                <tr>
                                    <td className="border px-4 py-1">45,001 to 150,000</td>
                                    <td className="border px-4 py-1">150.00</td>
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

export default Paybill