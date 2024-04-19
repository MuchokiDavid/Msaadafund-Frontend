import React from 'react'
import HomeCards from '../dash-components/HomeCards'
import QuickLinks from '../dash-components/QuickLinks'
import RecentDonations from '../dash-components/RecentDonations'

function OrgHome({allCampaigns,allDonations, allDonors}) {
  return (
    <div className='sm:h-fit'>
      <div className="text-md breadcrumbs ml-2">
          <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/org/dashboard'>Dashboard</a></li>
          </ul>
      </div>
      <h1 className="mb-3 my-2 text-2xl font-bold leading-tight ">Dashboard</h1>
      <hr className='mb-0' />
      <QuickLinks/>
      <HomeCards allCampaigns={allCampaigns} allDonations= {allDonations}/>
      <RecentDonations allDonations= {allDonations} allDonors={allDonors} allCampaigns={allCampaigns} />
    </div>
  )
}

export default OrgHome