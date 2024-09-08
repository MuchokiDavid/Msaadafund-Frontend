import React, { useEffect, useState } from 'react'
import moment from 'moment';

function RecentDonations({allDonations, allCampaigns, allDonors}) {
    const[donations, setDonations] = useState([]);
    const[slicedDonations, setSlicedDonations] = useState([])
    const [campaigns, setCampaigns] = useState(allDonations);
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
    <div className='px-2 py-4 bg-white rounded-lg mt-3 border my-6'>
      <div className='flex justify-between'>
        <div>
          <h2 className="text-left text-lg mt-1">Latest Donations</h2>
        </div>
        <div className='mr-2'>
          {/* button to view more transactions */}
          <a href='/org/dashboard/donations'><button className="text-sm text-left bg-gray-200 p-1.5 rounded-lg hover:bg-gray-300">View donations</button></a>
        </div>
      </div>        
        {slicedDonations && slicedDonations.length > 0 
          ? 
          (
            <div className='overflow-scroll mt-2 '>
              <table className="min-w-full table rounded-md overflow-x-auto text-xs bg-white statTable" >
                  {/* head */}
                  <thead className='text-gray-800 bg-gray-100 text-left'>
                      <tr className='text-gray-800 bg-gray-100'>
                      {/* <th className='px-6 py-3 text-sm font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200'>ID</th> */}
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Campaign</th>
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Category</th>
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Donor</th>
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Amount</th>
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200 '>Method</th>
                          <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Donation Date</th>
                          {/* <th className='px-6 py-3 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Status</th>*/}
                      </tr>
                  </thead>
                  <tbody>
                      {slicedDonations && slicedDonations.map((donation) => {
                          const user = donors && donors.find(user => user.id === donation.userId);
                          const donorName = user ? `${user.firstName} ${user.lastName}` : `${donation.donor_name}`;
                          const campaign = campaigns && campaigns.find(campaign => campaign.id === donation.campaignId);
                          const campaignTitle = campaign ? campaign.campaignName : "";
                          return (
                              <tr key={donation.id}>
                                  {/* <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donation.id}</td> */}
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{campaignTitle}</td>
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donation.campaign.category}</td>
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donorName}</td>                                  
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200'>{donation.currency} {donation.amount}</td>
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donation.method}</td>
                                  <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{moment(donation.donationDate).format('dddd Do MMMM, YYYY')}</td>
                                  {/* <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200'>{donation.status}</td> */}
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
                <p>No recent contributions to display.</p> 
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