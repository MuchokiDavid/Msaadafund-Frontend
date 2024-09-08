import React from 'react'
import HomeCards from '../dash-components/HomeCards'
import QuickLinks from '../dash-components/QuickLinks'
import RecentDonations from '../dash-components/RecentDonations'
import CallToAction from '../dash-components/CallToAction'
import Charts from '../dash-components/Charts'
// import { useNavigate } from 'react-router-dom'

function OrgHome({allCampaigns,allDonations, allDonors,subscriptions}) {
  // to get token for organisation
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  // const org = localStorage.getItem('org')

  // const navigate = useNavigate()

  if (!token) {
    window.location.replace("/org/login")
  }
  if (user){   
    window.location.replace("/unauthorized")
    return null
  }
  // if (org && user === null  && token) {
  //   window.location.replace("/org/dashboard")
  // }


  return (
    <div className='sm:min-h-fit'>
      {/* <div className="text-sm breadcrumbs ml-2">
          <ul>
              <li><a href='/'>Home</a></li>
              <li><a href='/org/dashboard'>Dashboard</a></li>
          </ul>
      </div> */}
      <h1 className="mb-3 my-2 mx-3 text-2xl font-bold leading-tight dash">Dashboard</h1>
      <hr className='mb-0' />
      <CallToAction/>
      <QuickLinks/>
      <HomeCards allCampaigns={allCampaigns} allDonations= {allDonations} subscriptions={subscriptions}/>
      <Charts allDonations= {allDonations}/>
      <RecentDonations allDonations= {allDonations} allDonors={allDonors} allCampaigns={allCampaigns} />
    </div>
  )
}

export default OrgHome