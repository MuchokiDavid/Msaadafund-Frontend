import React from 'react'
import ActiveCampaigns from '../components/campaigns/ActiveCampaigns'

function Campaigns() {
  return (
    <div id='campaigns'>
      <div className="text-md breadcrumbs ml-4 mt-16" >
          <ul>
              <li><a href='/'>Home</a></li>
              <li>Campaigns</li>
          </ul>
      </div>
      <ActiveCampaigns/>
    </div>
  )
}

export default Campaigns

