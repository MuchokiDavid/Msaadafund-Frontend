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
    const  navigate = useNavigate();
    const [loading, setLoading]= useState(false)
    // const currentlWebUrl= window.location.href
    const currentlWebUrl= `https://joker.vercel.app${window.location.pathname}`

    useEffect(() => {
        // Fetch campaign details using campaignId
        fetch(`/campaign/${campaignId}`)
            .then(response => response.json())
            .then(data => {
                setCampaign(data);
            })
            .catch(error => console.error('Error fetching campaign details:', error));
    }, [campaignId]);

    if (!campaign) {
        return <div className='sm:h-screen'><span className="loading loading-dots loading-lg"></span></div>;
    }

    const handleDonateButton = () => {
        // if start date  is less than current date disable button 
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if (currentDate < startDate) {
            toast.error("Campaign has not yet started");
            setSubmitMessage()
        } else {
            // return input field
            setDonationForm(true);
            // console.log("can donate");
        }
    };

    const handleDonation = (e) => {
        e.preventDefault();
        setLoading(true)
        if (!phoneNum.match(phonePattern)) {
            setErrors('Invalid Phone Number')
        }
        else{
            let phoneNo = phoneNum.replace(/^0+/, '');
            let phoneNumber = "254" + phoneNo;
            axios.post ("/api/v1.0/express/donations",{phoneNumber,amount,campaignId:campaignId})
            .then((res)=>{
                // console.log(res)
                // toast.success(res.data.message)
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
    console.log(campaign)

    return (
        <div>
            <Menus/>
        <div className='text-black bg-slate-100'>
            <div className="text-md breadcrumbs ml-4 mt-16">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/campaign'>Campaigns</a></li>
                    <li><a>{campaign.campaignName}</a></li>
                </ul>
            </div>
            <div className="container mx-auto">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    <div class="p-1">
                        {/* Campaign details */}
                        <div className="card card-side bg-base-100 grid grid-cols-1 rounded-lg p-4 h-full">
                            <h1 className="text-2xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
                            <figure className="overflow-hidden"> <img className="h-80" src={campaign.banner} alt={campaign.campaignName} /></figure> 
                            <div className="p-2">
                                
                                {/* <div className='mt-1'>
                                    <h1 className=' text-lg font-semibold'>Organiser</h1>
                                    <a href='#'><p className="text-gray-600 hover:text-blue-900">{campaign.organisation.orgName.toUpperCase()}</p></a>{/*Put link to organisation here
                                </div> */}
                                <div className='mt-0'>
                                    <h1 className=' text-lg font-semibold'>Agenda</h1>
                                    <p className="text-gray-600">{campaign.category.toUpperCase()}</p>
                                </div>
                                <div className='mt-1'>
                                    <p className=" text-red-500 dark:text-red-500 font-semibold">{handleDays()} Days left</p>
                                </div>
                                {socialShare()}
                            </div>
                        </div>
                    </div>
                    <div class="p-2">
                        {/* Donation Accordion */}
                    {/* <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">
                            Donate via Mpesa
                        </div>
                        <div className="collapse-content">*/} 
                        <div className='bg-base-100 h-full rounded-lg'> 
                        
                        <form onSubmit={handleDonation} className='p-4'>
                            <div className='text-black'>
                                {/* <h1 className="text-3xl font-bold mb-4">Donation Form</h1> */}
                                <div className='m-4'>
                                    <h1 className='text-xl font-semibold'>Goal</h1>
                                    <p className="text-2xl font-bold text-green-500 mb-1">KES {campaign.targetAmount}</p>
                                </div>
                                <img class="w-18 h-16 mr-2" src ={logos} alt="logo"/>
                                <p className="mb-4">Please fill in the form to donate to this campaign.</p>
                                </div>
                                <div className='flex-col justify-center items-center'>
                                    <div className='mb-4'>
                                        <label className=' text-black dark:text-black'>Phone Number:</label> 
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            placeholder='eg 07xxxx or 011xxxx'
                                            maxLength={10}
                                            value={phoneNum}
                                            onChange={(e) => {
                                                setPhoneNum(e.target.value);
                                            }}
                                            className="block text-black dark:text-black px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
                                            required
                                        />
                                        {errors && <p className='text-red-600'>{errors}</p>}
                                    </div>

                                    <div>
                                        <label className=' text-black dark:text-black'>Donation Amount:</label>
                                        <input
                                            type="number"
                                            id="donationAmount"
                                            placeholder='Enter amount'
                                            value={amount}
                                            onChange={(e) => setDonationAmount(e.target.value)}
                                            className="block text-black dark:text-black px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
                                            required
                                        />
                                    </div>
                                    </div>
                            <div>
                                {/* shows total donation amount */}
                                <p>Total Donation: Ksh {amount}</p>
                            </div>
                            
                            <div>
                                <button type="submit"
                                    className='bg-emerald-800 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4 '>
                                        {loading ? "Loading..." : "Submit"}
                                </button>
                            </div>
                            <div className='mt-3 flex justify-left'>
                                <p className='text-red-700'>After submitting please check your phone to authorize Mpesa charge. Enter PIN to complete transaction</p>
                            </div>

                            </form>
                         </div>
                       {/*</div> 
                       </div>
                        <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" /> 
                        <div className="collapse-title text-xl font-medium">
                            Paypal
                        </div>
                        <div className="collapse-content"> 
                            <p>Currently not available</p>
                        </div>
                        </div>
                        <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" /> 
                        <div className="collapse-title text-xl font-medium">
                            Card Payment (Online)
                        </div>
                        <div className="collapse-content"> 
                            <p>Currently not available</p>
                        </div>
                        </div>*/}

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
                            <p className='text-xl'>{campaign.organisation.orgName}</p><br/>
                            <p>Address</p>
                            <p className='text-xl'>{campaign.organisation.orgAddress}</p><br/>
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



                    {/* <Popup open={donationForm} onClose={() => setDonationForm(false)} modal> */}
                        {/* style the modal content */}
                        {/* <dialog open={donationForm} onClose={() => setDonationForm(false)} className='modal'>

                            <div className='modal-box bg-white'>
                                <form onSubmit={handleDonation}>
                                <div className='text-black dark:text-dark'>
                                    <h1 className="text-3xl font-bold mb-4">Donation Form</h1>
                                    <img class="w-18 h-16 mr-2" src ={logos} alt="logo"/>
                                    <p className="mb-4">Please fill in the form to donate to this campaign.</p>
                                    </div>
                                    <div className='flex-col justify-center items-center'>
                                        <div className='mb-4'>
                                            <label className=' text-black dark:text-black'>Phone Number:</label> 
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder='PhoneNumber eg 07xxxx or 011xxxx'
                                                maxLength={10}
                                                value={phoneNum}
                                                onChange={(e) => {
                                                    // Remove leading zeros
                                                    // let formattedNumber = e.target.value.replace(/^0+/, '');
                                                    // Check if the number starts with '254', if not, prepend it
                                                    // if (!formattedNumber.startsWith('254')) {
                                                    //     formattedNumber = '254' + formattedNumber;
                                                    // }
                                                    // if (formattedNumber.length >= 12) {
                                                    //     formattedNumber = formattedNumber.slice(0, 11);
                                                    // }
                                                    // Update state with the formatted number
                                                    setPhoneNum(e.target.value);
                                                }}
                                                className="block text-black dark:text-black px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
                                            {errors && <p className='text-red-600'>{errors}</p>}
                                        </div>

                                        <div>
                                            <label className=' text-black dark:text-black'>Donation Amount:</label>
                                            <input
                                                type="number"
                                                id="donationAmount"
                                                placeholder='Enter your donation amount'
                                                value={amount}
                                                onChange={(e) => setDonationAmount(e.target.value)}
                                                className="block text-black dark:text-black px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
                                        </div>
                                        </div>
                                <div>
                                    {/* shows total donation amount
                                    <p>Total Donation: Ksh {amount}</p>
                                </div>
                                <div>
                                    <p></p>
                                </div>

                                <div>
                                    <button type="submit"
                                        className='bg-emerald-800 text-white font-bold py-2 px-4 rounded mt-4 '>
                                        Submit Donation
                                    </button>
                                </div>
                            </form>
                            <button className="btn btn-sm btn-circle absolute right-2 top-2 bg-white dark:bg-black" onClick={() => setDonationForm(false)}>X</button>
                        </div>
                         </dialog> */}