import React, { useEffect, useState } from 'react'
import { prettyNumber } from '@based/pretty-number'
import { SiWebmoney } from "react-icons/si";

function HomeCards({allCampaigns, allDonations, subscriptions, props}) {
    const[donations, setDonations] = useState(allDonations)
    const[subs, setSubs] = useState(subscriptions)

    useEffect(() => {
        if(allDonations){
        setDonations(allDonations)
        }
    }, [allDonations])

    useEffect(() => {
        if(subscriptions){
        setSubs(subscriptions)
        }
    }, [subscriptions])
    

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
    let totalAmount=(donations && getTotalAmount(donations))

  return (
    <div className='mb-4'>
        <h1 className="text-left text-xl mt-2">Statistics</h1>
        <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div className="flex items-center bg-transparent rounded-md overflow-auto bg-white px-2 py-4 border">
                <div className="p-2 bg-green-800 rounded-2xl">
                <SiWebmoney className='h-16 w-16 text-white'/>
                    {/* <svg class="SVGBGI" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24"><path class="accent" d="M21 19H3V5h18v4h-8l-2 3 2 3h8v4z"></path><g class="outline"><path d="M22 8.51V6.5A2.5 2.5 0 0 0 19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-2c.6-.46 1-1.17 1-2v-3c0-.81-.4-1.53-1-2Zm-1 5a.5.5 0 0 1-.5.5H14c-1.1 0-2-.9-2-2s.9-2 2-2h6.5c.28 0 .5.22.5.5v3ZM19.5 18h-15a.5.5 0 0 1-.5-.5v-11c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5V8h-6a4 4 0 1 0 0 8h6v1.5a.5.5 0 0 1-.5.5Z"></path><circle cx="14" cy="12" r="1"></circle></g><g class="solid"><path d="M22 8.51V6.5A2.5 2.5 0 0 0 19.5 4h-15A2.5 2.5 0 0 0 2 6.5v11A2.5 2.5 0 0 0 4.5 20h15a2.5 2.5 0 0 0 2.5-2.5v-2c.6-.46 1-1.17 1-2v-3c0-.81-.4-1.53-1-2Zm-1 5a.5.5 0 0 1-.5.5H14c-1.1 0-2-.9-2-2s.9-2 2-2h6.5c.28 0 .5.22.5.5v3Z"></path><circle cx="14" cy="12" r="1"></circle></g></svg> */}
                </div>
                <div className="px-2 text-gray-700 justify-between items-center">
                    <div>
                        <h3 className="tracking-wider text-sm lg:text-base">Contributions</h3>
                    </div>
                    <div>
                        <p className="text-xl lg:text-2xl">KES {prettyNumber(totalAmount , 'number-short')}</p>
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
                        <h3 className="tracking-wider text-sm lg:text-base">Campaigns</h3>
                    </div>
                    <div>
                    <p className="text-xl lg:text-2xl">{prettyNumber(allCampaigns && allCampaigns.length , 'number-short')} </p>
                    </div>                    
                </div>
            </div>

            <div className="flex items-center bg-transparent rounded-md overflow-auto bg-white px-2 py-4 border">
                <div className="p-2 bg-emerald-500 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>
                <div className="px-2 text-gray-700 justify-between items-center">
                    <div>
                        <h3 className="tracking-wider text-sm lg:text-base">Subscribers</h3>
                    </div>
                    <div>                    
                    <p className="text-xl lg:text-2xl">{prettyNumber(subs && subs.length , 'number-short')}</p>
                    </div>
                    
                </div>
            </div>
            {/* <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-indigo-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z">
                        </path>
                    </svg></div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Total Balance</h3>
                    <p className="text-3xl">142,334</p>
                </div>
            </div>
            <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                <div className="p-4 bg-red-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4">
                        </path>
                    </svg></div>
                <div className="px-4 text-gray-700">
                    <h3 className="text-sm tracking-wider">Server Load</h3>
                    <p className="text-3xl">34.12%</p>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default HomeCards