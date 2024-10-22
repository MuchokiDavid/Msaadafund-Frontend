import React, { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2';
import { apiUrl } from '../../../context/Utils';

function BuyAirtime({allCampaigns,campaignError,handleWallet}) {
  const [phone, setPhone] = useState("");
  const [campaigns, setCampaigns] = useState(allCampaigns);
  const [amount, setAmount] = useState();
  const [name, setName] = useState("")
  const [campaign, setCampaign] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 
  const phonePattern = /^(07|01)\d{8}$/;
  const[walletDetails,setWalletDetails]=useState()
  const[transactionResponse,setTransactionResponse]=useState([])

  const token=localStorage.getItem("token")
  const formRef = useRef(null);
  
  useEffect(() => {
    setCampaigns(allCampaigns)
  }, [allCampaigns, token])

  useEffect(() => {
    setError(campaignError)
  }, [campaignError,token])

  //Get waallet details from a function in the main as a prop
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!phone || !amount || !campaign || !name) {
        setError("All fields are required")
        setIsSubmitting(false)
        return
    }
    else if(parseInt(amount) < 10) {
        setError("Amount must be greater than 10")
        setIsSubmitting(false)
        return
    }
    else if(!phone.match(phonePattern)) {
        setError("Invalid phone number")
        setIsSubmitting(false)
        return
    }
    else{
      //Swal to ask person to confirm before sending to backend
      Swal.fire({
        title: 'Are you sure?',
        text: `You are about to send Ksh${amount} to ${phone} \n\n You won't be able to revert this!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, send airtime!'
        }).then((result) => {
            if (result.isConfirmed) {
                setError(null);
                setIsSubmitting(true);
                let phoneNo = phone.replace(/^0+/, '');
                let formattedPhoneNumber = "254" + phoneNo;
                fetch(`${apiUrl}/api/v1.0/buy_airtime`, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer  ${token}`,
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name: name,
                  phone_number: formattedPhoneNumber,
                  amount: amount,
                  campaign: campaign
                }),
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  if (data && data.error) {
                    setError(data.error);
                  } 
                  if(data && data.message) {
                    // toast('Buy airtime request received successifully')
                    //Sweetalert
                    Swal.fire({
                      // position: 'top-end',
                      icon: 'success',
                      title: "Buy Airtime",
                      text: 'Request received successfully.Transaction awaiting your signatory approval',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    setTransactionResponse(data.message)
                    setPhone("");
                    setAmount("");
                    setName("")
                    setError(""); 
                    formRef.current.reset();
                  }
                  if(data && data.error){
                    setError(data.error)
                    setIsSubmitting(false)
                    // swal
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: data.error
                    })
                  }
                })
                .catch((error) => {
                  console.error("Error buying airtime:", error);
                  // swal to show error
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while buying airtime, please try again!'
                  });
                })
                .finally(() => {
                  setIsSubmitting(false);
                });
            } else {
                setIsSubmitting(false);
            }
        });
      
    }
    
  };
  // console.log(campaign)
  // console.log(walletDetails)
  // console.log(transactionResponse)

  return (
    <div className='mx-3'>
        <div className="text-sm breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a href='/org/dashboard/transact/buyairtime'>Buy Airtime</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Buy Airtime</h1>
            <hr className='mb-2'/>            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border rounded-lg bg-white">
              <div>
                  <form ref={formRef}>                    
                    {transactionResponse.transactions && <p className='text-emerald-500'>Status: {transactionResponse.transactions[0].status}</p>}
                    {walletDetails? 
                        <div className="stats border bg-white text-gray-800">
                            <div className="stat">
                                <div className="stat-title text-gray-700">Campaign Balance</div>
                                <div className="stat-value">{walletDetails&&walletDetails.currency} {walletDetails && walletDetails.available_balance}</div>
                            </div>
                        </div>
                        : null
                    }
                    {/* {error && <p className='text-red-600 text-base'>{error}</p>} */}
                    <div>
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Campaign</label>
                        <select 
                        onChange={(e) => {setWalletDetails('');setError(''); setCampaign(e.target.value)}}
                        className='input input-bordered w-full placeholder:bg-slate-400 bg-gray-50' 
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
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Name</label>
                        <input 
                        className="input input-bordered w-full bg-white border-gray-300" 
                        id="name" 
                        type="text" 
                        placeholder='e.g. John Doe'
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                        required/>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="name"><span className='text-red-500'>*</span>Phone Number</label>
                        <input 
                        className="input input-bordered w-full bg-white border-gray-300" 
                        id="phoneNumber" 
                        type="tel" 
                        placeholder='e.g. 07xxxxxxxx'
                        maxLength={10}
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)} 
                        required />
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="number"><span className='text-red-500'>*</span>Amount</label>
                        <input
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount} 
                        className="input input-bordered w-full bg-white border-gray-300"
                        placeholder='e.g. 50' 
                        id="amount" 
                        type="number" 
                        name="amount" 
                        required/>
                    </div>
                    {error && <p className='text-red-700 text-base'>{error}</p>}
                    <div className="flex items-center justify-between mt-4">
                      
                    {isSubmitting ?
                        (
                            <button type="button" class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                                <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                                    </path>
                                </svg>
                                Buying..
                            </button>
                        ) 
                        :
                        (
                            <button type="submit" onClick={handleSubmit} class="btn btn-md py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                                Buy
                            </button>
                        )
                    }
                    </div>
                  </form>
                </div>

                <aside className="">
                    <div className="p-4 rounded">
                        <h2 className="font-bold text-xl">Instructions</h2>
                        <ul className="list-disc mt-3 list-inside text-xs">
                            <li>Ensure you have added your signatories <span className='text-blue-600 font-semibold underline'><a href='/org/dashboard/transact/signatories'>here</a></span></li>
                            <li>Ensure that the phone number provided is a valid.</li>
                            <li>Double-check the amount you wish to purchase and make sure it is more than sh.5 to avoid errors.</li>
                            <li>Once you submit the purchase request, This will initialize the transaction which requires atleast 3 signatories to be completed</li>
                        </ul>

                        <h2 className="font-bold text-xl mt-3">Transaction Fee</h2>
                        <p>FREE</p>
                    </div>
                </aside>
            </div>
        </div>
    </div>
  )
}

export default BuyAirtime