import React, { useEffect, useState } from 'react'

function Copyright() {
    const[currentYear, setCurrentYear]= useState(0)

    useEffect(() => {
        function getYear(){
            let year = new Date().getFullYear();
            setCurrentYear(year);
        }
            getYear()
    }, [])
  return (
    <div className='text-white text-left bg-emerald-900 h-12'>
      © {currentYear} Msaada-Mashinani. All rights reserved.
    </div>
  )
}

export default Copyright