import React, { useEffect, useState } from 'react'

function RecentDonation({allDonations}) {
    const[donations, setDonations]= useState(allDonations)
    const[slicedDonations, setSlicedDonations] = useState([])

    useEffect(() => {
      setDonations(allDonations)
    }, [allDonations])

    useEffect(() => {
        if (donations && donations.length > 10) {
          let startIndex = donations.length - 10;// Calculate the start index for slicing
          let slicedDonation = donations.slice(startIndex);// Slice the donations array to get the most recent 10 donations
          setSlicedDonations(slicedDonation);
        } else {
          setSlicedDonations(donations);
        }
      }, [donations]);
    
  return (
    <div className='px-2 py-2 mb-6'>
        <h2 className="text-left text-lg mt-1">Recently Donated</h2>
        {
            slicedDonations && slicedDonations.length>0
            ?
            (
                <div className="my-3 inline-block min-w-full overflow-scroll align-middle border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full table-zebra text-xs overflow-x-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>ID</th>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Invoice Id</th>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Amount</th>  
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Campaign</th>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Category</th>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Start Date</th>   
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>End Date</th>  
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Organisations</th>
                                <th className='px-4 py-1 font-medium leading-4 tracking-wider text-left text-white uppercase border-b border-gray-200 bg-emerald-400'>Donation Date</th>                    
                            </tr>
                        </thead>
                        <tbody>
                            {slicedDonations.map((donation, index) => {
                                return (
                                    <tr key={donation._id}>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{index + 1}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.invoice_id}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.amount}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.campaignName : ""}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.category : ""}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.startDate : ""}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.endDate : ""}</div>
                                        </td>
                                        <td className='px-4 py-2 whitespace-nowrap border-b border-gray-200'>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.organisation.orgName : ""}</div>
                                        </td>
                                        <td>
                                            <div className='text-gray-900'>{donation.donationDate}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )
            :
            (<div className='flex justify-between items-center px-2 py-2 border-b border-gray-200'>
                <div className='text-gray-900'>No Donations Yet</div>
            </div>)
        }
    </div>
  )
}

export default RecentDonation