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

    //   console.log(allDonations)
    
  return (
    <div className='px-2 py-4 bg-white rounded-lg mt-3 border my-6'>
        <div className='flex justify-between'>
            <div>
                <h2 className="text-left text-lg mt-1">Latest Donations</h2>
                </div>
                <div className='mr-2'>
                {/* button to view more transactions */}
                <a href='/user/dashboard/contributions'><button className="text-sm text-left bg-gray-200 p-1.5 rounded-lg hover:bg-gray-300">View donations</button></a>
            </div>
        </div>
        {
            slicedDonations && slicedDonations.length>0
            ?
            (
                <div className="overflow-scroll mt-2">
                    <table className="table table-xs bg-white">
                        {/* head */}
                        <thead className='text-gray-800 bg-gray-100 text-left'>
                            <tr>
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>ID</th>
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Invoice Id</th>
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Amount</th>  
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Campaign</th>
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Category</th>
                                {/* <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Start Date</th>    */}
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>End Date</th>  
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Organisations</th>
                                {/* <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Status</th>                     */}
                                <th className='px-2 py-2 font-medium leading-4 tracking-wider text-leftuppercase border-b border-gray-200'>Donation Date</th>                    
                            </tr>
                        </thead>
                        <tbody>
                            {slicedDonations.map((donation, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{index + 1}</div>
                                        </td>
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.invoice_id}</div>
                                        </td>
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.currency} {donation.amount}</div>
                                        </td>
                                        <td className='px-2 py-2 text-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.campaignName.slice(0,30) : ""}</div>
                                        </td>
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.category : ""}</div>
                                        </td>
                                        {/* <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.startDate : ""}</div>
                                        </td> */}
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.endDate : ""}</div>
                                        </td>
                                        <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.campaign ? donation.campaign.organisation.orgName : ""}</div>
                                        </td>
                                        {/* <td className='px-2 py-2 whitespace-no-wrap border-b border-gray-200 '>
                                            <div className='text-gray-900'>{donation.status}</div>
                                        </td> */}
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
            (<div className='flex justify-between items-center px-2 py-6 border-b border-gray-200'>
                <div className='text-gray-900'>No Donations to display</div>
            </div>)
        }
    </div>
  )
}

export default RecentDonation