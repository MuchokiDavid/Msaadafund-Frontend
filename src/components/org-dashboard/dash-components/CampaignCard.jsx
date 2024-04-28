import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';


function CampaignCard({allCampaigns, campaignError}) {
    const [campaigns, setCampaigns] = useState();
    const token = localStorage.getItem('token');
    const [walletDetails, setWalletDetails] = useState(null);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(campaignError);
    const [inActiveCampaign, setInactiveCampaign] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        const accessToken = localStorage.getItem('token');
        const config = {
            headers:{
            Authorization: `Bearer ${accessToken}`
            }
        }
        axios.get ("/api/v1.0/get_inactive",config)
        .then((res)=>{
            setInactiveCampaign(res.data)   
        })
        .catch ((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setErrors(errorMsg); 
        })
    },[])


    useEffect(() => {
        setCampaigns(allCampaigns)    
    }, [allCampaigns])

    useEffect(() => {
        campaigns && campaigns.forEach(item => handleWallet(item.id));
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
                // setLoading(false)
                setWalletDetails(prevState => ({
                ...prevState,
                [id]: data.wallet_details
                }));
            }
            
        } catch (error) {
            // setLoading(true)
            setErrors('Error in fetching wallet details', error);
        }
    };
    // console.log(campaigns)

    if(loading){
        return <div className='sm:h-screen'><span className="loading loading-dots loading-lg"></span></div>
    }
    

    const handleEditButton = (campaignId)=>{
        navigate(`/org/dashboard/campaigns/${campaignId}`)
    }
    const handleDeleteButton = async (campaignId)=>{
        try{
        const accessToken = localStorage.getItem('token');
        const config = {
           headers:{
            Authorization: `Bearer ${accessToken}`
           }
        }
        axios.delete(`/api/v1.0/deletecampaign/${campaignId}`, config)
        .then((res)=>{{
            console.log(res)
            alert('Do you want to delete this campaign?', res)
            toast.success('Campaign deleted successfully')
            window.location.reload();
        }})
        .catch((err)=>{
            const errorMsg = err.response?.data?.error || 'An error occurred';
            setErrors(errorMsg); 
        })
        }
        catch(err){
            console.log(err)
        }
    }


    const activateCampaign = async (campaignId)=>{
        try{
            const accessToken = localStorage.getItem('token');
            const config = {
               headers:{
                Authorization: `Bearer ${accessToken}`
               }
            }
            if (!accessToken){
                alert("access token not found")
            }
            axios.patch(`/api/v1.0/activate/campaign/${campaignId}`,{}, config)
            .then((res)=>{{
                console.log(res)
                toast.success('Campaign activated successfully')
                window.location.reload();
            }})
            .catch((err)=>{
                const errorMsg = err.response?.data?.error || 'An error occurred';
                setErrors(errorMsg);
            })

        }
        catch(err){
            console.log(err)
        }
       
    }   
    return (
        <div className='h-screen lg:h-fit'>
            <div className="text-md breadcrumbs ml-2">
                <ul>
                    <li><a href='/org/dashboard'>Dashboard</a></li> 
                    <li><a href='/org/dashboard/campaigns'>View Campaign</a></li> 
                </ul>
            </div>
            <h2 className="mb-3 text-2xl font-bold leading-tight ">My Campaigns</h2>
            <hr className='mb-4'/>
            {errors&& <p className='text-red-700'>{errors}</p>}
            <a href='/org/dashboard/createcampaign' className='text-blue-700 mb-4 text-lg hover:underline'>Add campaign+</a>
            <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full">
                {campaigns && campaigns.map((item) =>{
                return (
                    <div key={item.id} class="m-auto overflow-hidden rounded-lg shadow cursor-pointer h-90 md:w-80 w-full">
                        <div class="block w-full h-full">
                            <div class="w-full p-4 bg-gray-100">
                                <p class="font-medium text-indigo-500 text-md">
                                    Available balance
                                </p>
                                <p class="mb-2 text-2xl font-medium text-gray-800">
                                    {walletDetails &&walletDetails[item.id]?.currency} {walletDetails &&walletDetails[item.id]?.available_balance}
                                </p>
                                {/* <p class="font-light text-gray-400 dark:text-gray-300 text-md">
                                    The new supercar is here, 543 cv and 140 000$. This is best racing GT about 7 years on...
                                </p> */}
                                <div className='grid grid-flow-col grid-col-3'>
                                    <div>
                                        <h6 className='text-lg text-black'>Campaign</h6>
                                        <p className='text-black'>{item.campaignName.slice(0,25)}...</p>
                                        </div>
                                        <div>
                                            <h6 className='text-lg text-black'>Budget</h6>
                                        <p className='text-gray-900'>{item.targetAmount}</p>
                                    </div>
                                        </div>
                                <div class="flex flex-wrap items-center mt-4 justify-between">
                                    <div class="text-sm mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded font-bold">
                                        <button
                                        className='h-6'>Transact</button>
                                    </div>
                                    <div class="text-sm mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded font-bold">
                                    <button onClick={()=>handleEditButton(item.id) } className='h-6'>Edit Campaign</button>
                                    </div>
                                    <div>
                                        <button title='Delete Campaign' onClick={()=>handleDeleteButton(item.id)}><MdDelete size={36}  style={{ color: 'red' }}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                )})}
                 
            </div>
            <div className='mt-4'>
                <h1 className='text-2xl'>INACTIVE CAMPAIGNS</h1>
                <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:max-w-full">
                {inActiveCampaign && inActiveCampaign.map((item)=>{
                    return(
                        <div key={item.id} className="m-auto overflow-hidden rounded-lg shadow cursor-pointer h-90 md:w-80 w-full">
                            <div className='w-full p-4 bg-gray-400'>
                            <p class="font-medium text-indigo-500 text-md">
                                    Available balance
                                </p>
                                <p class="mb-2 text-2xl font-medium text-gray-800 dark:text-white">
                                    {walletDetails &&walletDetails[item.id]?.currency} {walletDetails &&walletDetails[item.id]?.available_balance}
                                </p>
                                <div className='grid grid-flow-col grid-col-3'>
                                    <div>
                                        <h6 className='text-lg text-black'>Campaign</h6>
                                        <p className='text-black'>{item.campaignName.slice(0,25)}...</p>
                                        </div>
                                        <div>
                                            <h6 className='text-lg text-black'>Budget</h6>
                                        <p className='text-gray-900'>{item.targetAmount}</p>
                                    </div>
                                        </div>
                            <div class="flex flex-wrap items-center mt-4 justify-between">
                                <div class="text-sm mr-2 py-1.5 px-4 text-gray-200 bg-blue-700 rounded font-bold">
                                    <button onClick={()=>activateCampaign(item.id)}
                                    className='h-6'>ReActivate
                                    </button>
                                </div>
                             </div>
                             </div>
                        </div>
                    )
                })}
            </div>
            </div>
            <Toaster position="top-right" reverseOrder= {false}/>
        </div>
    );
}

export default CampaignCard;
