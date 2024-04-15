import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function UpcomingCampaigns({allCampaigns}) {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const currentDate = new Date();
  const navigate=useNavigate()
  // console.log(campaigns)

  useEffect(() => {
    setCampaigns(allCampaigns)    
  }, [allCampaigns])

  useEffect(() => {
    let filtered =[]
    campaigns.forEach((item)=> {
        filtered.push(item)
    })
    if(filtered.length!==0) {
      // Take random  4 items for display on upcoming
      setFilteredCampaigns(filtered.sort(() => Math.random() - Math.random()).slice(0, 4))
    } 
  }, [campaigns])
  
  console.log(filteredCampaigns)
  const handleCampaign = (campaignId) => {
    setTimeout(() => {
      navigate(`/campaign/${campaignId}`);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4 bg-slate-300 h-10 p-1">Upcoming Campaigns</h1>
      {filteredCampaigns ? 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {filteredCampaigns.map((campaign) => {
            // if(new Date(campaign.endDate).getTime()<currentDate.getTime()){
              return (
            <div key={campaign.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="w-full rounded-t-lg h-52" src={campaign.banner} alt={campaign.campaignName} />
              <div className="px-6 py-4 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{campaign.campaignName}</h5>
                <a href=''><p className="mb-0 text-lg font-semibold text-basemb-3 text-gray-700 dark:text-gray-400 ">{campaign.organisation.orgName}</p></a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-lg">{campaign.description.slice(0,80)}...</p>
                
                 <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
                <div className='grid grid-flow-col grid-col-2 divide-x divide-slate-500'>
                    <div className=' px-2'>
                    <h6 className='text-md'>Start date</h6>
                      <p className="text-black text-base dark:text-white">{moment(campaign.startDate).format('MMMM Do YYYY')}</p>
                    </div>
                    <div className='px-2'>
                    <h6 className='text-md ml-2'>Budget(Ksh)</h6>
                        <p className="text-black ml-2 text-base dark:text-white">{campaign.targetAmount}</p>
                    </div>
                </div>

                {/* <button onClick={()=> handleCampaign(campaign.id)}>More Details</button> */}
                
              </div>
            </div>
          )
          })}
        </div>
        :
        <div className="flex justify-center items-center w-screen h-screen bg-gray-200">No Upcoming campaigns</div>
      }
      
    </div>
  )
}

export default UpcomingCampaigns