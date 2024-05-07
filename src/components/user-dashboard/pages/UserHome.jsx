import React from 'react'
import DashboardBanner from '../components/DashboardBanner'
import RecentDonation from '../components/RecentDonation'

function UserHome({allDonations}) {
  return (
    <div>
      <DashboardBanner/>
      <RecentDonation allDonations= {allDonations}/>
    </div>
  )
}

export default UserHome