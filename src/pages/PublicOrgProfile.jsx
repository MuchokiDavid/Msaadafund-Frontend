import React from 'react'
import { MdNotificationsActive } from "react-icons/md";
import { MdNotificationsOff } from "react-icons/md";



function Profile({orgName,orgType, loading, subscribe,handleSubscribe,handleUnsubscribe, errors, profileImage}) {
  return (
    <div className='mb-3' id='orgBanner'>
  <div className="h-28 overflow-hidden">
    {/* <img className="object-cover object-top w-full" src="https://source.unsplash.com/random/1920x1080/?organisation-profile" alt='Mountain'/> */}
  </div>
  <div className="max-w-5xl">
    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
      <div className="flex">
        <img className="h-24 w-24 ml-4 mb-4 rounded-full ring-2 ring-blue-300 sm:h-32 sm:w-32" src={profileImage} alt="Org profile" loading="lazy"/>
      </div>

      <div className="sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1 ml-4">
        <div className="mt-2 min-w-0 flex-1 md:block">
          <h1 className="truncate text-2xl font-bold text-gray-700">{orgName.toUpperCase()}</h1>
          <p className="mt-1 text-base text-gray-500">{orgType}</p>
          <div className='my-3'>
          {subscribe ? (
            <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:text-gray-800 shadow-md hover:bg-gray-50" onClick={handleUnsubscribe}>
             <MdNotificationsOff size={23}   className="text-lg mr-2" /> {loading ?  'Unsubscribing...' :"Unsubscribe"}
            </button>
          ) : (
            <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:text-gray-800 hover:bg-gray-50" onClick={handleSubscribe}>
              <MdNotificationsActive size={23}  className="text-lg mr-2" />{loading ?  'Subscribing...' :"Subscribe"}
            </button>
          )}
          </div>
        </div>
        {errors && <div className="text-red-500 mt-2 text-sm">
          {errors}
        </div>}        
      </div>
    </div>
  </div>
  {/* <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
        {subscribe ? (
          <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:text-gray-800 shadow-md hover:bg-gray-50" onClick={handleUnsubscribe}>
            <MdNotificationsOff size={23}   className="text-lg mr-2" /> {loading ?  'Unsubscribing...' :"Unsubscribe"}
          </button>
        ) : (
          <button type="button" className="inline-flex justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  hover:text-gray-800 hover:bg-gray-50" onClick={handleSubscribe}>
            <MdNotificationsActive size={23}  className="text-lg mr-2" />{loading ?  'Subscribing...' :"Subscribe"}
          </button>
        )}
      </div> */}
</div>

  )
}

export default Profile