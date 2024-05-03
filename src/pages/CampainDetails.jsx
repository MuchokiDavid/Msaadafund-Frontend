import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import Featured from '../components/campaigns/Featured';
import logos from  "../assets/mpesa.jpg";
import { useNavigate } from 'react-router-dom';
import { 
FacebookShareButton,FacebookIcon, 
WhatsappShareButton,WhatsappIcon,
TwitterShareButton, TwitterIcon,
TelegramShareButton,TelegramIcon
} from 'react-share';

function CampainDetails() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [amount, setDonationAmount] = useState(5);
    const [phoneNum, setPhoneNum] = useState("");
    const [donationForm, setDonationForm] = useState(false);
    const [submit, setSubmitMessage] = useState();
    const [errors, setErrors] = useState();
    const phonePattern = /^(07|01)\d{8}$/;
    // const  navigate = useNavigate();
    const [loading, setLoading]= useState(false)
    // const currentlWebUrl= window.location.href
    const currentlWebUrl= `https://joker.vercel.app${window.location.pathname}`

    useEffect(() => {
        // Fetch campaign details using campaignId
        const fetchCampaign= ()=>{
            setLoading(true)
            fetch(`/api/v1.0/campaign/${campaignId}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setCampaign(data);
            })
            .catch(error => console.error('Error fetching campaign details:', error));
        }

        fetchCampaign();

        // const intervalId = setInterval(fetchCampaign, 15000);//Polling done here to fetch campaign
        // return () => clearInterval(intervalId);

    }, [campaignId]);

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
            setSubmitMessage()
        } else {
            let phoneNo = phoneNum.replace(/^0+/, '');
            let phoneNumber = "254" + phoneNo;
            if (!phoneNum.match(phonePattern)) {
                setErrors('Invalid Phone Number')
            }
            else {
                axios.post ("/api/v1.0/express/donations",{phoneNumber,amount,campaignId:campaignId})
                .then((res)=>{
                    // console.log(res)
                    toast.success(res.data.message)
                setDonationAmount("");
                setPhoneNum("");
                setErrors("")
                setLoading(false)
                })
                .catch ((err)=>{  
                    console.log(err)   
                    // get error message from err.response.data.message
                    toast.error("Donation failed, Try again!")
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
    // console.log(campaign)

    return (
        <div>
            <Menus/>
        <div className='text-black bg-white' id='campaign_dets'>
            <div className="text-md breadcrumbs ml-4">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/campaign'>Campaigns</a></li>
                    <li><a>{campaign.campaignName}</a></li>
                </ul>
            </div>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <div class="lg:p-1">
                        {/* Campaign details */}
                        <div className="card card-side bg-base-100 grid grid-cols-1 rounded-lg p-4 h-full">
                            <h1 className="text-2xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
                            <figure className="overflow-hidden"> <img className="h-80" src={campaign.banner} alt={campaign.campaignName} /></figure> 
                            <div className="p-2">
                                
                                <div className='mt-0'>
                                    <h1 className=' text-lg font-semibold'>Agenda</h1>
                                    <p className="text-gray-600">{campaign.category.toUpperCase()}</p>
                                </div>
                                <div className='mt-1'>
                                    <p className=" text-red-500 font-semibold">{handleDays()} Days left</p>
                                </div>
                                {socialShare()}
                            </div>
                        </div>
                    </div>
                    <div class="lg:p-2">
                        <div className='bg-base-100 h-full rounded-lg lg:py-3'> 
                            <form onSubmit={handleDonateButton} className='px-8'>
                                <div className='text-black'>
                                    <h1 className="text-xl font-medium mt-3">Donation Form</h1>
                                
                                    <p className="mb-4">Please fill in the form to donate to this campaign.</p>
                                    </div>
                                    <div className='flex-col justify-center items-center'>
                                
                                        <div>
                                            <label className=' text-black'>Phone Number</label> 
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder='eg 07xxxx or 011xxxx'
                                                maxLength={10}
                                                value={phoneNum}
                                                onChange={(e) => {
                                                    setPhoneNum(e.target.value);
                                                }}
                                                className="block text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
                                        </div>
                                        <div className='flex justify-start items-center my-3'>
                                            <button onClick={(e)=>{ e.preventDefault(); setDonationAmount(100)}} className='p-2 rounded-xl border border-blue-600 mr-3 hover:text-white hover:bg-blue-600'>100</button>
                                            <button onClick={(e)=>{e.preventDefault(); setDonationAmount(300)}} className='p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600'>300</button>
                                            <button onClick={(e)=> {e.preventDefault(); setDonationAmount(500)}} className='p-2 rounded-xl border border-blue-600 mx-3 hover:text-white hover:bg-blue-600'>500</button>
                                            <button onClick={(e)=> {e.preventDefault(); setDonationAmount(1000)}} className='p-2 rounded-xl border border-blue-600 hover:text-white hover:bg-blue-600'>1000</button>
                                        </div>

                                        <div>
                                            <label className=' text-black'>Donation Amount</label>
                                            <input
                                                type="number"
                                                id="donationAmount"
                                                placeholder='Enter amount'
                                                value={amount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                className="block text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 '>
                                                {loading ? "Loading..." : "Submit"}
                                        </button>
                                    </div>
                                    <div>
                                        <img class="w-18 h-16 ml-12" src ="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="logo"/>
                                    </div>
                                    
                                </div>
                                <div className='mt-3 flex justify-left'>
                                    <p className='text-red-700'>After submitting please check your phone to authorize Mpesa charge. Enter PIN to complete transaction</p>
                                </div>
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

                <div className='mt-6 bg-base-100 p-4 rounded-lg'>
                <div role="tablist" className="tabs tabs-lifted tabs-lg">
                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl font-semibold w-fit" aria-label="Description" checked/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <p className="my-4 text-lg">{campaign.description}</p>
                        {socialShare()}
                    </div>

                    <input type="radio" name="my_tabs_2" role="tab" className="tab text-xl font-semibold" aria-label="Organiser"/>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <div>
                            <p>Name</p>
                            <p className='text-xl mb-3'>{campaign.organisation.orgName}</p>
                            <p>Address</p>
                            <p className='text-xl mb-3'>{campaign.organisation.orgAddress}</p>
                            <p>About</p>
                            <p className='text-xl'>{campaign.organisation.orgDescription ? campaign.organisation.orgDescription : 'Currently not available'}</p>
                        </div>
                    </div>
                </div>
                   
                </div>
                

                    {/* </Popup> */}               
            </div>
            <Toaster position = "top-center" reverseOrder={false} />
           <Featured/>
            
        </div>
       
        <Footer/>
        </div>

    );
}

export default CampainDetails;