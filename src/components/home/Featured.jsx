import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Featured() {
    const [featuredCampaign, setFeaturedCampaign] = useState(null)
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        handleFeatured()
    }, []);

    const handleFeatured = async (id) => {
        try {
            const response = await fetch('/api/v1.0/featured', {
                method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                setLoading(false)
                setFeaturedCampaign(data)
            }
            
        } catch (error) {
            setLoading(true)
            setErrors('Error in fetching wallet details', error);
        }
    }
    console.log(featuredCampaign)
    const handleCampaign = (campaignId) => {
        navigate(`/campaign/${campaignId}`);
      };

  return (
    <>
    <h1 className="text-3xl font-bold my-4 text-center">Featured Campaigns</h1>
    <div className='my-4 mx-3 justify-center'>
        
        <div className="mx-4 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:max-w-full">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> */}
          {featuredCampaign && featuredCampaign.map((campaign) => (
            <div key={campaign.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <img className="w-full rounded-t-lg h-52" src={campaign.banner} alt={campaign.campaignName} />
              <div className="px-6 py-4 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{campaign.campaignName}</h5>
                <p className="mb-0 text-lg font-semibold text-basemb-3 text-gray-700 ">{campaign.organisation.orgName}</p>
                <p className="mb-3 font-normal text-gray-700  text-lg">{campaign.description.slice(0,80)}...</p>
               </div> 
               <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mx-5 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                      Read more
                      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </button>
            </div>
          ))}
        </div>

    </div>
    </>
    
  )
}

export default Featured