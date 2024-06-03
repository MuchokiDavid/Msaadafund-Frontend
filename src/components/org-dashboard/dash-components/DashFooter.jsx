import React, { useEffect, useState } from 'react'

function DashFooter() {
  const[currentYear, setCurrentYear]= useState(0)

    useEffect(() => {
        function getYear(){
            let year = new Date().getFullYear();
            setCurrentYear(year);
        }
            getYear()
    }, [])

  return (
    <div className='mt-6'>
        <footer className="text-gray-800 py-2 text-sm mt-4">
        <div className='flex justify-between'>
        <div className='text-xs text-left h-8 p-2'>
        © {currentYear} Msaada-Mashinani. All rights reserved.
      </div>
      <div>
      </div>
    </div>
        </footer>
    </div>
    
  )
}

export default DashFooter