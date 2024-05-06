import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import Featured from '../components/campaigns/Featured';

import { 
FacebookShareButton,FacebookIcon, 
WhatsappShareButton,WhatsappIcon,
TwitterShareButton, TwitterIcon,
TelegramShareButton,TelegramIcon
} from 'react-share';
import Swal from 'sweetalert2';
import { useAuth } from '../context/usersContext';

function CampainDetails() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [amount, setDonationAmount] = useState(5);
    const [name, setName]=useState("")
    const [phoneNum, setPhoneNum] = useState("");
    const [errors, setErrors] = useState();
    const phonePattern = /^(07|01)\d{8}$/;
    const [username, setUserName]= useState("")
    const [password, setPassword]= useState("")
    const {userLogin, loginMessage, logout} = useAuth();
    const [showModal, setShowModal] = useState(false);

    // const  navigate = useNavigate();
    const [loading, setLoading]= useState(false)
    // const currentlWebUrl= window.location.href
    const currentlWebUrl= `https://joker.vercel.app${window.location.pathname}`
    const [subscribe, setSubscribe] = useState(false)
    const [org_id, setOrg_id] = useState(null)
    const users = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');
    const org=  localStorage.getItem('org')

// to check the subscription state
   

    useEffect(() => {
      
        const fetchCampaign= ()=>{
            setLoading(true)
            fetch(`/api/v1.0/campaign/${campaignId}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setCampaign(data);
                const org_id = data.organisation.id
                setOrg_id(org_id)
                 // get user details
               
            })
            .catch(error => console.error('Error fetching campaign details:', error));
        }

        fetchCampaign();

        // const intervalId = setInterval(fetchCampaign, 15000);//Polling done here to fetch campaign
        // return () => clearInterval(intervalId);

    }, [campaignId]);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
                const response = await axios.get(`/api/v1.0/subscription/${org_id}`, config);
                // console.log(response.data);
                setSubscribe(true);
            } catch (error) {
                const errorMsg = error.response?.data?.error || 'An error occurred';
                console.error(errorMsg);
                setSubscribe(false);
            }
        };
    
        fetchSubscription();
    }, [org_id, accessToken, users]);

    // if (!accessToken && !users) {
    //     console.log('Token not found');
    //     window.location.replace('/user/login')
    //     return;
    // }

    //Login user in order to subscribe
    const handleLogin = async (e) =>{
        e.preventDefault();
        await userLogin(username, password);
        if (loginMessage.slice(0,6)==="Welcome") {
            handleSubscribe()
        }
    }
    //Set unsubscribed if org is logged in
    useEffect(() => {
        if (org && accessToken) {
            setSubscribe(false);            
        }
    }, [])

    
    const handleSubscribe = async (e) => {
        // e.preventDefault();
        try {

            if(org && accessToken){
                logout()
                setShowModal(true)
                // window.location.reload()
            }
            
            
            if (!users && !accessToken) {
                setTimeout(() => {
                    // toast.error("Login to subscribe");
                    // window.location.replace('/user/login');
                    setShowModal(true);
                }, 2000);
                return;
            }
            if (accessToken && users){
                setShowModal(false)
                const config = {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                };
                const response = await axios.post(`/api/v1.0/subscription/${org_id}`, {}, config);
                if(response.status===200){    
                    Swal.fire({
                        title: "Subscription Successful",
                        text: `You have successfully subscribed to receive updates from ${campaign.organisation.orgName}.Thank you for your subscription!`,
                        icon: "success"
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.reload();
                        }
                    });                                                           
                }
           
            }        
            } catch (error) {
                    const errorMsg = error.response?.data?.error || 'An error occurred';
                    setErrors(errorMsg);
                    // setSubscribe(false);
                }
            };

            const handleUnsubscribe = async (e) => {
                e.preventDefault();
                const orgsnt = campaign.organisation.orgName
                Swal.fire({
                    title: 'Are you sure?',
                    text: `You are about to unsudscribe from ${orgsnt}!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Send!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        try {
                            // const accessToken = localStorage.getItem('token');
                            if (!accessToken && !users) {
                                // console.log('Token not found')
                                return;
                            }
                    
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            };
                            const response = axios.delete(`/api/v1.0/subscription/${org_id}`, config);
                            if(response.status===200){   
                                Swal.fire({
                                    title: `Unsubscribed from ${campaign.organisation.orgName} Updates`,
                                    text: `You have successfully unsubscribed from updates from ${campaign.organisation.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
                                    icon: "success"
                                }).then((result)=>{
                                    if(result.isConfirmed){
                                        window.location.reload();
                                    }
                                });                                                           
                            }
                            setSubscribe(false);
                        } catch (error) {
                            const errorMsg = error.response?.data?.error || 'An error occurred';
                            console.error(errorMsg);
                            setSubscribe(false);
                        }
                    }
                });
            };
            
    
    // const handleUnsubscribe = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // const accessToken = localStorage.getItem('token');
    //         if (!accessToken && !users) {
    //             // console.log('Token not found')
    //             return;
    //         }
    
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`
    //             }
    //         };
    //         const response = await axios.delete(`/api/v1.0/subscription/${org_id}`, config);
    //         if(response.status===200){   
                 
    //             Swal.fire({
    //                 title: `Unsubscribed from ${campaign.organisation.orgName} Updates`,
    //                 text: `You have successfully unsubscribed from updates from ${campaign.organisation.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
    //                 icon: "success"
    //               }).then((result)=>{
    //                 if(result.isConfirmed){
    //                     window.location.reload();
    //                 }
    //               });                                                           
    //         }
    //         setSubscribe(false);
    //     } catch (error) {
    //         const errorMsg = error.response?.data?.error || 'An error occurred';
    //         console.error(errorMsg);
    //         setSubscribe(false);
    //     }
    // };
    

    if (!campaign) {
        return <div className='sm:h-screen'><span className="loading loading-dots loading-lg"></span></div>;
    }


    const handleDonateButton = (e) => {
        e.preventDefault();
        // if start date  is less than current date disable button 
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if (currentDate < startDate) {
            toast.error("Campaign has not yet started");
        } else {
            let orgsnt= campaign.organisation.orgName
            let donorName= name ? name: "Anonymous"
            console.log(donorName)
            let phoneNo = phoneNum.replace(/^0+/, '');
            let phoneNumber = "254" + phoneNo;
            if (!phoneNum.match(phonePattern)) {
                setErrors('Invalid Phone Number')
            }
            else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: `You are about to send Kes ${amount} to ${orgsnt}!`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Send!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post ("/api/v1.0/express/donations",{phoneNumber,amount,donorName,campaignId:campaignId})
                        .then((res)=>{{
                            // console.log(res)
                            if(res.status===200){    
                                Swal.fire({
                                    title: res.data.message,
                                    text: "Check your phone and enter M-pesa pin!",
                                    icon: "success"
                                  }).then((result)=>{
                                    if(result.isConfirmed){
                                        window.location.reload();
                                    }
                                  });                                                           
                            }
                            else{
                                Swal.fire(
                                    'Error!',
                                    'The donation was not successiful. Try again',
                                    'error'
                                )
                            }
                            
                            // window.location.reload();
                        }})
                        .catch((err)=>{
                            const errorMsg = err.response?.data?.error || 'An error occurred';
                            setErrors(errorMsg);
                        })
                        
                    }
                })


            }           
        }
    };

    
    const handleDays = () => {
        // if current date < start date  return days remaining for campaingn to start
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if (currentDate < startDate) {
            // calculate days remaining
            const time = startDate.getTime() - currentDate.getTime();
            const days = Math.ceil(time / (1000 * 3600 * 24));
            return days;
        } else {
            // calculate days remaining for campaing to end 
            const endDate = new Date(campaign.endDate);
            const time = endDate.getTime() - currentDate.getTime();
            const days = Math.ceil(time / (1000 * 3600 * 24));
            return days;
        }
    };

    const socialShare = ()=>{
        return (
            <>
            <div className='mt-2'>
                <p>Share this campaign</p>
            </div>
            <div className='mt-0 flex space-x-3'>
                <WhatsappShareButton
                url={currentlWebUrl}
                title={`Join ${campaign.campaignName}'s campaign!\n\n\n By ${campaign.organisation.orgName}`}
                >
                    <WhatsappIcon className='h-8 w-8'/>
                </WhatsappShareButton>
                <FacebookShareButton
                url={currentlWebUrl}
                quote={`Join ${campaign.campaignName}'s campaign!\n\n${campaign.description}\n\n\nBy ${campaign.organisation.orgName}`}
                hashtag='#GiveForGood'
                >
                    <FacebookIcon className='h-8 w-8'/>
                </FacebookShareButton>
                <TwitterShareButton
                url={currentlWebUrl}
                title={`Join ${campaign.campaignName}'s campaign!\n\n${campaign.description}\n\n\nBy ${campaign.organisation.orgName} `}
                hashtags={['GiveForGood','msaadamashinani','ChangeForGood']}
                >
                    <TwitterIcon className='h-8 w-8'/>
                </TwitterShareButton>
                <TelegramShareButton
                url={currentlWebUrl}
                title={`${campaign.campaignName}`}
                >
                    <TelegramIcon className='h-8 w-8'/>
                </TelegramShareButton>
            </div>
            </>
        )
    }
    function getTotalAmount(donationsArray) {
        let totalAmount = 0;
        for (let donation of donationsArray) {
            totalAmount += donation.amount;
        }
        return totalAmount;
    }



  
       

    return (
        <div>
            <Menus/>
        <div className='text-black bg-white min-h-screen' id='campaign_dets'>
            <div className="text-md breadcrumbs ml-4">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/campaign'>Campaigns</a></li>
                    <li><a>{campaign.campaignName}</a></li>
                </ul>
            </div>
            <div className="container mx-auto">
                {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'> */}
                <div className=''>
                    <div className="lg:p-1">
                        {/* Campaign details */}
                        <div className="card card-side bg-base-100 grid grid-cols-1 rounded-lg p-4 h-full">
                            <h1 className="text-2xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
                            <figure className="overflow-hidden w-5/6"> <img className="h-96" src={campaign.banner} alt={campaign.campaignName} /></figure> 
                            <div className="p-2">
                                <div className='my-2'>
                                    {/* <h1 className=' text-lg font-semibold'>Agenda</h1> */}
                                    <p className="text-blue-600">{campaign.category.toUpperCase()}</p>
                                </div>
                                <div className='my-2'>
                                    <div className='flex justify-start items-center'>
                                        <div>
                                            <p className='text-xl'><span className='font-light'>Organised by </span>{campaign.organisation.orgName}</p>
                                        </div>
                                        <div className='ml-4'>

                                            {subscribe ? (
                                                <button className='bg-blue-600 border hover:bg-transparent hover:border-blue-600 border-blue-600 hover:text-black text-white font-bold py-2 px-4 rounded' onClick={handleUnsubscribe}>Subscribed</button>
                                            ) : (
                                                <button className='bg-blue-600 border hover:bg-transparent hover:border-blue-600 border-blue-600 hover:text-black text-white font-bold py-2 px-4 rounded' onClick={handleSubscribe}>Subscribe</button>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <div className='mt-1'>
                                    <p className=" text-red-500 font-semibold">{handleDays()} Days left</p>
                                </div>
                                {socialShare()}
                            </div>
                        </div>
                    </div>
                    <div className="lg:p-2">
                        <div className='bg-base-100 h-full rounded-lg lg:py-3'> 
                            <form onSubmit={handleDonateButton} className='px-8 bg-slate-50 py-3'>
                                <div className='text-black'>
                                    <h1 className="text-xl font-medium mt-3">Donation Form</h1>
                                
                                    <p className="mb-2">Please fill in the form to donate to this campaign.</p>
                                    </div>
                                    <div className='flex-col justify-center items-center'>
                                        <div>
                                            <label className=' text-black'>Personal Details</label>
                                            <input
                                                type="text"
                                                id="donor"
                                                placeholder='Your Name (Optional)'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white w-3/4"
                                                // required
                                            />
                                        </div>
                                
                                        <div className='my-3'>
                                            <label className=' text-black'><span className='text-red-500'>*</span>Phone Number</label> 
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder='eg 07xxxx or 011xxxx'
                                                maxLength={10}
                                                value={phoneNum}
                                                onChange={(e) => {
                                                    setPhoneNum(e.target.value);
                                                }}
                                                className="block w-3/4 text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
                                        </div>
                                        <div className='flex justify-start items-center'>
                                            <button onClick={(e)=>{ e.preventDefault(); setDonationAmount(100)}} className='p-2 rounded-xl border border-blue-600 mr-3 hover:text-white hover:bg-blue-600'>100</button>
                                            <button onClick={(e)=>{e.preventDefault(); setDonationAmount(300)}} className='p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600'>300</button>
                                            <button onClick={(e)=> {e.preventDefault(); setDonationAmount(500)}} className='p-2 rounded-xl border border-blue-600 mx-3 hover:text-white hover:bg-blue-600'>500</button>
                                            <button onClick={(e)=> {e.preventDefault(); setDonationAmount(1000)}} className='p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600'>1000</button>
                                        </div>

                                        <div className='my-3'>
                                            <label className=' text-black'><span className='text-red-500'>*</span>Donation Amount</label>
                                            <input
                                                type="number"
                                                id="donationAmount"
                                                placeholder='Enter amount'
                                                value={amount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                className="block w-3/4 text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
                                        </div>
                                        </div>
                                <div>
                                    {/* shows total donation amount */}
                                    <p>Total Donation: Ksh {amount}</p>
                                </div>
                                {errors && <p className='text-red-600 my-1'>{errors}</p>}
                                
                                <div className='flex justify-start'>
                                    <div>
                                        <button type="submit"
                                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-48 h-12 rounded mt-4 '>
                                                {loading ? "Submitting..." : "Submit"}
                                        </button>
                                    </div>
                                    <div>
                                        <img className="w-18 h-16 ml-12" src ="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="logo"/>
                                    </div>
                                    
                                </div>
                                {/* <div className='mt-3 flex justify-left'>
                                    <p className='text-success'>Contributions are sent directly to the creator of the campaign</p>
                                </div> */}
                            </form>
                            <div className='flex justify-between mx-4'>
                                {/* <div className='px-6 pt-6'>
                                    <h1 className='font-medium'>Total Donations</h1>
                                    <p className="font-medium mb-1 text-info">KES {getTotalAmount(campaign.donations)}</p>
                                </div> */}
                                <div className='px-6 pt-6'>
                                    <h1 className='font-medium'>Total Funds Raised</h1>
                                    <p className="font-medium mb-1 text-info">KES {getTotalAmount(campaign.donations)}</p>
                                </div>
                                <div className='px-6 pt-6'>
                                    <h1 className='font-medium'>Goal</h1>
                                    <p className="font-medium mb-1 text-info">KES {campaign.targetAmount}</p>
                                </div>
                            </div>
                            <div className='w-full flex justify-center'>
                                <progress className="progress progress-info w-3/4" value={getTotalAmount(campaign.donations)} max={campaign.targetAmount}></progress>
                            </div>
                         </div>

                    </div>
                </div> 
                
                <div className='my-4'>
                    <h1 className='text-xl font-bold'>Campaign Details</h1>
                    <p className='text-gray-600'>{campaign.description}</p>
                </div>
                

                {/* <div className='mt-6 bg-base-100 p-4 rounded-lg'>
                <div role="tablist" className="tabs tabs-lifted tabs-lg">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl font-semibold w-fit" aria-label="Description" checked/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <p className="my-4 text-lg">{campaign.description}</p>
                        {socialShare()}
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl font-semibold" aria-label="Organiser"/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div>
                            <div className='flex justify-start'>
                                <div>
                                    <p>Organiser</p>
                                    <p className='text-xl mb-3'>{campaign.organisation.orgName}</p>
                                </div>
                                
                                
                                <div className='ml-8'>
                               
                                    {subscribe ? (
                                        <button className='btn btn-success' onClick={handleUnsubscribe}>Subscribed</button>
                                    ) : (
                                        <button className='btn btn-primary btn-outline h-3' onClick={handleSubscribe}>Subscribe</button>
                                    )}
                                </div>
                            </div>
                            <p>Address</p>
                            <p className='text-xl mb-3'>{campaign.organisation.orgAddress}</p>
                            <p>About</p>
                            <p className='text-xl'>{campaign.organisation.orgDescription ? campaign.organisation.orgDescription : 'Currently not available'}</p>
                        </div>
                        
                    </div>
                </div>
               
                   
                </div> */}
                

                    {/* </Popup> */}               
            </div>
            <Toaster position = "top-center" reverseOrder={false} />
           <Featured/>
            
        </div>
        <dialog open={showModal} onClose={() => setShowModal(false)} className="modal flex-row justify-center items-center text-center">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Please Log in</h3>
                        {/* <div className="modal-action"> */}
                        {loginMessage&& <p className='text-red-500'>{loginMessage}</p>}
                        <form className='flex justify-center items-center' onSubmit={handleLogin}>
                            <div className='flex-col justify-center items-center pl-4 pr-8'>
                                <div className='my-4'>
                                    <label className="font-semibold my-3" htmlFor="password">Username or E-Mail</label>
                                    <input
                                        className="input input-bordered w-full placeholder:bg-slate-400 bg-gray-100"
                                        onChange={(e) => setUserName(e.target.value)}
                                        value={username}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold mb-4" htmlFor="password"><span className='text-red-500'>*</span>Enter Pin</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="input input-bordered w-full"
                                        id="pin"
                                        type="password"
                                        placeholder='password'
                                        name="pin"
                                        required
                                    />
                                </div>
                                <div>
                                    <button type='submit' className="btn my-4">Log in</button>
                                </div>
                            </div>
                        </form>
                        <button onClick={() => { setShowModal(false)}} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                        {/* </div> */}
                    </div>
                </dialog>
        <Footer/>
        </div>

    );
}

export default CampainDetails;