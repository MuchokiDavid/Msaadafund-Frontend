import React from 'react'
import { Link } from 'react-router-dom'

function OrgInactive({organisationDetails}) {
    const currentDate = new Date();
    //Expired campaigns
    const expiredCampaigns = organisationDetails.filter(campaign => {
    const endDate = new Date(campaign.endDate);
    return endDate < currentDate;
    });

  return (
    <div>
        <h1 className='text-xl mt-6'>Past campaigns</h1>
        {/* -------------------------------------Cards for campaign--------------------------------------- */}
        {expiredCampaigns.length === 0 ? <div className="text-xl mx-4 my-4 h-40">No Past campaigns to display</div> : null}
        <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
            {/* <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full"> */}
            {expiredCampaigns && expiredCampaigns.map((campaign)=>{
                return(
                <Link to = {`/campaign/${campaign.id}`} key={campaign.id}>
                <div className="card w-auto bg-base-100 rounded-md shadow-lg">
                <figure className='h-40'><img src={campaign.banner} alt={campaign.campaignName} loading='lazy'/></figure>
                <div className="card-body">
                  <h2 className="card-title">
                  {campaign.campaignName}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                  </h2>
                  <p>{campaign.description.slice(0,35)}...</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{campaign.category}</div> 
                    {/* <div className="badge badge-outline">{calculateDaysLeft(campaign.endDate)} Days</div> */}
                  </div>
                </div>
              </div></Link>
                )
            })}                
        </div>

    </div>
  )
}

export default OrgInactive