import React from 'react'
import HomeCards from '../dash-components/HomeCards'
import QuickLinks from '../dash-components/QuickLinks'
import RecentDonations from '../dash-components/RecentDonations'

function OrgHome({allCampaigns,allDonations, allDonors}) {
  return (
    <div className='sm:h-fit'>
      <QuickLinks/>
      <HomeCards allCampaigns={allCampaigns} allDonations= {allDonations}/>
      <RecentDonations allDonations= {allDonations} allDonors={allDonors} allCampaigns={allCampaigns} />
    </div>
  )
}

export default OrgHome