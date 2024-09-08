import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import WithdrawalsChart from './WithdrawalsChart';
import DonationsChart from './DonationsChart';

function Charts({allDonations}) {
    const token=localStorage.getItem('token')
    const [donations, setDonations] = useState([]) // Store all donors

    useEffect(() => {
        setDonations(allDonations)
      }, [allDonations,token])

    const donationMethods = donations.reduce((acc, donation) => {
        const { method, amount } = donation;
        acc[method] = (acc[method] || 0) + amount;
        return acc;
      }, {});
      
    const chartData = Object.keys(donationMethods).map(method => ({
    name: method,
    value: donationMethods[method],
    }));
      
  return (
    <div>
        <h1 className="text-left text-xl mt-2 ml-2">Insights</h1>
        <div className='grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
            <div className='flex justify-center items-center border rounded-lg bg-white'>
                <DonationsChart chartData= {chartData}/>
            </div>

            <div className='flex justify-center items-center border rounded-lg bg-white'>
                <WithdrawalsChart/>
            </div>
            
        </div>
    </div>
  )
}

export default Charts