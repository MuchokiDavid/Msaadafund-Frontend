import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';

function BuyAirtime({allCampaigns,campaignError}) {
  const [phone, setPhone] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [amount, setAmount] = useState();
  const [name, setName] = useState("")
  const [campaign, setCampaign] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 
  const phonePattern = /^(07|01)\d{8}$/;

  const token=localStorage.getItem("token")
  
  useEffect(() => {
    setCampaigns(allCampaigns)
  }, [allCampaigns, token])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if(!phone || !amount || !campaign || !name) {
        setError("All fields are required")
        setIsSubmitting(false)
        return
    }
    else if(amount < 5) {
        setError("Amount must be greater than 5")
        setIsSubmitting(false)
        return
    }
    else if(!phone.match(phonePattern)) {
        setError("Invalid phone number")
        setIsSubmitting(false)
        return
    }
    else{
      let phoneNo = phone.replace(/^0+/, '');
      let formattedPhoneNumber = "254" + phoneNo;
      fetch(`/api/v1.0/buy_airtime`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer  ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        phone_number: formattedPhoneNumber,
        amount: amount,
        campaign_id: campaign
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
          toast('Buy airtime request received successifully')
          setPhone("");
          setAmount("");
          setName("")
          setError(""); 
        }
      })
      .catch((error) => {
        console.error("Error buying airtime:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
    }
    
  };
  return (
    <div className='mx-3'>
        <div className="text-md breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>Buy Airtime</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Buy Airtime</h1>
            <hr className='mb-4'/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form>
                    {error && <p className='text-red-600 text-base pb-4'>{error}</p>}
                    <div>
                        <label className="block font-semibold" htmlFor="name">Campaign</label>
                        <select 
                        onChange={(e) => setCampaign(e.target.value)}
                        className='w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-base sm:text-sm md:text-base lg:text-lg p-4 border-none block mt-1' 
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
                        <label className="block font-semibold" htmlFor="name">Name</label>
                        <input 
                        className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-400 text-lg p-4 border-none block mt-1" 
                        id="name" 
                        type="text" 
                        placeholder='e.g. John Doe'
                        name="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                        required/>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="name">Phone Number</label>
                        <input 
                        className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-gray-400 text-lg p-4 border-none block mt-1" 
                        id="name" 
                        type="text" 
                        placeholder='e.g. 07xxxxxxxx'
                        maxLength={10}
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)} 
                        required />
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="number">Amount</label>
                        <input
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount} 
                        className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none block mt-1" 
                        id="amount" 
                        type="number" 
                        name="amount" 
                        required/>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <button type='submit' onClick={handleSubmit} className="flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-transparent hover:text-gray-900 md:py-4 md:text-lg md:px-10">Buy</button>                        
                    </div>
                </form>

                <aside className="">
                    <div className="bg-white p-10 rounded">
                        <h2 className="font-bold text-2xl">Instructions</h2>
                        <ul className="list-disc mt-4 list-inside text-lg">
                            <li>Ensure that the phone number provided is a valid phone number.</li>
                            <li>Double-check the amount you wish to purchase and make sure it is not less than 5 to avoid errors.</li>
                            <li>Once you submit the purchase request, the airtime will be transferred to your phone number within the hour.</li>
                            <li>If you encounter any issues during the purchase process, please contact our support team for assistance.</li>
                        </ul>
                    </div>
                </aside>
                <Toaster position='top-center' reverseOrder= {false} />
            </div>
        </div>
    </div>
  )
}

export default BuyAirtime