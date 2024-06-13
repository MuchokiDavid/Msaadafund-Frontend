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
    <>
    <hr className='font-normal'/>
    <div className='flex justify-center items-center bg-sky-950 h-12'>      
        <div className='text-white text-xs text-center bg-sky-950 h-8 p-2'>
        © {currentYear} Msaada-Mashinani. All rights reserved.
      </div>
      <div>
      {/* <a className='text-white text-xs text-left bg-sky-950 h-8 p-2' href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Images by unsplash</a> */}
      </div>
    </div>
    </>
    
    
  )
}

export default Copyright