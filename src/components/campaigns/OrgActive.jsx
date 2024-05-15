import React from 'react'
import { Link } from 'react-router-dom'

function OrgActive({organisationDetails}) {
    // console.log(organisationDetails)
    const currentDate = new Date();
     //Active campaigns
    const activeCampaigns = organisationDetails.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);
        return startDate <= currentDate && endDate >= currentDate || endDate.toDateString() === currentDate.toDateString();
    });

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
    <div>
        <h1 className='text-xl'>Active campaigns</h1>
        {/* -------------------------------------Cards for campaign--------------------------------------- */}
        {activeCampaigns.length === 0 ? <div className="text-xl mx-4 min-h-screen">No Active campaigns</div> : null}
        <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
            {/* <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full"> */}
            {activeCampaigns && activeCampaigns.map((campaign)=>{
                return(
                <Link to = {`/campaign/${campaign.id}`} key={campaign.id}>
                <div className="card w-auto bg-base-100 rounded-md shadow-lg">
                <figure><img src={campaign.banner} alt={campaign.campaignName} className='h-56 w-full rounded-t-md object-cover' loading='lazy'/></figure>
                <div className="card-body">
                  <h2 className="card-title font-medium overflow-hidden text-lg whitespace-nowrap hover:text-blue-600 hover:cursor-pointer">
                  {campaign.campaignName}
                    {/* <div className="badge badge-secondary">NEW</div> */}
                  </h2>
                  <p>{campaign.description.slice(0,25)}...</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{campaign.category}</div> 
                    <div className="badge badge-outline">{calculateDaysLeft(campaign.endDate)} Days</div>
                  </div>
                </div>
              </div></Link>
                )
            })}                
        </div>

    </div>
  )
}

export default OrgActive