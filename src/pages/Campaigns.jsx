import React from 'react'
import ActiveCampaigns from '../components/campaigns/ActiveCampaigns'
import Menus from '../components/reusables/Menus'

function Campaigns() {
  return (
    <div id='campaigns'>
      <Menus/>
      <div className="text-md breadcrumbs ml-4" >
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

