import React from 'react'
import ActiveCampaigns from '../components/campaigns/ActiveCampaigns'
import Menus from '../components/reusables/Menus'
import Footer from '../components/reusables/Footer'

function Campaigns() {
  return (
    <div id='campaigns' className='min-h-screen'>
      <Menus/>
      {/* <div className="text-md breadcrumbs ml-4" >
          <ul>
              <li><a href='/'>Home</a></li>
              <li>Fundraisers</li>
          </ul>
      </div> */}
      <ActiveCampaigns/>
      <Footer/>
    </div>
  )
}

export default Campaigns

