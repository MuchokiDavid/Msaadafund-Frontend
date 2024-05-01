import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { prettyNumber } from '@based/pretty-number'

function Featured() {
    const [featuredCampaign, setFeaturedCampaign] = useState(null)
    const [errors, setErrors] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const currentDate = new Date();

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
                setLoading(true)
                setFeaturedCampaign(data)
            }
            
        } catch (error) {
            setLoading(false)
            setErrors('Error in fetching wallet details', error);
        }
    }
    // console.log(featuredCampaign)
    const handleCampaign = (campaignId) => {
        setTimeout(() => {
          navigate(`/campaign/${campaignId}`);
        }, 1000);
      };

      function getTotalAmount(donationsArray) {
        let totalAmount = 0;
        for (let donation of donationsArray) {
            totalAmount += donation.amount;
        }
        return totalAmount;
    }
    const calculateDaysLeft = (endDate) => {
      if (!endDate) return null;
      const endDateObject = new Date(endDate);
      const differenceInTime = endDateObject.getTime() - currentDate.getTime();
      if  (differenceInTime <= 0) return 0;
      else{
        return Math.ceil(differenceInTime / (1000 * 3600 * 24));
      }
    };

  return (
    <div className='container mx-auto h-full bg-gray-50 rounded-lg'>
    <h1 className="text-lg lg:text-2xl font-bold my-4 text-center">Featured Campaigns</h1>
    <div className='my-4 justify-center'>
        
        <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:max-w-full">
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"> */}
          {featuredCampaign && featuredCampaign.map((campaign) => {
            return (
              <div key={campaign.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden hover:cursor-pointer'>
                <a onClick={()=>handleCampaign(campaign.id)} className="block rounded-lg shadow-sm shadow-indigo-100">
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
                        <dd className="font-medium overflow-hidden text-lg whitespace-nowrap">{campaign.campaignName}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Organiser</dt>
                        <dd><a href='#' className='text-blue-700 hover:underline whitespace-nowrap'>{campaign.organisation.orgName}</a></dd>
                        {/* <a href='#' className='text-blue-700 hover:underline text-base overflow-hidden'><dd>{campaign.organisation.orgName}</dd></a> */}
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
                          <p className="text-gray-500">Days</p>

                          <p className="font-medium whitespace-nowrap">{calculateDaysLeft(campaign.endDate)} days</p>
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

                      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1">
                        <svg
                          viewBox="0 0 640 512"
                          fill="currentColor"
                          className="size-4 text-sky-700"
                          height="2em"
                          width="2em"
                        >
                          <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23-174-.2c-13.3 0-24-10.7-24-24s10.7-24 24-24h174.1L535 41zM105 377l-23 23h174c13.3 0 24 10.7 24 24s-10.7 24-24 24H81.9l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64h241.9c-3.7 7.2-5.9 15.3-5.9 24 0 28.7 23.3 52 52 52h117.4c-4 17 .6 35.5 13.8 48.8 20.3 20.3 53.2 20.3 73.5 0l19.3-19.3V384c0 35.3-28.7 64-64 64H302.1c3.7-7.2 5.9-15.3 5.9-24 0-28.7-23.3-52-52-52H138.6c4-17-.6-35.5-13.8-48.8-20.3-20.3-53.2-20.3-73.5 0L32 342.5V128c0-35.3 28.7-64 64-64zm64 64H96v64c35.3 0 64-28.7 64-64zm384 192c-35.3 0-64 28.7-64 64h64v-64zm-224 32c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96z" />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                          <p className="text-gray-500">Raised</p>

                          <p className="font-medium">kes{prettyNumber(getTotalAmount(campaign.donations), 'number-short')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
          )
          }
          // (
          //   <div key={campaign.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow" onClick={()=> handleCampaign(campaign.id)}>
          //     <img className="w-full rounded-t-lg h-52" src={campaign.banner} alt={campaign.campaignName} />
          //     <div className="px-6 py-4 flex-grow">
          //     <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 overflow-hidden whitespace-nowrap">{campaign.campaignName}</h5>
          //       <p className="mb-0 text-lg font-semibold text-basemb-3 text-blue-800 hover:underline">{campaign.organisation.orgName}</p>
          //       <p className="mb-3 font-normal text-gray-700 lg:text-lg overflow-hidden">{campaign.description.slice(0,25)}...</p>
          //       <p className='text-blue-800 hover:underline'><a onClick={()=> handleCampaign(campaign.id)}>Show more</a></p>
          //      </div> 
          //      {/* <button onClick={()=> handleCampaign(campaign.id)} class="inline-flex items-center mt-0 mx-5 mb-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
          //             Read more
          //             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          //             </svg>
          //         </button> */}
                  
          //   </div>
          // )
          )}
        </div>

    </div>
    </div>
    
  )
}

export default Featured