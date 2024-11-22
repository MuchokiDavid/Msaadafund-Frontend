import React from 'react'
import { useTour } from '@reactour/tour'

function CallToAction() {
    const orgName= localStorage.getItem("org")
    const { setIsOpen } = useTour()
  return (
    <div>
         <div id='termBanner' className="px-4 py-4 bg-gradient-to-r sm:py-4 rounded-lg  md:py-6 md:px-6 lg:py-8 lg:px-8 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
                <h2 className="text-2xl font-extrabold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9">
                    Welcome back {orgName}!
                </h2>
                <p className="max-w-3xl mt-3 text-lg leading-6 text-gray-100">
                This dashboard is your central hub for managing all your campaigns and fundraising activities. 
                Whether you're starting a new campaign, tracking donations, or spending funds, everything you need is right here.
                </p><br/>
                <p className='text-white'>Happy fundraising!</p>
            </div>
            <div className="mt-6 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button onClick={()=>setIsOpen(true)} className="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-500 border border-blue-500 hover:border-blue rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-500">
                        Take a tour
                    </button>
                </div>
                <p className="mt-3 text-sm leading-5 text-gray-100">
                    We care about the protection of your data. Your data is safe and never used for commercial purposes.
                </p>
                <p className="text-sm leading-5 text-indigo-200">
                If you have any questions or need assistance, our support team is here to help you.
                </p>
            </div>
        </div>

    </div>
  )
}

export default CallToAction