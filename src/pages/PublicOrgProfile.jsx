import React from 'react'
import { IoMdNotifications } from "react-icons/io";


function Profile({orgName,orgType, subscribe,handleSubscribe,handleUnsubscribe, profileImage}) {
  return (
    <div className='bg-white rounded-lg pb-3'>
  <div className="h-24 overflow-hidden" id='orgBanner'>
    {/* <img className="object-cover object-top w-full" src="https://source.unsplash.com/random/1920x1080/?organisation-profile" alt='Mountain'/> */}
  </div>
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div className="flex">
        <img className="h-24 w-24 rounded-full ring-2 ring-blue-300 sm:h-32 sm:w-32" src={profileImage} alt="Org profile"/>
      </div>

      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
          <h1 className="truncate text-2xl font-bold text-blue-300">{orgName}</h1>
          <p className="mt-1 text-sm text-gray-500">{orgType}</p>
        </div>
        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          {subscribe ? (
            <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:text-gray-800 shadow-md hover:bg-gray-50" onClick={handleUnsubscribe}>
             <IoMdNotifications className="text-lg mr-2" /> Unsubscribe
            </button>
          ) : (
            <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:text-gray-800 hover:bg-gray-50" onClick={handleSubscribe}>
              <IoMdNotifications className="text-lg mr-2" />Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
    <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
      <h1 className="truncate text-2xl font-bold text-blue-300">{orgName}</h1>
    </div>
  </div>
</div>
  )
}

export default Profile