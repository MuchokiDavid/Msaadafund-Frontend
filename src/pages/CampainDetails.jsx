import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import axios from 'axios'
import {toast,Toaster} from 'react-hot-toast'
import Menus from '../components/reusables/Menus';
import Footer from '../components/reusables/Footer';




function CampainDetails() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [amount, setDonationAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [donationForm, setDonationForm] = useState(false);
    const [submit, setSubmitMessage] = useState();

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
        return <div>Loading...</div>;
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
        axios.post ("/api/v1.0/express/donations",{phoneNumber,amount,campaignId:campaignId})
        .then((res)=>{
            console.log(res)
            // toast.success(res.data.message)
        setDonationAmount("");
        setPhoneNumber("");
        })
        .catch ((err)=>{  
            console.log(err)   
            // get error message from err.response.data.message
            toast.error("Donation failed, Try again!")


        })
        
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

    return (
        <div>
            <Menus/>
        <div className='text-black dark:text-white'>
            <div className="container mx-auto p-4">
            <div className="card card-side bg-base-100 shadow-xl w-auto">
                <figure className="overflow-hidden"> <img className="w-80 h-80" src={campaign.banner} alt={campaign.campaignName} /></figure> 
                <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
                    <div className='mt-4'>
                        <h1 className=' text-lg font-semibold'>Campaign Agenda</h1>
                        <p className="text-gray-600">{campaign.category.toUpperCase()}</p>
                     </div>
                     <div className='mt-4'>
                         <p className=" text-red-500 dark:text-red-500 font-semibold">{handleDays()} Days left</p>
                     </div>
                     <div className='mt-4'>
                        <h1 className='text-lg font-semibold'>Budget:</h1>
                        <p className="text-lg font-bold text-green-500 mb-4">Ksh {campaign.targetAmount}/=</p>
                     </div>
                     <div className='mt-6'>
                    <button
                        onClick={handleDonateButton}
                        className='bg-emerald-800 text-white font-bold py-2 px-4 rounded'
                    >
                        Donate
                    </button>
                    </div>
                    </div>
                    </div>


                    {/* <Popup open={donationForm} onClose={() => setDonationForm(false)} modal> */}
                        {/* style the modal content */}
                        <dialog open={donationForm} onClose={() => setDonationForm(false)} className='modal'>

                        {/* <div> */}
                            <div className='modal-box bg-white'>
                                <form onSubmit={handleDonation}>
                                <div className='text-black dark:text-dark'>
                                    <h1 className="text-3xl font-bold mb-4">Donation Form</h1>
                                    <p className="mb-4">Please fill in the form to donate to this campaign.</p>
                                    </div>
                                    <div className='flex-col justify-center items-center'>
                                        <div className='mb-4'>
                                            <label className=' text-black dark:text-black'>Phone Number:</label> 
                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder='Enter your PhoneNumber'
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    // Remove leading zeros
                                                    let formattedNumber = e.target.value.replace(/^0+/, '');
                                                    // Check if the number starts with '254', if not, prepend it
                                                    if (!formattedNumber.startsWith('254')) {
                                                        formattedNumber = '254' + formattedNumber;
                                                    }
                                                    if (formattedNumber.length >= 12) {
                                                        formattedNumber = formattedNumber.slice(0, 11);
                                                    }
                                                    // Update state with the formatted number
                                                    setPhoneNumber(formattedNumber);
                                                }}
                                                className="block text-black dark:text-black w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600 bg-white"
                                                required
                                            />
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
                                    {/* shows total donation amount */}
                                    <p>Total Donation: Ksh {amount}</p>
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
                         </dialog>
                        <div className='mt-8'>
                        <h1 className="text-3xl font-bold mb-4 mt-2 underline underline-offset-8">Campaign Description</h1>
                        <p className="mb-4 text-lg">{campaign.description}</p>
                       </div>

                    {/* </Popup> */}               
            </div>
            <Toaster position = "top-center" reverseOrder={false} />
        </div>
        <Footer/>
        </div>

    );
}

export default CampainDetails;
