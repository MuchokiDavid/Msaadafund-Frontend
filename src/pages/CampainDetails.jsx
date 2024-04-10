import { useParams } from 'react-router-dom'
import React,{useEffect,useState} from 'react'

function CampainDetails() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [donationAmount, setDonationAmount] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [donationForm,setDonationForm] = useState(false)

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

      const handleDonateButton = ()=>{
        // if start date  is less than current date disable button 
        const currentDate = new Date();
        const startDate = new Date(campaign.startDate);
        if(currentDate < startDate){
            alert("cannot donate yet")
        }
        else{
            // return input field
            setDonationForm(true)
            console.log("can donate")
        }
      }
      const handleDonation = (e)=>{
        e.preventDefault()
        console.log("Donation submitted:", donationAmount);
        setDonationAmount("")
        setDonationForm(false)
      }
      const handleDays = ()=>{
        // if current date < start date  return days remaining for campaingn to start
        const currentDate = new Date ();
        const startDate = new Date (campaign.startDate)
        if (currentDate < startDate){
            // calculate days remaining
            const time = startDate.getTime() - currentDate.getTime()
            const days = Math.ceil(time / (1000 * 3600 * 24))
            return days
        }
        else{
            // calculate days remaining for campaing to end 
            const endDate = new Date (campaign.endDate) 
            const time = endDate.getTime() - currentDate.getTime()
            const days = Math.ceil(time / (1000 * 3600 * 24))
            return days
        }

        }

    return (
    <div className='text-black dark:text-white'>
        <div className="container mx-auto px-4 py-8">     
            <h1 className="text-3xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
            <img className="w-80 h-80" src={campaign.banner} alt={campaign.campaignName} />
            <div>
                <p className="mb-4">Agenda: {campaign.category}</p>
                <p className="mb-4 text-red-500 dark:text-red-500">{handleDays()} Days left</p>
                <p className="mb-4">Campaign Budget: Ksh {campaign.targetAmount}</p>
                {/* Render other campaign details as needed */}
                <button 
                    onClick={handleDonateButton} 
                    className='bg-green-500 text-white font-bold py-2 px-4 rounded'
                >
                Donate
            </button>
                   {/* Conditional rendering of donation form */}
                   {donationForm && (
                        <div className='mt-4'>
                            <form onSubmit={handleDonation}>
                                <h2>Donation Form</h2>
                                
                                <div>
                                <label>Phone Number:</label>
                                <input
                                type="tel"
                                id="phoneNumber"
                                placeholder='Enter your PhoneNumber'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600"
                                />
                                </div>

                                <div>
                                <label htmlFor="donationAmount">Donation Amount:</label>
                                <input
                                type="number"
                                id="donationAmount"
                                placeholder='Enter your donation amount'
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="block text-gray-700 dark:text-slate-200 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-primary-600"
                                />
                                </div>
                                <div>
                                    {/* shows total donation amount */}
                                    <p>Total Donation: Ksh {donationAmount}</p>
                                </div>
                               <div>
                               <button type="submit" 
                                className='bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 '                               >
                                Submit Donation
                                </button>
                               </div>
                                
                            </form>
                        </div>
                    )}

        </div>
        <div>
            <h1 className="text-3xl font-bold mb-4">Campaign Description</h1>
            <p className="mb-4">{campaign.description}</p>
        </div>

            </div>
        </div>
    );
}

export default CampainDetails