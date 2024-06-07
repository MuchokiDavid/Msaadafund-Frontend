import React from 'react'
import Menus from './Menus'
import Footer from './Footer'

function ThankYou() {
    const handleHome = () =>{
        window.location.href = "/"
       }
  return (
    <div>
        <Menus/>
        <div className="grid min-h-screen place-content-center bg-gray-50 px-4">
            <div className="text-center bg-white p-8">
                <h1 className="text-5xl font-black text-red-500">Donation Successful!</h1>
        
                {/* <p className="text-2xl font-bold tracking-tight text-red-500 sm:text-4xl">Uh-oh!</p> */}
        
                <p className="mt-4 text-2xl text-gray-500">Thank you for your contribution</p>
        
                <button
                onClick={handleHome}
                className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                Go Back Home
                </button>
            </div>
        </div>
        <Footer/>
    </div>
  
  )
}

export default ThankYou