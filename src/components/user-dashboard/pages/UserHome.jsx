import React from 'react'
import DashboardBanner from '../components/DashboardBanner'
import RecentDonation from '../components/RecentDonation'
import DashCards from '../components/DashCards'
import QuickLink from '../components/QuickLink'

function UserHome({allDonations, allSubscriptions}) {
  return (
    <div className='sm:min-h-fit'>
      <h1 className="mb-3 my-2 mx-auto text-2xl font-bold leading-tight ">Dashboard</h1>
      <hr className='mb-0' />
      <DashboardBanner/>
      <QuickLink/>
      <DashCards allDonations= {allDonations && allDonations} allSubscriptions= {allSubscriptions && allSubscriptions}/>
      <RecentDonation allDonations= {allDonations && allDonations}/>
    </div>
  )
}

export default UserHome