import React from 'react'

function DashboardBanner() {
    const token = localStorage.getItem("token");
    const user= localStorage.getItem("user");
  return (
    <div>
         <div id='termBanner' className="px-2 py-2 bg-gradient-to-r sm:py-4 rounded-lg  md:py-6 md:px-6 lg:py-8 lg:px-8 xl:flex xl:items-center">
            <div className="xl:w-0 xl:flex-1">
                <h2 className="text-2xl font-extrabold leading-8 tracking-tight text-white sm:text-3xl sm:leading-9">
                    Welcome back {user}!
                </h2>
                <p className="max-w-3xl mt-3 text-lg leading-6 text-gray-100">
                This dashboard is your central hub for managing all your fundraising activities. 
                Whether you're tracking donations, or managing subscriptions, everything you need is right here.
                </p><br/>
                <p className='text-white'>Happy fundraising!</p>
            </div>
            <div className="mt-6 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <a  href={token ? "/user/dashboard/contributions" : "/user/login"}><button className="flex items-center justify-center w-full px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-blue-600 hover:border-blue rounded-md hover:bg-blue-500 focus:outline-none focus:bg-purple-400">
                        View Contributions
                    </button></a>
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

export default DashboardBanner