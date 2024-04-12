import React, { useEffect, useState } from 'react';

function CampaignCard({allCampaigns, campaignError}) {
    const [campaigns, setCampaigns] = useState(allCampaigns);
    const token = localStorage.getItem('token');
    const [walletDetails, setWalletDetails] = useState(null);
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState(campaignError);


    useEffect(() => {
        campaigns.forEach(item => handleWallet(item.id));
    }, [campaigns, token]);

    const handleWallet = async (id) => {
        try {
            const response = await fetch(`/api/v1.0/campaign_wallet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false)
                setWalletDetails(prevState => ({
                ...prevState,
                [id]: data.wallet_details
                }));
            }
            
        } catch (error) {
            setLoading(true)
            setErrors('Error in fetching wallet details', error);
        }
    };
    // console.log(campaigns)

    if(loading){
        return <div className='sm:h-screen'><span className="loading loading-dots loading-lg"></span></div>
    }

    return (
        <div>
            <div className="text-md breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Home</a></li> 
                    <li><a href='/org/dashboard/campaigns'>View Campaign</a></li> 
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">My Campaigns</h2>
            <hr className='mb-4'/>
            {errors&& <p className='text-red-700'>{errors}</p>}
            <div className="mx-4 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:max-w-full">
                {campaigns && campaigns.map((item) =>{
                return (
                    <div class="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-60 md:w-80">
                        <a href="#" class="block w-full h-full">
                            <div class="w-full p-4 bg-gray-100 dark:bg-gray-800">
                                <p class="font-medium text-indigo-500 text-md">
                                    Available balance
                                </p>
                                <p class="mb-2 text-2xl font-medium text-gray-800 dark:text-white">
                                    {walletDetails &&walletDetails[item.id]?.currency} {walletDetails &&walletDetails[item.id]?.available_balance}
                                </p>
                                {/* <p class="font-light text-gray-400 dark:text-gray-300 text-md">
                                    The new supercar is here, 543 cv and 140 000$. This is best racing GT about 7 years on...
                                </p> */}
                                <div className='grid grid-flow-col grid-col-2'>
                                    <div>
                                        <h6 className='text-lg text-slate-700 dark:text-slate-200'>Campaign</h6>
                                        <p className='text-gray-900 dark:text-slate-400'>{item.campaignName.slice(0,25)}...</p>
                                        </div>
                                        <div>
                                            <h6 className='text-lg text-slate-700 dark:text-slate-200'>Budget</h6>
                                        <p className='text-gray-900 dark:text-slate-400'>{item.targetAmount}</p>
                                    </div>
                                        </div>
                                <div class="flex flex-wrap items-center mt-4 justify-starts">
                                    <div class="text-xs mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded-2xl">
                                        <button className='h-6'>Withdraw</button>
                                    </div>
                                    <div class="text-xs mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded-2xl">
                                    <button className='h-6'>Transactions</button>
                                    </div>
                                </div>
                            </div>
                        </a>
            </div>
                )})}
            </div>
        </div>
    );
}

export default CampaignCard;
