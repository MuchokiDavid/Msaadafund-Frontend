import React, { useEffect, useState } from 'react'

function Withdraw({allCampaigns,campaignError}) {
    const[accountNumbers,setAccountNumbers]=useState([])
    const[campaigns,setCampaigns]=useState([])
    const[errors,setErrors]=useState(null)
    const[loading,setLoading]=useState(false)
    const token=localStorage.getItem('token')

    const[providers,setProviders]=useState('M-Pesa')
    const[amount,setAmount]=useState(5)
    const[accountNumber,setAccountNumber]=useState('')
    const[campaign,setCampaign]=useState('')
    const[pin,setPin]=useState('')
    const[withdrawForm,setWithdrawForm]=useState(false)

    useEffect(() => {
      setCampaigns(allCampaigns)
    }, [allCampaigns, token])
    

    const handleFetch = async () => {
        try {
            const response = await fetch('/api/v1.0/accounts', {
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
            setErrors('Error in fetching accounts', error);
        }
      };

      useEffect(() => {
        handleFetch()
      }, [token])

      const handleSubmit = (e) => {
        e.preventDefault()
        if(campaign===''){
            setErrors('Please select a campaign')
        }
        else if(amount===''){
            setErrors('Please enter an amount')
        }
        else if(accountNumber===''){
            setErrors('Please enter an account number')
        }
        else{
            setWithdrawForm(true)
        }
        
      }

      const handleWithdraw = async (e) => {
        e.preventDefault()
        setWithdrawForm(true)
        try {
            const response = await fetch('/api/v1.0/withdraw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    campaign: campaign,
                    amount: amount,
                    accountNumber: accountNumber,
                    providers: providers,
                    pin: pin
                })
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false)
                console.log(data)
                setAccountNumber('')
                setAmount('')
                setCampaign('')
                setPin('')
            } else {
                // setLoading(true)
                throw new Error(data);
            }
        } catch (error) {
            // setLoading(true)
            setErrors('Error in withdrawing funds', error);
        }
      }
    
    if  (!token){
    window.location.replace("/org/login")
    }

    if (loading) {
        return(<div className='flex justify-center'><span className="loading loading-dots loading-lg"></span></div>)
    }

  return (
    <div className='mx-3'>
        <div className="text-md breadcrumbs ml-2">
            <ul>
                <li><a href='/org/dashboard'>Dashboard</a></li>
                <li><a>Withdraw</a></li>
            </ul>
        </div>
        <div>
            <h1 className="font-extrabold text-2xl">Withdraw</h1>
            <hr className='mb-6'/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <form>
                    {errors && <p className='text-red-800 text-base'>{errors}</p>}
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
                        <label className="block font-semibold" htmlFor="name">Provider</label>
                        <input 
                        className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none block mt-1" 
                        id="name" 
                        type="text" 
                        name="name"
                        value={providers}
                        onChange={(e)=>setProviders(e.target.value)} 
                        required 
                        autofocus="autofocus" 
                        disabled/>
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold" htmlFor="name">Account Number</label>
                        <select 
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className='w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-base sm:text-sm md:text-base lg:text-lg p-4 border-none block mt-1' 
                        required>
                            <option value="">Select account</option>
                            {accountNumbers.map((accountNo, index) => {
                                return(
                                    <option 
                                    value={accountNo.accountNumber} 
                                    key={index}>{accountNo.accountNumber}
                                    </option>
                                )
                            })}
                        </select>
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
                        <button type='submit' onClick={handleSubmit} className="flex items-center justify-center px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-transparent hover:text-gray-900 md:py-4 md:text-lg md:px-10">Withdraw</button>                        
                    </div>
                </form>

                <dialog open={withdrawForm} onClose={()=>setWithdrawForm(false)} className="modal flex-row justify-center items-center text-center">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Please Enter Your Pin</h3>
                        {/* <div className="modal-action"> */}
                            <form onSubmit={handleWithdraw}>
                                <div className='flex-col justify-center items-center pl-4 pr-8'>
                                    <div className='my-4'>
                                       <label className="font-semibold my-3" htmlFor="password">Amount</label>
                                        <input
                                        className="shadow-inner bg-gray-50 rounded-lg placeholder-gray-400 text-lg p-4 border-none block"
                                        value={amount}
                                        disabled
                                        /> 
                                    </div>
                                    <div>
                                        <label className="font-semibold mb-4" htmlFor="password">Enter Pin</label>
                                        <input
                                        onChange={(e) => setPin(e.target.value)}
                                        value={pin} 
                                        className="shadow-inner bg-gray-50 rounded-lg placeholder-gray-400 text-lg p-4 border-none block" 
                                        id="pin" 
                                        type="password" 
                                        placeholder='pin'
                                        maxLength={4}
                                        name="pin" 
                                        required
                                        />
                                    </div>
                                    <div>
                                        <button type='submit' className="btn my-4">Withdraw</button>
                                    </div>
                                </div>
                                <button onClick={()=>setWithdrawForm(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        {/* </div> */}
                    </div>
                </dialog>

                <aside className="">
                    <div className="bg-white p-10 rounded">
                        <h2 className="font-bold text-2xl">Instructions</h2>
                        <ul className="list-disc mt-4 list-inside">
                            <li>Ensure that the phone number provided is registered to your M-Pesa account.</li>
                            <li>Double-check the amount you wish to withdraw to avoid errors.</li>
                            <li>Once you submit the withdrawal request, the funds will be transferred to your M-Pesa account within the hour.</li>
                            <li>If you encounter any issues during the withdrawal process, please contact our support team for assistance.</li>
                        </ul>
                    </div>
                </aside>

            </div>
        </div>
    </div>
  )
}

export default Withdraw