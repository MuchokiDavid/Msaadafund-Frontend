import React, { useEffect, useState } from 'react'
import moment from 'moment';

function RecentDonations({allDonations, allCampaigns, allDonors}) {
    const[donations, setDonations] = useState([]);
    const[slicedDonations, setSlicedDonations] = useState([])
    const [campaigns, setCampaigns] = useState();
    const [donors, setDonors] = useState(allDonors)
    const token=localStorage.getItem('token')

//set donors to a state
useEffect(() => {
  setDonors(allDonors)
}, [allDonors,token])
 
//Store all donations
    useEffect(() => {
      setDonations(allDonations)
    }, [allDonations,token])

//Store all campaigns
    useEffect(() => {
        setCampaigns(allCampaigns);
    }, [allCampaigns]);
    
    useEffect(() => {
        if (donations && donations.length > 10) {
          let startIndex = donations.length - 10;// Calculate the start index for slicing
          let slicedDonation = donations.slice(startIndex);// Slice the donations array to get the most recent 10 donations
          setSlicedDonations(slicedDonation);
        } else {
          setSlicedDonations(donations);
        }
      }, [donations]);

// console.log(allDonors)
// console.log(slicedDonations)
// console.log(allCampaigns)

  return (
    <div className='px-2 mb-6'>
        <h2 className="text-left text-xl mt-1">Recently Donated</h2>
        {slicedDonations && slicedDonations.length > 0 
          ? 
          (
            <div className='overflow-scroll'>
              <table className="min-w-full table-zebra rounded overflow-x-auto text-xs">
                  {/* head */}
                  <thead>
                      <tr>
                      {/* <th className='px-6 py-3 text-sm font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>ID</th> */}
                          <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400 '>Campaign</th>
                          <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Donor</th>
                          <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Amount</th>
                          <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Donation Date</th>
                          <th className='px-6 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Status</th>                            
                      </tr>
                  </thead>
                  <tbody>
                      {slicedDonations && slicedDonations.map((donation) => {
                          const user = donors && donors.find(user => user.id === donation.userId);
                          const donorName = user ? `${user.firstName} ${user.lastName}` : "Anonymous";
                          const campaign = campaigns && campaigns.find(campaign => campaign.id === donation.campaignId);
                          const campaignTitle = campaign ? campaign.campaignName : "";
                          return (
                              <tr key={donation.id}>
                                  {/* <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donation.id}</td> */}
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{campaignTitle}</td>
                                  <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 '>{donorName}</td>
                                  <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200'>{donation.amount}</td>
                                  <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 '>{moment(donation.donationDate).format('dddd Do MMMM, YYYY')}</td>
                                  <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200'>{donation.status}</td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>
          ) 
          : 
          (
            <div className='grid grid-cols-1 gap-4 mt-3 px-4'>
              <div>
                <p>No recent donations to display. Create campaign to start receiving donations</p> 
              </div>
              <div>
                <a href='/org/dashboard/createcampaign'><button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4'>
                    Create Campaign
                </button></a>
              </div>
            </div>
        )}
        
    </div>
  )
}

export default RecentDonations