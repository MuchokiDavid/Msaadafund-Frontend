import React from 'react'

function Maintenance() {

    const handleHome = () => {
        window.location.href = "/message";
      };
  return (
    <div>
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-red-500">Ooop!</h1>
  
        {/* <p className="text-2xl font-bold tracking-tight text-red-500 sm:text-4xl">Uh-oh!</p> */}
  
        <p className="mt-4 text-2xl text-gray-500">Our site is currently under maintenance. Please check back later.</p>
  
        <button
         onClick={handleHome}
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Contact us
        </button>
      </div>
    </div>
  </div>
  )
}

export default Maintenance