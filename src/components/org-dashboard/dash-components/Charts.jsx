import React from 'react'
import WithdrawalsChart from './WithdrawalsChart';
import DonationsChart from './DonationsChart';

function Charts({allDonations}) {      
  return (
    <div>
        <h1 className="text-left text-xl mt-2 ml-2">Analysis</h1>
        <div className='grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2'>
            <div className='flex justify-center items-center border rounded-lg bg-white'>
                <DonationsChart allDonations= {allDonations}/>
            </div>

            <div className='flex justify-center items-center border rounded-lg bg-white'>
                <WithdrawalsChart/>
            </div>
            
        </div>
    </div>
  )
}

export default Charts