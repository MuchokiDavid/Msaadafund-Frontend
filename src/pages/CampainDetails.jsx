import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import Featured from '../components/campaigns/Featured';
import { useNavigate } from 'react-router-dom';

import { 
FacebookShareButton,FacebookIcon, 
WhatsappShareButton,WhatsappIcon,
TwitterShareButton, TwitterIcon,
TelegramShareButton,TelegramIcon
} from 'react-share';
import Swal from 'sweetalert2';
import { useAuth } from '../context/usersContext';
import Card from './Card';

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
    const [email,setEmail]= useState("")
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
    const navigate= useNavigate()

    useEffect(() => {
     setName(users)
    }, [users,accessToken])
    
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
        if (users && accessToken && org_id) {
          const fetchSubscription = async () => {
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              };
              const response = await axios.get(`/api/v1.0/subscription/${org_id}`, config);
              if (response.status === 200) { // Check response status
                setSubscribe(true);
              }
              // Note: If response status is not 200, then there are no subscriptions found.
            } catch (error) {
              const errorMsg = error.response?.data?.error || 'An error occurred';
              console.error(errorMsg);
              setSubscribe(false);
            }
          };
    
          fetchSubscription();
        }
      }, [org_id, users, accessToken]);


   //Login user in order to subscribe
    const handleLogin = async (e) =>{
        e.preventDefault();
        await userLogin(username, password);
        if (loginMessage.slice(0,6)==="Welcome") {
        }
    }
 
    
    const handleSubscribe = async () => {
        try {
            if (org) {
                logout();
                setShowModal(true);
            }
    
            if (!users && !accessToken) {
                setShowModal(true);
                return;
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };
    
            const response = await axios.post(`/api/v1.0/subscription/${org_id}`, {}, config);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Subscribing...',
                    text: 'Please wait while we subscribe you to updates.',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    Swal.fire({
                        title: "Subscription Successful",
                        text: `You have successfully subscribed to receive updates from ${campaign.organisation.orgName}. Thank you for your subscription!`,
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'An error occurred';
            setErrors(errorMsg);
            // setSubscribe(false);
        }
    };
    

            const handleUnsubscribe = async (e) => {
                e.preventDefault();
                const orgsnt = campaign.organisation.orgName;
                Swal.fire({
                    title: 'Unsubscribe?',
                    text: `Are you sure you want to unsubscribe from ${orgsnt}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const config = {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            };
                            // Await the axios.delete call
                            const response = await axios.delete(`/api/v1.0/subscription/${org_id}`, config);
                            if (response.status === 200) {
                                // Show success message
                                await Swal.fire({
                                    title: `Unsubscribed from ${campaign.organisation.orgName} Updates`,
                                    text: `You have successfully unsubscribed from updates from ${campaign.organisation.orgName}. If you change your mind, you can always subscribe later. Thank you for your support.`,
                                    icon: "success"
                                });
                                // Reload the page or perform any other necessary action
                                window.location.reload();
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
            
    
    

    if (!campaign) {
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


    const handleDonateButton = (e) => {
        e.preventDefault();
        setErrors('')
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };
        // if start date  is less than current date disable button 
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if (currentDate < startDate) {
            toast.error("Campaign has not yet started");
        } else {
            let orgsnt= campaign.organisation.orgName
            let donorName= name ? name: "Anonymous"
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
                        if (users && accessToken){
                            axios.post('/api/v1.0/user/donations',{donorName:name,amount,campaignId:campaignId,phoneNumber},config)
                            .then((res)=>{
                                if(res.status===200){
                                    Swal.fire({
                                        title: res.data.message,
                                        text: "Check your phoneNumbers and and enter M-pesa pin!",
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
                            })

                        }
                        else{
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
                   
                        
                    }
                })


            }           
        }
    };

    //axios to post data for donations via card
    const handleDonateCard = (e) => {
        e.preventDefault();
        setErrors('')
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };
        // if start date  is less than current date disable button 
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if (currentDate < startDate) {
            toast.error("Campaign has not yet started");
        } else {
            let orgsnt= campaign.organisation.orgName
            let donorName= name ? name: "Anonymous"
            const international_phone_pattern= /^\d{1,4}?\d{3,14}$/
            if (!phoneNum.match(international_phone_pattern)) {
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
                        // if (users && accessToken){
                        //     axios.post('/api/v1.0/user/donations',{donorName:name,amount,campaignId:campaignId,phoneNumber:phoneNum},config)
                        //     .then((res)=>{
                        //         if(res.status===200){

                        //             Swal.fire({
                        //                 title: res.data.message,
                        //                 text: "Check your phoneNumbers and and enter M-pesa pin!",
                        //                 icon: "success"
                        //               }).then((result)=>{
                        //                 if(result.isConfirmed){
                        //                     window.location.reload();
                        //                 }
                        //               });
                        //         }
                        //         else{
                        //             Swal.fire(
                        //                 'Error!',
                        //                 'The donation was not successiful. Try again',
                        //                 'error'
                        //             )
                        //         }
                        //     })

                        // }
                        // else{
                            axios.post ("/api/v1.0/donate_card",{phoneNumber:phoneNum,email:email,amount,campaignId:campaignId})
                            .then((res)=>{{
                                // console.log(res)
                                if(res.status===200){  
                                    window.location.replace(res.data.url)                                                         
                                }
                                else{
                                    Swal.fire(
                                        'Error!',
                                        'The request was not successiful. Try again',
                                        'error'
                                    )
                                }
                                
                                // window.location.reload();
                            }})
                            .catch((err)=>{
                                const errorMsg = err.response?.data?.error || 'An error occurred';
                                setErrors(errorMsg);
                            })
                            
                        // }                   
                        
                    }
                })


            }           
        }
    }

    
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
            <div className='my-2'>
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
    //    console.log(campaign)

    return (
        <div>
        <Menus/>
        <div className='text-black bg-slate-50 min-h-screen' id='campaign_dets'>
            <div className="text-md breadcrumbs ml-4">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/campaign'>Campaigns</a></li>
                    <li><a>{campaign.campaignName}</a></li>
                </ul>
            </div>
            <div className="container mx-auto">
                {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'> */}
                <div class="flex flex-col lg:flex-row gap-3">
                    <div class="h-full lg:w-2/3 ">
                        <div class="relative rounded-lg">
                            {/* banner */}
                            <img className="h-96 min-w-full" src={campaign.banner} alt={campaign.campaignName} /> 
                        </div>
                    </div>
                    <div class="h-full lg:w-1/3">
                        <Card 
                        orgDetails={campaign.organisation} 
                        raisedAmount= {getTotalAmount(campaign.donations)} 
                        budget= {campaign.targetAmount}
                        subscribe= {subscribe}
                        handleSubscribe={handleSubscribe}
                        handleUnsubscribe={handleUnsubscribe}
                        />
                    </div>
                </div>
                
                <div className=''>
                    <div className="lg:p-1">
                        {/* Campaign details */}
                        <div className="card card-side bg-base-100 grid grid-cols-1 rounded-lg px-4 h-full">
                        <div class="flex">
                        </div>
                            {/* <figure className="overflow-hidden w-full"> <img className="h-96" src={campaign.banner} alt={campaign.campaignName} /></figure>  */}
                            <div className="px-2 pt-4">
                                <div className=''>
                                    {/* <h1 className=' text-lg font-semibold'>Agenda</h1> */}
                                    <p className="text-blue-600">{campaign.category.toUpperCase()}</p>
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold mb-2">{campaign.campaignName.toUpperCase()}</h1>
                                </div>
                                <div>
                                    <p className=" text-red-500 font-semibold">{handleDays()} Days left</p>
                                </div>

                                <div className='my-2'>
                                    <p className='text-gray-600'>{campaign.description}</p>
                                </div>
                                <div className='mb-4'>
                                    {socialShare()}
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div role="tablist" className="tabs tabs-lifted my-4">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab font-semibold" aria-label="M_PESA" checked/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        {/* Mpesa form tab */}
                            <div>
                                <div className='h-full rounded-lg'> 
                                    <form onSubmit={handleDonateButton} className='w-full rounded-xl'>
                                        <div className='text-black'>
                                            <h1 className="text-xl font-medium mt-0">Donate via M-Pesa</h1>
                                        
                                            <p className="my-2">Please fill all field with <span className='text-red-500'>*</span> in the form to donate to this campaign.</p>
                                            </div>
                                            <div className='flex-col justify-center items-center'>
                                                <div>
                                                    <label className=' text-black'>Personal Details</label>
                                                    <input
                                                        type="text"
                                                        id="donor"
                                                        placeholder='Your Name (Optional)'
                                                        value={name}
                                                        onChange={(e) =>setName(e.target.value)}
                                                        className="block text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white w-full"
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
                                                        className="block w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                                        className="block w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                            
                                        </div>
                                        {/* <div className='mt-3 flex justify-left'>
                                            <p className='text-success'>Contributions are sent directly to the creator of the campaign</p>
                                        </div> */}
                                    </form>
                                </div>

                            </div>
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tab font-semibold" aria-label="CARD" checked/>
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            {/* Tab content 2 */}
                            <div>
                                <div className='h-full rounded-lg'> 
                                    <form onSubmit={handleDonateCard} className='w-full rounded-xl'>
                                        <div className='text-black'>
                                            <h1 className="text-xl font-medium mt-0">Donate via Card/M-Pesa</h1>
                                        
                                            <p className="my-2">Please fill all field with <span className='text-red-500'>*</span> in the form to donate to this campaign.</p>
                                            </div>                                           
                                            <div className='flex-col justify-center items-center'>
                                                <div>
                                                    <label className=' text-black'>Personal Details</label>
                                                    <input
                                                        type="text"
                                                        placeholder='Your Name (Optional)'
                                                        value={name}
                                                        id='cardName'
                                                        onChange={(e) =>setName(e.target.value)}
                                                        className="block text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white w-full"
                                                        // required
                                                    />
                                                </div>
                                        
                                                <div className='my-3'>
                                                    <label className=' text-black'><span className='text-red-500'>*</span>Phone Number</label> 
                                                    <input
                                                        type="tel"
                                                        placeholder='254xxxxxxxxx'
                                                        id='cardPhone'
                                                        value={phoneNum}
                                                        onChange={(e) => {
                                                            setPhoneNum(e.target.value);
                                                        }}
                                                        className="block w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                                        placeholder='Enter amount'
                                                        id='card-amount'
                                                        value={amount}
                                                        onChange={(e) => setDonationAmount(e.target.value)}
                                                        className="block w-full text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                            
                                        </div>
                                        {/* <div className='mt-3 flex justify-left'>
                                            <p className='text-success'>Contributions are sent directly to the creator of the campaign</p>
                                        </div> */}
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>


                </div> 
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
                                        className="input input-bordered w-full"
                                        onChange={(e) => setUserName(e.target.value)}
                                        value={username}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="font-semibold mb-4" htmlFor="password"><span className='text-red-500'>*</span>Enter Password</label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="input input-bordered w-full"
                                        id="password"
                                        type="password"
                                        placeholder='password'
                                        name="password"
                                        required
                                        autoComplete=''
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