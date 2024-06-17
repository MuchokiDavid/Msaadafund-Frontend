import React from 'react'
import { Link } from 'react-router-dom';

function OrgUpcoming({organisationDetails}) {
    const currentDate = new Date();
    //Upcoming campaigns
    const upcomingCampaigns = organisationDetails.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        return startDate > currentDate;
    });

    // const handleAlert=()=>{
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Oops...',
    //         text: 'Campaign is already closed!',
    //       })
    // }

    return (
        <div className='py-4'>
        {/* <h1 className='text-xl my-4'>Past campaigns</h1> */}
        {/* -------------------------------------Cards for campaign--------------------------------------- */}
        {upcomingCampaigns.length === 0 ? <div className="text-base mx-4 mb-6">No Upcoming campaigns</div> : null}
        <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
            {/* <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full"> */}
            {upcomingCampaigns && upcomingCampaigns.map((campaign)=>{
                    return(
                    <Link to = {`/campaigns/${campaign.id}`} key={campaign.id}>
                    <div className="card w-auto bg-white rounded-md shadow-lg key={campaign.id} h-80">
                        <figure className='h-40'><img src={campaign.banner} alt={campaign.campaignName} loading='lazy'/></figure>
                        <div className="card-body">
                        <h2 className="card-title text-gray-700 whitespace-nowrap overflow-hidden ">
                        {campaign.campaignName}
                        </h2>
                        {/* <p>{campaign.description.slice(0,30)}...</p> */}
                        <div className="card-actions grid grid-cols-1">
                            <div className="badge badge-secondary">NEW</div>
                            <div className="badge badge-outline">{campaign.category}</div> 
                        </div>
                        </div>
                    </div>
                </Link>
                )
            })}                
        </div>

    </div>
    )
    }

export default OrgUpcoming