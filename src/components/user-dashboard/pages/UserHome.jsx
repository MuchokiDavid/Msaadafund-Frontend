import React from 'react'
import DashboardBanner from '../components/DashboardBanner'
import RecentDonation from '../components/RecentDonation'
import DashCards from '../components/DashCards'

function UserHome({allDonations, allSubscriptions}) {
  return (
    <div>
      <DashboardBanner/>
      <DashCards allDonations= {allDonations} allSubscriptions= {allSubscriptions}/>
      <RecentDonation allDonations= {allDonations}/>
    </div>
  )
}

export default UserHome