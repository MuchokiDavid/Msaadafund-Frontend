import { useEffect, useState } from 'react'
import React from 'react'
import { prettyNumber } from '@based/pretty-number'

function DashCards({allSubscriptions, allDonations}) {
    const [allSubscription, setAllSubscription]= useState(allSubscriptions)
    const [allDonation, setAllDonation]= useState(allDonations)

    useEffect(() => {
      setAllSubscription(allSubscriptions)
    }, [allSubscriptions])

    useEffect(() => {
      setAllDonation(allDonations)
    }, [allDonations])
    
    function getTotalAmount(donationsArray) {
        let totalAmount = 0;
        if (donationsArray.length === 0) {
            return 0;
        }
        else{
            for (let donation of donationsArray) {
                totalAmount += donation.amount;
            }
        }
        
        return totalAmount;
    }
    let totalAmount=allDonation && getTotalAmount(allDonation)

  return (
    <div className='mb-4'>
        <h1 className="text-left text-lg mt-2">Statistics</h1>
        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex items-center bg-transparent rounded-md overflow-auto bg-white px-2 py-4 border">
                <div className="p-2 bg-emerald-400 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>
                <div className="px-2 text-gray-700 justify-between items-center">
                    <div>
                        <p className="text-sm lg:text-base">KES {prettyNumber(totalAmount , 'number-short')}</p>
                    </div>
                    <div>
                        <h3 className="text-sm lg:text-base tracking-wider">Contributions</h3>
                    </div>
                </div>
            </div>
            <div className="flex items-center bg-transparent rounded-md overflow-auto bg-white px-2 py-4 border">
                <div className="p-2 bg-blue-400 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                    </svg>
                </div>
                <div className="px-2 text-gray-700">
                    <div>
                        <p className="text-sm lg:text-base">{prettyNumber(allSubscription && allSubscription.length , 'number-short')}</p>
                    </div>
                    <div>
                        <h3 className="text-sm lg:text-base tracking-wider">Subscriptions</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashCards