import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OrgInactive from './OrgInactive';
import OrgUpcoming from './OrgUpcoming';

function OrgActive({organisationDetails}) {
    // console.log(organisationDetails)
    const currentDate = new Date();
    const [activeTab, setActiveTab] = useState('Active_campaigns');

     //Active campaigns
    const activeCampaigns = organisationDetails.filter(campaign => {
        const startDate = new Date(campaign.startDate);
        const endDate = new Date(campaign.endDate);
        return (startDate <= currentDate && endDate >= currentDate) || (endDate.toDateString() === currentDate.toDateString());
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
    <div className='mt-3'>
      <div className='container mx-auto min-h-screen lg:divide-x'>
        <div className="sm:hidden ">
          <label htmlFor="Tab" className="sr-only">Tab</label>
          <select
            id="Tab"
            className="rounded-md border-gray-200 p-3 w-full"
            onChange={(e) => setActiveTab(e.target.value)}
            value={activeTab}
          >
            <option  value={'Upcoming_campaigns'}>Upcoming Campaigns</option>
            <option value={'Active_campaigns'}>Active Campaigns</option>
            <option value={'Finished_campaigns'}>Finished Campaigns</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 " aria-label="Tabs">
              {['Upcoming_campaigns','Active_campaigns', 'Finished_campaigns'].map((tab) => (
                <a
                  key={tab}
                  href="#"
                  className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-xs font-medium ${
                    activeTab === tab
                      ? 'border-sky-500 text-sky-600 '
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    
                  </svg>
                  {tab}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4">
        {activeTab === 'Upcoming_campaigns' && (
            <div>
              {/* <h2 className="text-lg font-semibold">Upcoming Campaigns</h2> */}
              <OrgUpcoming organisationDetails= {organisationDetails}/>
            </div>
          )}
          {activeTab === 'Active_campaigns' && (
            <div>
              {/* <h2 className="text-lg font-semibold">Active Campaigns</h2> */}
              <div className='mx-auto'>

            {/* <h1 className='text-xl mb-3'>Active campaigns</h1> */}
              {/* -------------------------------------Cards for campaign--------------------------------------- */}
              {activeCampaigns.length === 0 ? <div className="text-base mx-4 my-4 min-h-screen">No Active campaigns</div> : null}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-2 md:gap-4 sm:max-w-full">
                  {/* <div className="mx-2 sm:mx-1 lg:mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-2 md:gap-4 sm:max-w-full"> */}
                  {activeCampaigns && activeCampaigns.map((campaign)=>{
                      return(
                      <Link to = {`/campaigns/${campaign.id}`} key={campaign.id}>
                      <div className="card w-auto bg-white rounded-md shadow-lg">
                      <figure><img src={campaign.banner} alt={campaign.campaignName} className='h-56 w-full rounded-t-md object-cover' loading='lazy'/></figure>
                      <div className="card-body">
                        <h2 className="card-title overflow-hidden text-lg whitespace-nowrap hover:text-blue-600 hover:cursor-pointer">
                        {campaign.campaignName}
                          {/* <div className="badge badge-secondary">NEW</div> */}
                        </h2>
                        {/* <p>{campaign.description.slice(0,25)}...</p> */}
                        <div className="card-actions justify-start">
                          <div className="badge badge-outline">{campaign.category}</div> 
                          <div className="badge badge-outline">{calculateDaysLeft(campaign.endDate)} Days</div>
                        </div>
                      </div>
                    </div></Link>
                      )
                  })}                
              </div>
              </div>
            </div>
          )}
          {activeTab === 'Finished_campaigns' && (
            <div>
              {/* <h2 className="text-lg font-semibold">Finished Campaigns</h2> */}
              <OrgInactive organisationDetails= {organisationDetails}/>
            </div>
          )}
        </div>
    </div> 

  </div>
  )
}

export default OrgActive