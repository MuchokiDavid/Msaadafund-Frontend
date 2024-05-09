import React from 'react'
import DashboardBanner from '../components/DashboardBanner'
import RecentDonation from '../components/RecentDonation'
import DashCards from '../components/DashCards'
import QuickLink from '../components/QuickLink'

function UserHome({allDonations, allSubscriptions}) {
  return (
    <div>
      <DashboardBanner/>
      <QuickLink/>
      <DashCards allDonations= {allDonations} allSubscriptions= {allSubscriptions}/>
      <RecentDonation allDonations= {allDonations}/>
    </div>
  )
}

export default UserHome