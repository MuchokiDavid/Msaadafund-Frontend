import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';
import Featured from '../components/home/Featured';
import logos from  "../assets/mpesa.jpg";
import { useNavigate } from 'react-router-dom';

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
        if (!phoneNum.match(phonePattern)) {
            setErrors('Invalid Phone Number')
        }
        else{
            let phoneNo = phoneNum.replace(/^0+/, '');
            let phoneNumber = "254" + phoneNo;
            axios.post ("/api/v1.0/express/donations",{phoneNumber,amount,campaignId:campaignId})
            .then((res)=>{
                console.log(res)
                // toast.success(res.data.message)
            setDonationAmount("");
            setPhoneNum("");
            })
            .catch ((err)=>{  
                console.log(err)   
                // get error message from err.response.data.message
                toast.error("Donation failed, Try again!")
            })
        }
        
        
    };

    const handleUserLogIn= () =>{
        setTimeout(() => {
            navigate('/user/login')
        }, 2000);
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
    console.log(campaign)

    return (
        <div>
            <Menus/>
        <div className='text-black dark:text-white'>
            <div className="text-md breadcrumbs ml-4">
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/campaign'>Campaigns</a></li>
                    <li><a>{campaign.campaignName}</a></li>
                </ul>
            </div>
            <div className="container mx-auto p-3">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div class="p-1">
                        {/* Campaign details */}
                <div className="card card-side bg-base-100 w-auto grid grid-cols-1">
                <figure className="overflow-hidden"> <img className="h-80 w-full" src={campaign.banner} alt={campaign.campaignName} /></figure> 
                <div className="p-2">

                <h1 className="text-2xl font-bold">{campaign.campaignName.toUpperCase()}</h1>
                <div className='mt-2'>
                        <h1 className=' text-lg font-semibold'>Organisation</h1>
                        <a href='#'><p className="text-gray-600 hover:text-blue-900">{campaign.organisation.orgName.toUpperCase()}</p></a>{/*Put link to organisation here */}
                     </div>
                    <div className='mt-1'>
                        <h1 className=' text-lg font-semibold'>Campaign Agenda</h1>
                        <p className="text-gray-600">{campaign.category.toUpperCase()}</p>
                     </div>
                     <div className='mt-1'>
                         <p className=" text-red-500 dark:text-red-500 font-semibold">{handleDays()} Days left</p>
                     </div>
                     <div className='mt-1'>
                        <h1 className='text-lg font-semibold'>Budget:</h1>
                        <p className="text-lg font-bold text-green-500 mb-4">Ksh {campaign.targetAmount}/=</p>
                     </div>
                     <div className='mt-2'>
                    <button
                        onClick={handleUserLogIn}
                        className='bg-emerald-800 text-white font-bold py-2 px-4 rounded w-fit'
                    >
                        Subscribe
                    </button>
                    </div>
                    </div>
                    </div>

                    </div>
                    <div class="p-2">
                        {/* Donation Accordion */}
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">
                            Donate via Mpesa
                        </div>
                        <div className="collapse-content"> 
                        <form onSubmit={handleDonation}>
                            <div className='text-black dark:text-dark'>
                                {/* <h1 className="text-3xl font-bold mb-4">Donation Form</h1> */}
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
                                            className="block text-black dark:text-black w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                            className="block text-black dark:text-black w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                    className='bg-emerald-800 text-white font-bold py-2 px-4 rounded mt-4 '>
                                    Submit Donation
                                </button>
                            </div>
                            <div className='mt-3 flex justify-left'>
                                <p className='text-red-700'>After submitting please check your phone to authorize Mpesa charge. Enter PIN to complete transaction</p>
                            </div>

                            </form>
                        </div>
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
                        </div>

                    </div>
                </div>

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
                                                className="block text-black dark:text-black w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                                                className="block text-black dark:text-black w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
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
                        <div className='mt-6'>
                        <h2 className="text-3xl font-bold mb-4 mt-2 underline underline-offset-8">Campaign Description</h2>
                        <p className="mb-4 text-lg">{campaign.description}</p>
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
