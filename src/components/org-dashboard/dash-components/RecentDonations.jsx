import React, { useEffect, useState } from 'react'
import moment from 'moment';

function RecentDonations({allDonations, allCampaigns, allDonors}) {
    const[donations, setDonations] = useState(allDonations);
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
    <div className='p-4'>
        <h2 className="text-left text-xl mt-5">Recently Donated</h2>
        <div>
            <table className="min-w-full table-zebra">
                {/* head */}
                <thead>
                    <tr>
                    <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 '>ID</th>
                        <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 '>Campaign</th>
                        <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 '>Donor</th>
                        <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 '>Amount</th>
                        <th className='px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-700 uppercase border-b border-gray-200 bg-gray-50 '>Donation Date</th>                            
                    </tr>
                </thead>
                <tbody>
                    {slicedDonations && slicedDonations.map((donation) => {
                        const user = donors && donors.find(user => user.id === donation.userId);
                        const donorName = user ? `${user.firstName} ${user.lastName}` : "Anonymous";
                        const campaign = campaigns && campaigns.find(campaign => campaign.id === donation.campaignId);
                        const campaignTitle = campaign ? campaign.campaignName : "";
                        return (
                            <tr key={donation._id}>
                                <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{donation.id}</td>
                                <td className='px-4 py-2 whitespace-no-wrap border-b border-gray-200 '>{campaignTitle}</td>
                                <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 '>{donorName}</td>
                                <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200'>{donation.amount}</td>
                                <td className='px-6 py-2 whitespace-no-wrap border-b border-gray-200 '>{moment(donation.donationDate).format('dddd Do MMMM, YYYY')}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default RecentDonations