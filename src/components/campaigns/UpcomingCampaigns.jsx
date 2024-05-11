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
  
  // console.log(filteredCampaigns)
  const handleCampaign = (campaignId) => {
    setTimeout(() => {
      navigate(`/campaign/${campaignId}`);
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-bold my-4 h-6 p-1">Upcoming Campaigns</h1>
      <div className='mx-auto overflow-x-hidden pb-4 px-6 sm:px-2 md:px-4'>
      {allCampaigns.length!=0 ? 
        <div className="mx-4 sm:mx-2 lg:mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
          {filteredCampaigns.map((campaign) => {
              return (
                <div key={campaign.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden'>
                  <a className="block rounded-lg shadow-sm shadow-indigo-100">
                    <img
                      alt="banner"
                      src= {campaign.banner}
                      className="h-56 w-full rounded-t-md object-cover"
                    />
  
                    <div className="mt-2 px-2 pb-4">
                      <dl>
                        <div>
                          <dt className="sr-only">Budget</dt>
  
                          <dd className="text-sm text-gray-500">Budget: KES {campaign.targetAmount}</dd>
                        </div>
  
                        <div>
                          <dt className="sr-only">Name</dt>
                          <dd className="font-medium overflow-hidden text-lg whitespace-nowrap hover:text-blue-600 hover:cursor-pointer"><p onClick={()=>handleCampaign(campaign.id)}>{campaign.campaignName}</p></dd>
                        </div>
                        <div>
                          <dt className="sr-only">Organiser</dt>
                          <dd><a href='#' className='text-blue-700 hover:underline whitespace-nowrap hover:text-blue-400'>Organiser: {campaign.organisation.orgName}</a></dd>
                          
                        </div>
                      </dl>
  
                      <div className="mt-4 flex items-center gap-3 text-xs">
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                          <svg
                          className="size-4 text-sky-700"
                          viewBox="0 0 21 21"
                          fill="currentColor"
                          height="1.5em"
                          width="1.5em"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 2.5h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12a2 2 0 012-2zM2.5 6.5h16"
                            />
                            <g fill="currentColor" transform="translate(2 2)">
                              <path d="M9.5 8.5 A1 1 0 0 1 8.5 9.5 A1 1 0 0 1 7.5 8.5 A1 1 0 0 1 9.5 8.5 z" />
                              <path d="M5.5 8.5 A1 1 0 0 1 4.5 9.5 A1 1 0 0 1 3.5 8.5 A1 1 0 0 1 5.5 8.5 z" />
                              <path d="M5.5 12.5 A1 1 0 0 1 4.5 13.5 A1 1 0 0 1 3.5 12.5 A1 1 0 0 1 5.5 12.5 z" />
                            </g>
                          </g>
                        </svg>
  
                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Starts on</p>
  
                            <p className="font-medium">{moment(campaign.startDate).format('MMMM Do YYYY')}</p>
                          </div>
                        </div>
  
                        <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1">
                          <svg
                            className="size-4 text-sky-700"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            height="2em"
                            width="2em"
                          >
                            <path d="M10 3H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V4a1 1 0 00-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1v-6a1 1 0 00-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                          </svg>
  
                          <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Category</p>
  
                            <p className="font-medium">{campaign.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
            )
          })}
        </div>
        :
        <div className="text-xl mx-4">No Upcoming campaigns</div>
      }
      <hr className='my-3'/>
      </div>
      
    </div>
  )
}

export default UpcomingCampaigns