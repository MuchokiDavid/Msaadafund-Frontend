import { useParams } from 'react-router-dom'
import React,{useEffect,useState} from 'react'

function CampainDetails() {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);

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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{campaign.campaignName.toUpperCase()}</h1>
            <img className="w-80 h-80" src={campaign.banner} alt={campaign.campaignName} />
            <div className='text-white'>
                <p className="text-bold text-2xl mb-4">{campaign.description}</p>
                <p className="mb-4">Category: {campaign.category}</p>
                <p className="mb-4">Start Date: {campaign.startDate}</p>
                <p className="mb-4">End Date: {campaign.endDate}</p>
                <p className=" mb-4">Target Amount: Ksh {campaign.targetAmount}</p>
                {/* Render other campaign details as needed */}
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                    Donate
                </button>
            </div>
        </div>
    );
}

export default CampainDetails